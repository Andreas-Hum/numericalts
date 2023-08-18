"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDataSync = void 0;
var canvas_1 = require("canvas");
var fs = require("fs");
function imageDataSync(imagePath) {
    // Read the image synchronously
    var imageBuffer = fs.readFileSync(imagePath);
    // Create an image from the buffer
    var image = new canvas_1.Image();
    image.src = imageBuffer;
    // Create a canvas
    var canvas = (0, canvas_1.createCanvas)(image.width, image.height);
    var ctx = canvas.getContext('2d');
    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);
    // Get the pixel data
    var imageData = ctx.getImageData(0, 0, image.width, image.height);
    var pixelData = imageData.data;
    // Create a matrix to store pixel values
    var matrix = [];
    // Iterate through pixel data and populate the matrix
    for (var y = 0; y < image.height; y++) {
        matrix[y] = [];
        for (var x = 0; x < image.width; x++) {
            var index = (y * image.width + x) * 4;
            var red = pixelData[index];
            var green = pixelData[index + 1];
            var blue = pixelData[index + 2];
            var alpha = pixelData[index + 3];
            matrix[y][x] = { red: red, green: green, blue: blue, alpha: alpha };
        }
    }
    // Return the pixel data matrix
    return { src: imagePath, width: image.width, height: image.height, pixelData: matrix };
}
exports.imageDataSync = imageDataSync;
var e = imageDataSync("e.jpg");
console.log(e.pixelData);
