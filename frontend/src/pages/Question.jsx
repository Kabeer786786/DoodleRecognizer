/* eslint-disable react/prop-types */
import { FaXmark } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import "../assets/styles.css"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import axios from "axios";

export default function Question({ setParticipantId, participantName, localimages, setLocalImages, setCurrentPage, questionNumber, setQuestionNumber, questions, setQuestions, answers, setAnswers  }) {
  const timer = 30;
  let handleClose = () => {
    setTimeout(() => {
      setQuestionNumber(1);
      setCurrentPage('home');
    }, 300);
  }; 

  async function handleSubmitBackend() {
    const formData = {
      name: participantName,
      score: questions.reduce((sum, question) => sum + question.points, 0),
      images: [], // Array to store Base64 images
      imageNames: [], // Array to store category names
    };
  
    // Convert each image to Base64 and add it to formData
    questions.forEach((question) => {
      if (question.image) {
        formData.images.push(question.image); // Base64 image
        formData.imageNames.push(question.question); // Category name
      }
    });
  
    try {
      const response = await axios.post("http://localhost:7000/submit", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data)
      console.log(response.data.participant._id)
      setParticipantId(response.data.participant._id);
    } catch (error) {
      console.error("❌ Error submitting data:", error.response?.data || error.message);
    }
  }

  let handleNextQuestion = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      if (questionNumber === (questions.length)) {
        handleSubmitBackend();
        setCurrentPage('scorecard');
        return;
      }
      setCurrentPage(questionNumber ===  (questions.length) ? 'scorecard' : 'loading'); // Temporary state to force re-render
      setTimeout(() => {
        setQuestionNumber((prev) => prev + 1);
        setCurrentPage(questionNumber ===  (questions.length) ? 'scorecard' : 'question');
      }, 100); // Small delay before switching back
    }, 500);
  };
  
  let handleAnswer = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentPage('answer');
    }, 700);
  };
  const [isVisible, setIsVisible] = useState(true);


  return (
    <div className="flex w-screen h-screen bg-[#90ddf0] xl:p-10 relative font-comic">
      {/* Background Container with Overlay */}
      <div className="w-full rounded-xl p-4 relative overflow-hidden shadow-[0px_0px_8px_8px_rgba(0,0,0,0.3)] bg-[#f0edee]">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/doodlebackground.jpg')]  bg-center opacity-30"
        ></div>
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

          <div className="ml-auto h-fit px-6 py-2 rounded-lg shadow-[5px_5px_0px_0px_#68A2B1] bg-[#80C6D7] border border-[#68A2B1]">
            <h1 className="text-2xl  text-gray-100">Drawing {questionNumber}/{questions.length}</h1>
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
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              className="w-full h-full relative m-auto"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.0 } }}
              exit={{ x: "-100%", opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
            >
              <div className="relative flex flex-col items-center m-auto justify-center h-[75vh] font-comic text-[#2c666e]">
                <p className="text-4xl mb-2 font-bold tracking-wide text-[#2c666e] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">Draw <span>🎨</span> </p>
                <h1 className="text-9xl pb-7 animate-float tracking-wide font-bubble font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 
                 drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105">
                  { questionNumber < (questions.length + 1) ? questions[questionNumber-1].question : "🎉" }
                </h1>
                <p className="text-[2em] pb-6 font-extrabold text-[#2c666e] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">in <span className="text-[#4ecdc4]">{timer}</span> seconds ⏳</p>

                <button
                  className="cursor-pointer h-fit flex items-center justify-center gap-4 bg-[#80C6D7] text-white text-xl font-bold py-3 px-8 rounded-lg border border-[#68A2B1]
               shadow-[6px_6px_0px_0px_#68A2B1] transition-all duration-200 transform  hover:-translate-y-1
               active:translate-x-1 active:translate-y-1 active:shadow-none "
                  onClick={handleAnswer}
                >
                  <span className="text-2xl font-bold tracking-wide">Let&apos;s Start ! ✨</span>
                </button>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>

  )
}
// #90ddf0,  #2c666e,  #07393c,  #f0edee, #0a090c