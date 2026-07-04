// Render PDF pages to PNG using native PDFKit.
// Usage: swift render-pdf.swift <input.pdf> <outputDir> <targetWidthPx> [maxPages]
import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
guard args.count >= 4 else {
    FileHandle.standardError.write("usage: render-pdf.swift <input.pdf> <outDir> <widthPx> [maxPages]\n".data(using: .utf8)!)
    exit(1)
}
let inputURL = URL(fileURLWithPath: args[1])
let outDir = URL(fileURLWithPath: args[2])
let targetWidth = CGFloat(Double(args[3]) ?? 1200)
let maxPages = args.count > 4 ? Int(args[4]) ?? Int.max : Int.max

guard let doc = PDFDocument(url: inputURL) else {
    FileHandle.standardError.write("cannot open \(args[1])\n".data(using: .utf8)!)
    exit(1)
}
try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

let pageCount = min(doc.pageCount, maxPages)
for i in 0..<pageCount {
    guard let page = doc.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale = targetWidth / bounds.width
    let size = CGSize(width: bounds.width * scale, height: bounds.height * scale)

    let image = NSImage(size: size)
    image.lockFocus()
    NSColor.white.setFill()
    NSRect(origin: .zero, size: size).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    image.unlockFocus()

    guard let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else { continue }
    let out = outDir.appendingPathComponent(String(format: "page_%02d.png", i + 1))
    try? png.write(to: out)
    print("wrote \(out.lastPathComponent)")
}
