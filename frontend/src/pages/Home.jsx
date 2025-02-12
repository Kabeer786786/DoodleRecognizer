/* eslint-disable react/prop-types */
import { FaGithub, FaHome } from "react-icons/fa";
import "../assets/styles.css";
import { motion } from 'framer-motion';
import { FaQuestion } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home({participantName, setParticipantName, localimages, setLocalImages, setPreviousPage, setCurrentPage, questions, setQuestions }) {
  const [images, setImages] = useState([]); // Stores { category, file, preview }
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const getRandomItems = (arr, num) => {
    let shuffled = [...arr].sort(() => Math.random() - 0.5); // Shuffle array
    return shuffled.slice(0, num); // Pick `num` elements
  };

  const generateQuestions = (questions, easylevel, mediumlevel, hardlevel) => {
    const easy = questions.filter(q => q.category === 'easy');
    const medium = questions.filter(q => q.category === 'medium');
    const hard = questions.filter(q => q.category === 'hard');

    const selectedQuestions = [
      ...getRandomItems(easy, easylevel),
      ...getRandomItems(medium, mediumlevel),
      ...getRandomItems(hard, hardlevel)
    ];
    return selectedQuestions
  };

  const categories = {
    easy: [
      "Apple", "Baseball Bat", "Book", "Bread", "Circle", "Cloud", "Cookie", "Cup",
      "Donut", "Door", "Eye", "Face", "Fan", "Helmet", "Ice Cream", "Key", "Ladder",
      "Line", "Lollipop", "Moon", "Moustache", "Pants", "Paper Clip", "Pencil", "Pillow",
      "Shorts", "Smiley Face", "Snake", "Sock", "Spoon", "Square", "Star", "Sun",
      "Tent", "T-shirt", "Triangle", "Umbrella", "Wheel"
    ],
    medium: [
      "Anvil", "Axe", "Basketball", "Beard", "Bed", "Bench", "Bicycle", "Broom",
      "Camera", "Car", "Cat", "Ceiling Fan", "Cell Phone", "Chair", "Clock", "Coffee Cup",
      "Drums", "Dumbbell", "Envelope", "Flower", "Frying Pan", "Hat", "Headphones",
      "Knife", "Laptop", "Lightning", "Mountain", "Mushroom", "Pizza", "Rainbow", "Rifle",
      "Saw", "Scissors", "Screwdriver", "Shovel", "Spider", "Stop Sign", "Suitcase",
      "Sword", "Syringe", "Table", "Tennis Racquet", "Tooth", "Traffic Light", "Wristwatch"
    ],
    hard: [
      "Airplane", "Alarm Clock", "Bird", "Butterfly", "Camera", "Cell Phone",
      "Diving Board", "Eyeglasses", "Grapes", "Hot Dog", "Light Bulb", "Microphone",
      "Power Outlet", "Radio", "Tortoise"
    ]
  };

  // Generating the allQuestions array dynamically
  const allQuestions = Object.entries(categories).flatMap(([category, questions], index) =>
    questions.map((question, i) => ({
      id: index * 100 + i + 1, // Generating unique ID dynamically
      category: category,
      question: question,
      image: '',
      answer: false,
      points: 0,
      timestamp:'',
    }))
  );


  let handlenewbie = () => {
    if (participantName === '') {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError("Please Enter your Name *");
      return;
    }

    const selectedQuestions = generateQuestions(allQuestions, 2, 2, 1);
    // console.log(selectedQuestions);
    setIsVisible(false);
    setQuestions(selectedQuestions);
    setTimeout(() => {
      setCurrentPage('question');
    }, 300);
  };

  let handlepros = () => {
    if (participantName === '') {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError("Please Enter your Name *");
      return;
    }
    const selectedQuestions = generateQuestions(allQuestions, 1, 3, 2);
    setIsVisible(false);
    setQuestions(selectedQuestions);
    setTimeout(() => {
      setCurrentPage('question');
    }, 300);
  };
  let handlehome = () => {
    setTimeout(() => {
      setCurrentPage('home');
    }, 300);
  }
  const handleChange = (event) => {
    setParticipantName(event.target.value); // Update state when input changes
  };

  const handleHelp = () => {
    setIsVisible(false);
    setTimeout(() => {
      setPreviousPage('home');
      setCurrentPage('help');
    }, 300);
  }

  const handleGithub = () => {
    setTimeout(() => {
      window.location.href = 'https://github.com/Kabeer786786/DoodleRecognizer';
    }, );
  }

  return (
    <div className="flex w-screen h-screen bg-[#90ddf0] xl:p-10 relative font-comic overflow-hidden">
      <div className="w-full rounded-xl m-auto h-full flex relative overflow-hidden shadow-[0px_0px_5px_5px_rgba(0,0,0,0.3)] bg-[#f0edee]" >
        <div
          className="absolute inset-0 bg-[url('/doodlebackground.jpg')]  bg-center opacity-30"
        ></div>

        {/* Background Image */}
        <button
          className="absolute cursor-pointer m-6 h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handlehome}
        >
          <FaHome size={"26px"} />
        </button>

        <div className="flex m-auto w-5xl items-center ">


          <div className="relative flex flex-col pt-6 pb-12 px-10 w-fit rounded-xl  bg-[#90ddf0] shadow-[0px_0px_10px_4px_#68A2B1] 
                  transform perspective-[500px] rotate-y-[-10deg]">
            <img src="pandahome2.png" alt="panda images" className="z-50" />

            <div className="form pb-12 -mt-2 max-w-sm">
              <div className="h-16 px-5 py-4 rounded-lg shadow-[0px_-6px_0px_2px_#68A2B1] bg-[#f0edee] border-[#68A2B1]">
                <input type="text" value={participantName} onChange={handleChange} placeholder="Enter your Name...." className="text-[#2c666e] font-semibold text-2xl focus:outline-none" required />
              </div>
              <span className="text-red-600 font-semibold mt-2 ml-2 text-xl absolute">{error}</span>
            </div>
            <div className="grid grid-cols-2 w-sm gap-4 ">
              <button
                className="cursor-pointer h-fit flex items-center justify-center gap-4 bg-[#80C6D7] text-white text-2xl font-bold py-4 px-6 rounded-lg border border-[#68A2B1]
               shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
               active:translate-x-1 active:translate-y-1 active:shadow-none"
                onClick={handlenewbie}
              >
                Newbies
              </button>
              <button
                className="cursor-pointer h-fit flex items-center justify-center gap-4 bg-[#80C6D7] text-white text-2xl font-bold py-4 px-6 rounded-lg border border-[#68A2B1]
               shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
               active:translate-x-1 active:translate-y-1 active:shadow-none"
                onClick={handlepros}
              >
                Pros
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                className="w-full h-full relative m-auto flex"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 1.0 } }}
                exit={{ x: "-100%", opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
              >
                <div className="relative h-full m-auto">
                  <img src="pandahome.png" alt="https://www.shutterstock.com/shutterstock/photos/1223113042/display_1500/stock-vector-illustration-of-giant-panda-who-climbing-bamboo-tree-to-looking-something-1223113042.jpg" className="bg-cover bg-center" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className="absolute cursor-pointer right-24 m-6 h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handleGithub}
        >
          <FaGithub size={"26px"} />
        </button>
        <button
          className="absolute cursor-pointer right-0 m-6 h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handleHelp}
        >
          <FaQuestion size={"26px"} />
        </button>
        <button
          className="absolute cursor-pointer bottom-6  left-1/2 -translate-x-1/2  h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:-translate-x-1/2 active:translate-y-1 active:shadow-none"
        >
          Developed by @ Red Hat Coders 2025
        </button>
      </div>
    </div >

  )
}

// bg-[#d7816a]rgb(82, 180, 87)
// bg-[#d7816a] #9b5145