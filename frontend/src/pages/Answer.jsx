/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import "../assets/styles.css"
import { motion } from "framer-motion";

export default function Answer({ score, setScore,  questionNumber, setQuestionNumber ,setCurrentPage, questions, setQuestions, answers, setAnswers, selectedAnswer, setSelectedAnswer }) {
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev < 1) {
          clearInterval(countdown);
          setQuestionNumber((cnt) => cnt + 1);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [setCurrentPage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#f0edee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = () => setDrawing(true);


  const draw = (event) => {
    if (!drawing) return;

    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();  // Reset the path here after stopping
    processAndSend();
  };

  let clearCanvas = () => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setResult("");// Clear result text
  }


  function processAndSend() {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
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
          setResult(data.predictions.join(', '));
        } else if (data.error) {
          setResult(data.error);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  let handleClose = () => {
    setTimeout(() => {
      setQuestionNumber(1);
      setCurrentPage('home');
    }, 300);
  };

  let handleNextQuestion = () => {
    setTimeout(() => {
      if (questionNumber ===  (questions.length)) {
        setCurrentPage('scorecard');
        return;
      }
      setQuestionNumber((cnt) => cnt + 1);
      setCurrentPage('question');
    }, 300);
  }

  return (
    <div className="relative flex w-screen h-screen bg-[#90ddf0] xl:p-10 font-comic">
      {/* Background Container with Overlay */}

      <div className="relative w-full h-full rounded-xl p-4 overflow-hidden shadow-[0px_0px_8px_8px_rgba(0,0,0,0.3)] bg-[#f0edee]">

        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 touch-none"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />

        {/* Content - Ensures it's on top */}
        <div className="relative z-10 flex justify-start p-2">
          <button
            className="cursor-pointer h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                   shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                   active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={handleClose}
          >
            <FaXmark size={"26px"} />
          </button>
          <h1 className="flex items-center absolute left-30 text-2xl top-4"> { questionNumber <  (questions.length+1) ? questions[questionNumber-1].question : "🎉" } </h1>

          <div className="flex gap-4 ml-auto ">
            <div className="h-fit w-fit px-5 py-2 rounded-lg shadow-[5px_5px_0px_0px_#68A2B1] bg-[#80C6D7] border border-[#68A2B1]">
              <h1 className="text-2xl w-fit font-semibold text-gray-100">00: {timer} s </h1>
            </div>
            <button
              className="cursor-pointer flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-4 rounded-lg border border-[#68A2B1]
                   shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                   active:translate-x-1 active:translate-y-1 active:shadow-none"
              onClick={clearCanvas}
            >
              <FaEraser size={"26px"} />
            </button>
          </div>

          <div className="flex ml-auto">
            <button
              className="cursor-pointer h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                   shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                   active:translate-x-1 active:translate-y-1 active:shadow-none"
              onClick={handleNextQuestion}
            >
              <FaAngleDoubleRight size={"26px"} />
            </button>
          </div>

        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-fit bg-[#80C6D7] rounded-lg shadow-lg "
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1.0 } }}
          exit={{ x: '100%', opacity: 0, transition: { duration: 1.0 } }}
        >
          <div className=" font-comic text-[#f0edee] relative px-8 py-1.5">
            {/* Notification Text */}
            <p className="text-center tracking-wide text-2xl pb-2" id="result"> {result || ". . ."} </p>

            {/* Triangle Pointer */}
            <div className="absolute bottom-[-13px] left-1/2 transform -translate-x-1/2 
                  w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent 
                  border-t-[60px] border-t-[#80C6D7] -z-50"></div>
          </div>
        </motion.div>


      </div>
    </div>

  )
}