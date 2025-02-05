let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let drawing = false;

// Resize canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Start drawing when mouse is down
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('touchstart', () => drawing = true);

// Stop drawing when mouse is up & call prediction API
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
    processAndSend();  // Convert image before   sending
});

canvas.addEventListener('touchend', () => {
    drawing = false;
    ctx.beginPath();
    processAndSend();  // Convert image before sending
});

// Draw when mouse moves
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

function draw(event) {
    if (!drawing) return;

    event.preventDefault(); // Prevent scrolling on touch
    const rect = canvas.getBoundingClientRect();
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "black";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

export default function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('result').innerText = ""; // Clear result text
}

function processAndSend() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    // Find the bounding box of the drawing
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            let index = (y * canvas.width + x) * 4;
            let alpha = pixels[index + 3]; // Alpha channel

            if (alpha > 0) { // If pixel is not fully transparent
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    // Define bounding box dimensions
    let bboxWidth = maxX - minX;
    let bboxHeight = maxY - minY;
    let size = Math.max(bboxWidth, bboxHeight); // Square size

    // Create a square canvas
    let squareCanvas = document.createElement("canvas");
    squareCanvas.width = size;
    squareCanvas.height = size;
    let squareCtx = squareCanvas.getContext("2d");

    // Fill with white background
    squareCtx.fillStyle = "white";
    squareCtx.fillRect(0, 0, size, size);

    // Center the cropped doodle in square canvas
    let offsetX = (size - bboxWidth) / 2;
    let offsetY = (size - bboxHeight) / 2;
    squareCtx.drawImage(canvas, minX, minY, bboxWidth, bboxHeight, offsetX, offsetY, bboxWidth, bboxHeight);

    // Resize to 28x28
    let finalCanvas = document.createElement("canvas");
    finalCanvas.width = 28;
    finalCanvas.height = 28;
    let finalCtx = finalCanvas.getContext("2d");
    finalCtx.drawImage(squareCanvas, 0, 0, 28, 28);

    // Convert the resized canvas to base64
    let imageUrl = finalCanvas.toDataURL("image/png");

    // Send to backend
    sendToBackend(imageUrl);
}

function sendToBackend(imageUrl) {
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }) // Send the base64-encoded image
    })
        .then(response => response.json())
        .then(data => {
            if (data.predictions) {
                document.getElementById('result').innerText = "Predictions: " + data.predictions.join(', ');
            } else if (data.error) {
                document.getElementById('result').innerText = "Error: " + data.error;
            }
        })
        .catch(error => console.error('Error:', error));
}