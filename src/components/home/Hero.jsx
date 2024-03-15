/* eslint-disable @next/next/no-img-element */
import Vector from "@/details/vector";
import { m } from "framer-motion";
import Image from "next/image";
import useUser from "@/details/user";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const theme = useUser((state) => state.theme);

  return (
    <div className=" h-[100vh] md:h-auto flex flex-row mb-[60px]">
      <div className="relative bottom-[400px] left-[400px]">
        <Vector />
      </div>
      <div className="lg:max-w-[37.5%] ml-[5%] lg:ml-15 2xl:ml-0 w-[90%] h-auto absolute top-[182px] md:flex md:flex-col md:items-center lg:block">
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="flex items-center flex-col lg:block mt-20 md:mt-0 xl:mt-20"
        >
          <p
            className={`font-lexend font-bold text-4xl md:text-5xl lg:text-4xl ${
              theme == "light" ? "text-[#1B1C57]" : "text-white"
            }`}
          >
            <span className="inline-block">Find The Place To </span>
            <br />
            <span className="inline-block">
              Live{" "}
              <span
                className={`${
                  theme == "light" ? "text-[#1B1C57]" : "text-white"
                }`}
              >
                {" "}
                Your Dreams
              </span>{" "}
            </span>
            <br />
            <span className="inline-block">Easily Here</span>
          </p>
          <p
            className={`font-lexend font-[400] lg:text-lg md:text-2xl text-center lg:text-start pl-0 md:pl-4 lg:pl-0 text-xl md:max-w-[65%] lg:max-w-full mt-[24px]  ${
              theme == "light" ? "text-black" : "text-white"
            }`}
          >
            Everything you need about finding your place to live will be here,
            where it will be easier for you
          </p>
        </m.div>
        <div className="mt-2 2xl:mt-10 pl-2 md:pl-2 lg:pl-0 text-center md:text-start pt-5 pb-20 md:pb-0 md:mb-0 md:pt-0">
          <m.h2
            className="font-lexend font-normal text-gray-500 inline-block mb-3 md:mb-0"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
          >
            Our Partnership
          </m.h2>
          <m.div
            className={`md:flex md:flex-row md:gap-9 md:pl-0 grid grid-cols-2 justify-items-center`}
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
              delay: 0.4,
              times: [0, 0.5, 1],
            }}
          >
            {["/traveloka", "/tiket", "/airbnb", "/trip"].map((path, index) => {
              return (
                <div
                  key={index}
                  className="rounded-full mt-2 bg-center bg-cover"
                  style={{ backgroundImage: `url(${path + "-small.webp"})` }}
                >
                  <m.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    alt={path}
                    src={path + ".webp"}
                    loading="lazy"
                    className={`${
                      theme == "light"
                        ? " ring-offset-2 ring-1 ring-white ring-offset-white"
                        : " object-center object-cover"
                    } bg-white rounded-full px-4 py-1`}
                  />
                </div>
              );
            })}
          </m.div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-column lg:justify-end rounded-bl-md">
        <div
          className="w-[55vw] h-[100vh] relative bottom-[13%] xl:left-[15%] left-[-10%] rounded-bl-[80px] bg-center bg-cover"
          style={{ backgroundImage: "url(/hero-small.webp)" }}
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            <Image
              alt="hero"
              src="/hero.webp"
              loading="lazy"
              fill
              className="rounded-bl-[80px] object-center object-cover"
            />
          </m.div>
        </div>
        <div className="overflow-x-scroll hidden 2xl:block">
          <div className="box">
            <div className="inner">
              <div className="flex flex-row items-center -space-x-4">
                {["/Ellipse 4.webp", "/Ellipse 5.webp", "/Ellipse 6.jpg"].map(
                  (path, index) => {
                    return (
                      <Image
                        alt={path}
                        src={path}
                        key={index}
                        loading="lazy"
                        className="rounded-full w-14 h-14"
                        width={100}
                        height={100}
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
                <Image
                  alt="icon1"
                  src="/Rectangle 12.webp"
                  className="rounded-full w-14 h-14"
                  loading="lazy"
                  width={100}
                  height={100}
                />
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
                <Image
                  alt="icon2"
                  src="/Ellipse 7.jpg"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="rounded-full w-14 h-14"
                />
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
