import { FaHome } from "react-icons/fa";
import "../assets/styles.css";
import { motion } from 'framer-motion';
import { FaLinkedin, FaQuestion } from "react-icons/fa6";

export default function Home({ setCurrentPage }) {
  let handlenewbie = () => {
    setTimeout(() => {
      setCurrentPage('question');
    }, 300);
  };

  let handlepros = () => {
    setTimeout(() => {
      setCurrentPage('question');
    }, 300);
  };
  let handlehome = () => {
    setTimeout(() => {
      setCurrentPage('home');
    }, 300);
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

            <div className="form pb-10 -mt-2 max-w-sm">
              <div className="h-16 px-5 py-4 rounded-lg shadow-[0px_-6px_0px_2px_#68A2B1] bg-[#f0edee] border-[#68A2B1]">
                <input type="text" placeholder="Enter your Name...." className="text-[#2c666e] font-semibold text-2xl focus:outline-none" />
              </div>
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
          <motion.div
            className="w-full h-full relative m-auto flex  "
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.0 } }}
            exit={{ x: '100%', opacity: 0, transition: { duration: 1.0 } }}
          >
            <div className="relative h-full m-auto">
              <img src="pandahome.png" alt="https://www.shutterstock.com/shutterstock/photos/1223113042/display_1500/stock-vector-illustration-of-giant-panda-who-climbing-bamboo-tree-to-looking-something-1223113042.jpg" className="bg-cover bg-center" />
            </div>
          </motion.div>

        </div>
        <button
          className="absolute cursor-pointer right-24 m-6 h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handlehome}
        >
          <FaLinkedin size={"26px"} />
        </button>
        <button
          className="absolute cursor-pointer right-0 m-6 h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handlehome}
        >
          <FaQuestion size={"26px"} />
        </button>
        <button
          className="absolute cursor-pointer bottom-6  left-1/2 -translate-x-1/2  h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                                     shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                                     active:-translate-x-1/2 active:translate-y-1 active:shadow-none"
          onClick={handlehome}
        >
          Developed by @ Red Hat Coders 2025
        </button>
      </div>
    </div >

  )
}

// bg-[#d7816a]rgb(82, 180, 87)
// bg-[#d7816a] #9b5145