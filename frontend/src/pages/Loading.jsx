import { FaXmark } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import "../assets/styles.css";

export default function Loading({ questions }) {



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
       
          >
            <FaXmark size={"26px"} />
          </button>

          <div className="ml-auto h-fit px-6 py-2 rounded-lg shadow-[5px_5px_0px_0px_#68A2B1] bg-[#80C6D7] border border-[#68A2B1]">
            <h1 className="text-2xl  text-gray-100">Drawing /{questions.length}</h1>
          </div>

          <div className="flex ml-auto">
            <button
              className="cursor-pointer h-fit flex items-center justify-center gap-4  bg-[#80C6D7] text-white text-xl font-bold py-2 px-6 rounded-lg border border-[#68A2B1]
                   shadow-[5px_5px_0px_0px_#68A2B1] transition-all duration-150 
                   active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <FaAngleDoubleRight size={"26px"} />
            </button>
          </div>

        </div>
        

      </div>
    </div>

  )
}