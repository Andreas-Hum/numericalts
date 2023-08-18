const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function getPixelData(imagePath) {
    return new Promise((resolve, reject) => {
        // Load the image
        loadImage(imagePath).then(image => {
            // Create a canvas
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');

            // Draw the image onto the canvas
            ctx.drawImage(image, 0, 0);

            // Get the pixel data
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const pixelData = imageData.data;

            // Create a matrix to store pixel values
            const matrix = [];

            // Iterate through pixel data and populate the matrix
            for (let y = 0; y < image.height; y++) {
                matrix[y] = [];
                for (let x = 0; x < image.width; x++) {
                    const index = (y * image.width + x) * 4;
                    const red = pixelData[index];
                    const green = pixelData[index + 1];
                    const blue = pixelData[index + 2];
                    const alpha = pixelData[index + 3];

                    matrix[y][x] = { red, green, blue, alpha };
                }
            }

            // Resolve with the pixel data matrix
            resolve(matrix);
        }).catch(err => {
            // Reject with an error if loading the image fails
            reject(err);
        });
    });
}

// Example usage
getPixelData('ts.jpg')
    .then(pixelData => {
        console.log(pixelData.map(t => t.))
        createImageFromPixelData(pixelData.map((t) => t.map(e)), "test.jpg");
    })
    .catch(err => {
        console.error('Error:', err);
    });


function createImageFromPixelData(pixelData, outputFileName) {
    const width = pixelData[0].length;
    const height = pixelData.length;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixel = pixelData[y][x];
            ctx.fillStyle = `rgba(${pixel.red}, ${pixel.green}, ${pixel.blue}, ${pixel.alpha / 255})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    const out = fs.createWriteStream(outputFileName);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
        console.log('Image saved:', outputFileName);
    });
}

