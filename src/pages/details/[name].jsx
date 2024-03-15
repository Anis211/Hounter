/* eslint-disable @next/next/no-img-element */
import { firestore } from "../../../firebase/clientApp";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import Image from "next/image";
import { m } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Avatar,
} from "@material-tailwind/react";

export default function Detail({ data, user }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [chosen, setChosen] = useState(data.propertyImages[0]);
  const [remained, setRemained] = useState(
    data.propertyImages.slice(1, data.propertyImages.length)
  );

  const name = data.propertyName.split(" ");

  const divideStringIntoSegments = (inputString, segmentLength) => {
    if (
      typeof inputString !== "string" ||
      typeof segmentLength !== "number" ||
      segmentLength <= 0
    ) {
      return "Invalid input";
    }

    const segments = [];
    for (let i = inputString.length; i > 0; i -= segmentLength) {
      segments.unshift(inputString.slice(Math.max(0, i - segmentLength), i));
    }

    return segments;
  };

  return (
    <>
      <div className="fixed left-64 bottom-[60vh] z-[-1]">
        <Vector />
      </div>
      <div className="fixed left-[38vw] bottom-[94vh] z-[-1]">
        <Vector />
      </div>
      <div className="fixed left-[105vw] top-[60vh] z-[-1]">
        <Yellow />
      </div>
      <div className="mt-16">
        <div className="flex flex-row gap-3 justify-center">
          <div
            className="flex flex-col justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <m.h2
              className="flex flex-row font-lexend font-bold text-[36px] text-[#1B1C57] mx-auto"
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                times: [0, 0.5, 1],
                type: "spring",
                staggerChildren: 0.2,
              }}
            >
              {name.map((letter, index) => (
                <m.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 80,
                      y: 40,
                    },
                    visible: {
                      opacity: [0, 0.5, 1],
                      x: [80, 80, 0],
                      y: [40, -20, 0],
                    },
                  }}
                  key={index}
                  className={`font-lexend font-bold text-[36px] text-[#1B1C57] inline-block ${
                    data.propertyName.includes(" ") ? "mr-2" : ""
                  }`}
                >
                  {letter}
                </m.span>
              ))}
            </m.h2>
            <m.hr
              className="border-black mt-2 border-[1px] mx-auto"
              initial={{ width: "100%" }}
              animate={hovered ? { width: "0px" } : ""}
              transition={
                hovered
                  ? {
                      duration: 1.5,
                      ease: "backInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }
                  : ""
              }
            />
          </div>
          {data.tag != "" ? (
            <m.div
              initial={{
                opacity: 0,
                x: 80,
                y: 40,
              }}
              animate={{
                opacity: [0, 0.5, 0.5, 1],
                x: [80, 80, 80, 0],
                y: [40, -20, -20, 0],
              }}
              transition={{
                duration: 1,
                times: [0, 0.4, 0.8, 1],
                type: "spring",
                delay: 0.6,
              }}
              className={`self-center flex flex-row gap-3 px-4 h-10 py-2 rounded-full text-center items-center ${
                data.tag == "popular" ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              <img
                alt="icon"
                src={data.tag == "popular" ? "/popular.png" : "/new.png"}
                className="w-5 h-5"
              />
              <p
                className={`font-lexend font-semibold text-[16px] capitalize ${
                  data.tag == "popular" ? "text-red-500" : "text-blue-700"
                }`}
              >
                {data.tag}
              </p>
            </m.div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-row gap-10 justify-between pt-16">
          <m.div
            className="font-lexend flex flex-col"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: [60, -15, 0], opacity: [0, 0.5, 1] }}
            transition={{
              duration: 1,
              ease: "backInOut",
              times: [0, 0.5, 1],
            }}
          >
            <h2 className="font-semibold text-[22px] text-[#1B1C57]">
              Creator Account Details
            </h2>
            <div className="flex flex-row text-[#3C4563] gap-6 mt-6">
              <Avatar src={user.avatar} alt="icon" className="w-14 h-14" />
              <div className="flex flex-col gap-3 font-lexend">
                <h2 className="text-[18px]">
                  <span className="font-semibold">Full Name:</span>{" "}
                  {user.details.name}
                </h2>
                <p className="text-[16px]">
                  <span className="font-semibold ">Phone Number:</span>{" "}
                  {user.details.number[0] +
                    " " +
                    divideStringIntoSegments(
                      user.details.number.slice(1, 7),
                      3
                    ).join(" ") +
                    " " +
                    user.details.number.slice(7, user.details.number.length)}
                </p>
              </div>
            </div>
            <hr className="border-black my-6" />

            <h2 className="font-semibold text-[22px] text-[#1B1C57]">
              House Details
            </h2>
            <div className="grid grid-cols-2 text-[#3C4563] gap-10 mt-10 mb-8">
              {[
                {
                  text:
                    data.bedrooms > 1
                      ? data.bedrooms + " Bedrooms"
                      : data.bedrooms + " Bedroom",
                  url: "/bed.png",
                },
                {
                  text:
                    data.bathrooms > 1
                      ? data.bathrooms + " Bathrooms"
                      : data.bathrooms + " Bathroom",
                  url: "/bath.png",
                },
                {
                  text:
                    data.carports > 1
                      ? data.carports + " Carports"
                      : data.carports + " Carport",
                  url: "/carport.png",
                },
                {
                  text:
                    data.floors > 1
                      ? data.floors + " Floors"
                      : data.floors + " Floor",
                  url: "/stairs.png",
                },
              ].map((obj, index) => {
                return (
                  <div key={index} className="flex flex-row gap-3">
                    <Image alt="icon" src={obj.url} width={40} height={40} />
                    <p className="my-auto">{obj.text}</p>
                  </div>
                );
              })}
            </div>
            <hr className="border-black" />

            <div className="mt-10 text-[#3C4563] flex flex-col gap-5 mb-8">
              {[
                "Price: $ " +
                  divideStringIntoSegments(data.propertyCost, 3).join("."),
                "Property type: " + data.type,
                `Creation Date: ${data?.date.day}.${data?.date.month}.${data?.date.year}`,
                "The number of visitors: " + data.viewed,
              ].map((text, index) => (
                <p className="text-[18px] flex flex-row gap-1" key={index}>
                  {text}
                </p>
              ))}
            </div>
            <hr className="border-black" />
          </m.div>
          <m.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: [60, -15, 0], opacity: [0, 0.5, 1] }}
            transition={{
              duration: 1,
              ease: "backInOut",
              times: [0, 0.5, 1],
            }}
          >
            <Dialog open={open} className="w-full">
              <DialogHeader>Image</DialogHeader>
              <DialogBody>
                <img
                  alt="main"
                  src={chosen}
                  className="w-96 h-96 object-contain"
                />
              </DialogBody>
              <DialogFooter>
                <button
                  className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </DialogFooter>
            </Dialog>
            <div className="flex flex-col mr-24 ">
              <img
                src={chosen}
                alt="main image"
                className="w-96 h-96 rounded-lg ml-20 hover:shadow-xl active:shadow-sm "
                onClick={() => setOpen(true)}
              />
              <div className="flex flex-row gap-3 z-20 w-auto justify-between absolute bottom-8">
                <div className="flex flex-row gap-3 overflow-x-auto">
                  {remained.map((url, index) => (
                    <img
                      key={index}
                      alt={index}
                      src={url}
                      className="bg-white w-48 h-32 z-20 rounded-lg shadow-lg hover:shadow-xl object-cover"
                      onClick={(e) => {
                        setRemained((prev) => [
                          ...prev.slice(0, prev.indexOf(e.target.src)),
                          ...prev.slice(
                            prev.indexOf(e.target.src) + 1,
                            prev.length
                          ),
                          chosen,
                        ]);
                        setChosen(e.target.src);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const name = context.query.name;

  const docRef = doc(collection(firestore, "deals"), id);
  const res = await getDoc(docRef);
  const data = res.data();

  await setDoc(doc(collection(firestore, "deals"), id), {
    ...data,
    [name]: {
      ...data[name],
      viewed: data[name].viewed + 1,
      tag:
        data[name].viewed > 50
          ? "popular"
          : 31 * new Date().getMonth() - data[name].date.month * 31 < 12
            ? "new " + data[name].type
            : data[name].tag,
    },
  });

  const result = await getDoc(doc(firestore, "Users", id));
  const user = result.data();

  return {
    props: {
      data: data[name],
      user: user,
    },
  };
}
