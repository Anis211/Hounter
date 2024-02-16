/* eslint-disable @next/next/no-img-element */
import Vector from "@/details/vector";
import { Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function Hero() {
  const spanVariants = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: [40, 0, 0],
      opacity: [0, 0.5, 1],
    },
  };

  return (
    <div className="md:w-full h-[90vh] md:h-auto flex flex-row mb-[60px] bg-white">
      <div className="relative bottom-[400px] left-[400px]">
        <Vector />
      </div>
      <div className="lg:max-w-[37.5%] w-[90%] h-auto absolute top-[182px] md:flex md:flex-col md:items-center lg:block">
        <motion.div className="flex items-center flex-col lg:block mt-20 md:mt-0 xl:mt-20">
          <motion.p
            className="font-lexend font-bold text-4xl md:text-5xl lg:text-4xl text-[#1B1C57]"
            initial="hidden"
            animate="visible"
            transition={{
              duration: 1,
              ease: "backInOut",
              times: [0, 0.5, 1],
              staggerChildren: 0.2,
            }}
          >
            <motion.span variants={spanVariants} className="inline-block">
              Find The Place To{" "}
            </motion.span>
            <br />
            <motion.span variants={spanVariants} className="inline-block">
              Live{" "}
              <span className="text-[#1B1C57] lg:text-gray-100">
                {" "}
                Your Dreams
              </span>{" "}
            </motion.span>
            <br />
            <motion.span variants={spanVariants} className="inline-block">
              Easily Here
            </motion.span>
          </motion.p>
          <motion.p
            className="font-lexend font-[400] lg:text-lg md:text-2xl text-center lg:text-start pl-0 md:pl-4 lg:pl-0 text-xl md:max-w-[65%] lg:max-w-full mt-[24px]"
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: [40, 0, 0],
              opacity: [0, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "backInOut",
              delay: 0.4,
              times: [0, 0.5, 1],
            }}
          >
            Everything you need about finding your place to live will be here,
            where it will be easier for you
          </motion.p>
        </motion.div>
        <div className="mt-2 2xl:mt-10 pl-2 md:pl-2 lg:pl-0 text-center md:text-start pt-5 pb-20 md:pb-0 md:mb-0 md:pt-0">
          <motion.h2
            className="font-lexend font-normal text-gray-500 inline-block mb-3 md:mb-0"
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: [40, 0, 0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "backInOut",
              delay: 0.6,
              times: [0, 0.5, 1],
            }}
          >
            Our Partnership
          </motion.h2>
          <motion.div
            className="md:flex md:flex-row md:gap-9 md:pl-0 grid grid-cols-2 justify-items-center"
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: [20, 0, 0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "backInOut",
              delay: 0.9,
              times: [0, 0.5, 1],
            }}
          >
            {[
              "/traveloka_logo.png",
              "/traveloka_logo 5.png",
              "/traveloka_logo 3.png",
              "/traveloka_logo 4.png",
            ].map((path, index) => {
              return <img key={index} alt={path} src={path} />;
            })}
          </motion.div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-column lg:justify-end rounded-bl-md">
        <img
          alt="hero"
          src="/hero.png"
          className="max-w-3xl max-h-2xl relative bottom-[13%] xl:left-[20%] left-[-10%] rounded-bl-[80px]"
        />
        <div className="overflow-x-scroll hidden 2xl:block">
          <div className="box">
            <div className="inner">
              <div className="flex flex-row items-center -space-x-4">
                {["/Ellipse 4.jpeg", "/Ellipse 5.jpeg", "/Ellipse 6.jpeg"].map(
                  (path, index) => {
                    return (
                      <Avatar
                        id={index}
                        key={index}
                        variant="circular"
                        size="md"
                        alt={path}
                        className="avatar"
                        src={path}
                      />
                    );
                  }
                )}
              </div>
              <div className="text_block">
                <h2 className="header">1k+ People</h2>
                <p className="body">Successfully Getting Home</p>
              </div>
            </div>
          </div>
          <div className="box right-[115px]">
            <div className="inner w-[200px]">
              <div className="flex flex-row items-center">
                <img alt="icon1" src="/Rectangle 12.png" />
              </div>
              <div className="text_block">
                <h2 className="header">56 Houses</h2>
                <p className="body">Sold Monthly</p>
              </div>
            </div>
          </div>
          <div className="box right-[-200px]">
            <div className="inner w-[300px]">
              <div className="flex flex-row items-center">
                <Avatar alt="icon2" src="/Ellipse 7.jpeg" className="avatar" />
              </div>
              <div className="text_block">
                <h2 className="header">4k+</h2>
                <p className="body">People Looking for New Homes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
