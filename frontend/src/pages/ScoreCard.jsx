/* eslint-disable react/prop-types */
import { FaQuestion, FaRightLong, FaStar, FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import "../assets/styles.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScoreCard({ participantid, localimages, setLocalImages, setPreviousPage, setCurrentPage, questionNumber, setQuestionNumber, questions, setQuestions, answers, setAnswers }) {
  const [topParticipants, setTopParticipants] = useState([]);
  const [currparticipant, setCurrParticipant] = useState({});

  let handleClose = () => {
    setTimeout(() => {
      setQuestionNumber(1);
      window.location.reload();
      // setCurrentPage('home');
    }, 300);
  };
  const [isVisible, setIsVisible] = useState(true);
  const handleHelp = () => {
    setIsVisible(false);
    setTimeout(() => {
      setPreviousPage('scorecard');
      setCurrentPage('help');
    }, 600);
  }

  const fetchTopParticipants = async () => {
    try {
      const response = await axios.get("http://192.168.111.244:7000/top10");
      setTopParticipants(response.data);
    } catch (error) {
      console.error("Error fetching top participants", error);
    }
  };

  const fetchCurrentParticipant = async () => {
    try {
      const response = await axios.get(`http://192.168.111.244:7000/participant/${participantid}`);
      setCurrParticipant(response.data);
    } catch (error) {
      console.error("Error fetching Current participant", error);
    }
  };

  useEffect(() => {
    fetchTopParticipants();
    fetchCurrentParticipant();
  },[participantid]);


  return (
    <div className="flex w-screen h-screen bg-[#90ddf0] xl:p-10 relative font-comic">
      {/* Background Container with Overlay */}
      <div className="w-full rounded-xl  m-auto h-full relative overflow-hidden shadow-[0px_0px_5px_5px_rgba(0,0,0,0.3)] bg-[#f0edee] p-4">
        <div
          className="absolute inset-0 bg-[url('/doodlebackground.jpg')]  bg-center opacity-30"
        ></div>

        <div className="relative z-10 flex justify-start p-2">
          <button
            className="cursor-pointer h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                           shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                           active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={handleClose}
          >
            <FaHome size={"26px"} />
          </button>

          <div className="flex ml-auto">
            <button
              className="cursor-pointer h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                           shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                           active:translate-x-1 active:translate-y-1 active:shadow-none"
              onClick={handleHelp}
            >
              <FaQuestion size={"26px"} />
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

              <div className="relative flex items-center justify-center m-auto h-[80%]">
                {/* Scorecards Section */}
                <div className="relative w-2/3 flex flex-wrap m-auto justify-center p-8 pr-0 gap-6">
                  {questions.map((question, index) => (
                    <div key={index} className="relative w-1/4  flex flex-col h-[200px] bg-[#80C6D7] text-white p-2 pb-4 rounded-lg shadow-md justify-between items-center border border-[#68A2B1]">
                      <h2 className="text-xl pb-2 font-bold">{question.question}</h2>

                      {/* Display Image if Available */}
                      <div className="bg-white flex items-center justify-center m-auto w-36 h-36  rounded-xl">
                        {question.image && (
                          <img src={question.image} alt={question.question} className="w-28 h-28 object-center object-cover bg-white rounded-xl object-contain" />
                        )}
                      </div>
                      <div className={`absolute bottom-2 right-2 ${question.answer ? "bg-green-500" : "bg-red-400"} border-2 border-white w-10 h-10 rounded-full`}>
                        {
                          question.answer ?
                            <TiTick size={"30px"} className="m-auto flex items-center justify-center mt-0.5" /> :
                            <FaXmark size={"26px"} className="m-auto flex items-center justify-center mt-1 pt-0.5 font-bold" />
                        }
                      </div>
                      {/* {console.log(question.points)} */}
                    </div>

                  ))}

                </div>

                {/* Leaderboard Section */}
                <div className="relative w-1/3 min-h-[430px] flex flex-col m-auto bg-[#68A2B1] p-4  rounded-lg shadow-[6px_6px_0px_0px_#80C6D7] border border-[#5A98A1] text-white mr-32">
                  <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
                  <ul className="space-y-3">
                    {
                      <li key={currparticipant._id} className="bg-[#ffdd00] text-[#68A2B1] font-semibold p-3 rounded-md flex justify-between shadow-md border border-[#ffff00]">
                      <span className="flex items-center gap-1.5"> <FaStar /> {currparticipant.name}</span>
                      <span>{currparticipant.score} pts</span>
                    </li>
                    }
                    {topParticipants.map((participant) => (
                      <li key={participant._id} className="bg-[#80C6D7] p-3 rounded-md flex justify-between shadow-md border border-[#68A2B1]">
                        <span>{participant.name}</span>
                        <span>{participant.score} pts</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute left-1/2  -translate-x-1/2 flex items-center justify-center w-fit rounded-lg shadow-lg ">
                <button
                  className="cursor-pointer h-fit flex items-center justify-center gap-4 bg-[#80C6D7] text-white text-xl font-bold py-3 px-8 rounded-lg border border-[#68A2B1]
               shadow-[6px_6px_0px_0px_#68A2B1] transition-all duration-200 transform  hover:-translate-y-1
               active:translate-x-1 active:translate-y-1 active:shadow-none "
                  onClick={handleClose}
                >
                  <span className="text-2xl font-bold tracking-wide">Play Again! 🚀</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  );
}