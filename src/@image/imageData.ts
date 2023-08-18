import { createCanvas, Image } from 'canvas';
import type { ImageData, Canvas, CanvasRenderingContext2D } from 'canvas'
import * as fs from "fs"

interface ImageObj {
    src: string;
    width: number;
    height: number;
    pixelData: { red: number, green: number, blue: number, alpha: number }[][];
}

export function imageDataSync(imagePath: string): ImageObj {


    // Read the image synchronously
    const imageBuffer: Buffer = fs.readFileSync(imagePath);

    // Create an image from the buffer
    const image: Image = new Image();
    image.src = imageBuffer;


    // Create a canvas
    const canvas: Canvas = createCanvas(image.width, image.height);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Get the pixel data
    const imageData: ImageData = ctx.getImageData(0, 0, image.width, image.height);
    const pixelData: Uint8ClampedArray = imageData.data;

    // Create a matrix to store pixel values
    const matrix: { red: number, green: number, blue: number, alpha: number }[][] = [];

    // Iterate through pixel data and populate the matrix
    for (let y = 0; y < image.height; y++) {
        matrix[y] = [];
        for (let x = 0; x < image.width; x++) {
            const index: number = (y * image.width + x) * 4;
            const red: number = pixelData[index];
            const green: number = pixelData[index + 1];
            const blue: number = pixelData[index + 2];
            const alpha: number = pixelData[index + 3];

            matrix[y][x] = { red, green, blue, alpha };
        }
    }

    // Return the pixel data matrix
    return { src: imagePath, width: image.width, height: image.height, pixelData: matrix };
}

