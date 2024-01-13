/* eslint-disable @next/next/no-img-element */
import Vector from "@/details/vector";
import { Button, Avatar } from "@material-tailwind/react";
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
    <div className="flex flex-row mb-[60px]">
      <div className="relative bottom-[400px] left-[400px]">
        <Vector />
      </div>
      <div className="w-[480px] h-[450px] absolute top-[182px]">
        <motion.div>
          <motion.p
            className="font-lexend font-bold text-[40px] text-[#1B1C57]"
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
              Live <span className="text-gray-100 "> Your Dreams</span>{" "}
            </motion.span>
            <br />
            <motion.span variants={spanVariants} className="inline-block">
              Easily Here
            </motion.span>
          </motion.p>
          <motion.p
            className="font-lexend font-[400] text-[16px] mt-[24px]"
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
        <div className="my-[32px] h-[56px]">
          <input
            type="text"
            placeholder="Search for the location you want"
            className="rounded-full w-full h-full pl-10 pr-5 py-6 ring-1 ring-blue-gray-100 focus:outline-none focus:ring-blue-gray-400"
          />
          <img
            alt="icon"
            src="/search.png"
            className="relative bottom-[40px] left-[10px]"
          />
          <Button
            ripple
            className="flex flex-row place-items-center bg-green-500 rounded-full px-[12px] py-[16px] w-[110px] h-[50px] relative bottom-[77.5px] left-[367px] capitalize "
          >
            <p className="font-lexend font-semibold text-[14px] pl-2">Search</p>
            <img alt="arrow" src="/arrow-r.png" className="w-[24px] h-[24px]" />
          </Button>
        </div>
        <div>
          <motion.h2
            className="font-lexend font-normal text-gray-500 inline-block"
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
            className="flex flex-row gap-9"
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
      <div className="flex flex-column justify-end rounded-bl-md">
        <img
          alt="hero"
          src="/hero.png"
          className="w-[900px] h-[720px] relative bottom-[100px] left-[120px] rounded-bl-[80px]"
        />
        <div className="overflow-x-scroll">
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
