/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import { useAnimate, m, useInView } from "framer-motion";
import { Avatar, Button } from "@material-tailwind/react";
import Link from "next/link";
import useUser from "@/details/user";
import Yellow from "@/details/yellow";
import Orange from "@/details/orange";
import Image from "next/image";

export default function List({ list1 }) {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  function randomMerge(array1, array2) {
    const finalArray = [];

    let i = 0;
    let j = 0;

    while (i < array1.length || j < array2.length) {
      const shouldPickFromFirstArray = Math.random() < 0.5;

      if (
        i < array1.length &&
        (shouldPickFromFirstArray || j >= array2.length)
      ) {
        finalArray.push(array1[i]);
        i++;
      } else if (j < array2.length) {
        finalArray.push(array2[j]);
        j++;
      }
    }

    return finalArray;
  }

  const uid = useUser((state) => state.user);
  const theme = useUser((state) => state.theme);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [list, setList] = useState(list1.length != undefined ? list1 : []);
  const [details, setDetails] = useState({});
  const [chosen, changeChosen] = useState("house");
  const [scope, animate] = useAnimate();

  useEffect(() => {
    list.map((obj) =>
      setDetails((prev) => ({ ...prev, [obj.deal.propertyName]: false }))
    );
  }, [list]);

  const appear = async () => {
    await animate(
      "#block",
      { opacity: [0, 0.5, 1], y: [60, 0, 0] },
      {
        duration: 0.8,
        ease: "easeIn",
        times: [0, 0.5, 1],
        delay: 0.2,
        z: 2,
      }
    );
  };

  const remove = async () => {
    await animate(
      "#block",
      { opacity: [1, 0.5, 0], y: [0, 0, 60] },
      {
        duration: 0.8,
        ease: "easeIn",
        times: [0, 0.5, 1],
        z: 2,
      }
    );
  };

  const handleClick = async (event) => {
    const id = event.target.id != undefined ? event.target.id : event;

    const change = async () => {
      changeChosen(id);
    };

    const changeList = async () => {
      setList(
        [...randomMerge(popular, newH)].filter(
          (elem) => elem.deal.type == id && elem.id != uid
        )
      );
    };

    await remove();
    await change();
    await changeList();
    await appear();
  };

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
    <div className="h-[100svh] flex flex-col md:gap-[40px]">
      <div className="absolute left-[105vw] top-[225vh]">
        <Yellow />
      </div>
      <div className="absolute left-[100vw] top-[200vh]">
        <Orange />
      </div>
      <div className="flex flex-col z-20 gap-5 md:gap-0 md:flex-row pl-0 md:pl-10 lg:pl-15 2xl:pl-0 items-center">
        <div className="font-lexend flex flex-col md:gap-3 gap-1 md:justify-start">
          <p className="font-medium text-[#F59E0B] lg:text-[16px] text-sm">
            -- Our Recomendation
          </p>
          <h1
            className={`font-semibold lg:text-3xl text-2xl ${
              theme == "light" ? "text-[#1B1C57]" : "text-white"
            }`}
          >
            Featured House
          </h1>
        </div>
        <div className="mx-auto flex flex-row md:gap-8 gap-4 place-items-center">
          {["House", "Villa", "Apartment"].map((name, index) => {
            return (
              <Button
                key={index}
                id={name.toLowerCase()}
                className={`${
                  chosen == name.toLowerCase()
                    ? "bg-green-100 text-green-500"
                    : theme == "light"
                      ? "bg-[#e5e5e5] text-[#888B97]"
                      : "bg-gray-400 text-white"
                } hover:shadow-lg px-[24px] py-[12px] rounded-[32px] flex flex-row pr-8 md:pr-6 lg:pr-7`}
                onClick={handleClick}
              >
                <Image
                  alt={index}
                  id={name.toLowerCase()}
                  width={100}
                  height={100}
                  src={`/${
                    chosen == name.toLowerCase() ? "green" : "gray"
                  }_${name.toLowerCase()}.webp`}
                  className="md:w-[24px] md:h-[24px] md:mr-[4px] w-5 h-5"
                  onClick={handleClick}
                />
                <p
                  id={name.toLowerCase()}
                  className="my-auto capitalize font-lexend font-medium md:text-[15px] text-sm"
                  onClick={handleClick}
                >
                  {name}
                </p>
              </Button>
            );
          })}
        </div>
      </div>
      <m.div ref={scope}>
        <m.div
          ref={ref}
          className="mt-8 flex flex-row gap-10 overflow-x-scroll overflow-y-hidden my-scrollbar"
          initial={inView ? "hidden" : ""}
          animate={inView ? "visible" : ""}
          transition={{
            duration: 1,
            ease: "easeIn",
            staggerChildren: 0.2,
            times: [0, 0.5, 1],
          }}
        >
          {list.length > 0
            ? list.map((obj, index) => {
                return (
                  <m.div
                    id="block"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 60,
                      },
                      visible: {
                        opacity: [0, 0.5, 1],
                        y: [60, 0, 0],
                      },
                    }}
                    key={index}
                    className="flex flex-col gap-3 h-auto justify-between md:ml-2 mb-5 z-20"
                  >
                    <div className="w-80 h-96 group group-last:rotate-45">
                      <Link
                        href={`/details/${obj.deal.propertyName}?id=${obj.id}`}
                      >
                        <img
                          alt="images"
                          src={obj.deal.propertyImages[0]}
                          loading="lazy"
                          className="w-80 h-96 rounded-[36px] ml-9 z-0 shadow-lg object-cover mt-1"
                        />
                      </Link>
                      <m.div
                        className={`relative bottom-20 w-[60%] ml-14 mt-5 z-30 flex flex-row gap-3 px-4 h-10 py-2 rounded-full text-center items-center ${
                          obj.deal.tag == "popular"
                            ? "bg-red-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <Image
                          alt="icon"
                          src={
                            obj.deal.tag == "popular"
                              ? "/popular.webp"
                              : "/new.webp"
                          }
                          width={100}
                          height={100}
                          className="w-4 h-4"
                        />
                        <p
                          className={`font-lexend font-semibold text-[15px] capitalize ${
                            obj.deal.tag == "popular"
                              ? "text-red-500"
                              : "text-blue-700"
                          }`}
                        >
                          {obj.deal.tag}
                        </p>
                      </m.div>
                    </div>
                    <div className="z-20 ml-9 mt-3 font-lexend">
                      <h2
                        className={`font-semibold ${
                          theme == "light" ? "text-black" : "text-white"
                        } text-[24px]`}
                      >
                        {obj.deal.propertyName}
                      </h2>
                      <p
                        className={`font-normal ${
                          theme == "light" ? "text-[#3C4563]" : "text-gray-400"
                        } text-[18px]`}
                      >
                        ${" "}
                        {divideStringIntoSegments(
                          obj.deal.propertyCost,
                          3
                        ).join(".")}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-row gap-3 ml-8">
                      <Avatar
                        src={obj.user.avatar}
                        alt="icon"
                        className="w-14 h-14"
                      />
                      {details[obj.deal.propertyName] ? (
                        <div
                          className="w-full h-auto bg-transparent backdrop-blur-xl flex flex-row gap-[1px] p-3 pt-2"
                          onMouseLeave={() =>
                            setDetails((prev) => ({
                              ...prev,
                              [obj.deal.propertyName]: false,
                            }))
                          }
                        >
                          {[
                            {
                              text: "account |",
                              url: "/users/account",
                            },
                            {
                              text: "message |",
                              url: "/message",
                            },
                            {
                              text: "deals",
                              url: "/details",
                            },
                          ].map((elem, index) => (
                            <Link
                              key={index}
                              href={
                                uid != ""
                                  ? `${elem.url}?id=${obj.id}&userId=${uid}`
                                  : ""
                              }
                            >
                              <p
                                className={`font-lexend font-medium ${
                                  theme == "light" ? "text-black" : "text-white"
                                }`}
                              >
                                {elem.text}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={"flex flex-col font-lexend text-[#0E1735]"}
                          onMouseEnter={() =>
                            setDetails((prev) => ({
                              ...prev,
                              [obj.deal.propertyName]: true,
                            }))
                          }
                        >
                          <h2
                            className={`font-semibold text-[18px] break-words ${
                              theme == "light" ? "text-black" : "text-white"
                            }`}
                          >
                            {obj.user.details.name
                              .split(" ")
                              .slice(1, 3)
                              .join(" ")}
                          </h2>
                          <p
                            className={`font-medium text-[16px] ${
                              theme == "light" ? "text-black" : "text-white"
                            }`}
                          >
                            {obj.user.details.country +
                              " " +
                              obj.user.details.city}
                          </p>
                        </div>
                      )}
                    </div>
                  </m.div>
                );
              })
            : ""}
          {list.length >= 10 ? (
            <Button className="w-16 h-12 bg-green-500 flex justify-center items-center rounded-full justify-self-center self-center ml-6 ">
              <p>More</p>
            </Button>
          ) : (
            ""
          )}
        </m.div>
      </m.div>
    </div>
  );
}
