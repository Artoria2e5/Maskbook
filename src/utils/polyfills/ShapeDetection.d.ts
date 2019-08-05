declare class BarcodeDetector {
    // *not implemented* constructor(options: { formats: string[] })
    constructor(options: { formats: ['qr_code'] })
    public async detect(mediaSource: CanvasImageSource): Promise<DetectedBarcode[]>
}

declare class DetectedBarcode {
    boundingBox: DOMRectReadOnly
    cornerPoints: { x: number; y: number }[]
    // *not implemented* format: string
    format: 'qr_code'
    rawValue: string
}

interface Window {
    BarcodeDetector: BarcodeDetector
    DetectedBarcode: DetectedBarcode
}
