/* eslint-disable react/prop-types */
import { FaXmark } from "react-icons/fa6";
import "../assets/styles.css"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import "../assets/styles.css";

export default function Help({ previousPage, setCurrentPage, setQuestionNumber }) {
    const [isVisible, setIsVisible] = useState(true);
    const timer = 30 ;
    let handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setQuestionNumber(1);
            setCurrentPage(previousPage);
        }, 600);
    };

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
                                <p className="text-4xl mb-2 font-bold tracking-wide text-[#2c666e] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"> <span></span> </p>
                                <h1 className="text-9xl pb-7 animate-float tracking-wide font-bubble font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 
                 drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105">
                                    Help Section
                                </h1>
                                <p className="text-[2em] pb-6 font-extrabold text-[#2c666e] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">Follow This <span className="text-[#4ecdc4] cursor-pointer">www.help.redhatcoders.tech</span> </p>

                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

    )
}