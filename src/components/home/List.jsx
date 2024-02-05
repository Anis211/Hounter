/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import { useAnimate, motion, useInView } from "framer-motion";
import { Avatar, Button } from "@material-tailwind/react";
import Link from "next/link";
import useUser from "@/details/user";

export default function List({ popular, newH }) {
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

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [list, setList] = useState(
    randomMerge(popular, newH).length > 10
      ? randomMerge(popular, newH)
          .filter((elem) => elem.deal.type == "house" && elem.id != uid)
          .slice([0, 10])
      : randomMerge(popular, newH).filter(
          (elem) => elem.deal.type == "house" && elem.id != uid
        )
  );

  const [details, setDetails] = useState({});

  const green_button =
    "hover:shadow-lg bg-green-100 px-[24px] py-[12px] rounded-[32px] text-green-500 ";
  const normal_button =
    "hover:shadow-lg bg-[#e5e5e5] px-[24px] py-[12px] rounded-[32px] text-[#888B97] ";

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
    const id = event.target.id;

    const change = async () => {
      changeChosen(id);
    };

    const changeList = async () => {
      setList(
        [...randomMerge(popular, newH)].filter(
          (elem) => elem.deal.type == event.target.id && elem.id != uid
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
    <div className="pr-32 w-[100vw] h-auto flex flex-col gap-[40px]">
      <div className="flex flex-row w-full">
        <div className="font-lexend flex flex-col gap-[12px] justify-start">
          <p className=" font-medium text-[#F59E0B] text-[16px]">
            -- Our Recomendation
          </p>
          <h1 className="font-semibold text-[32px] text-[#1B1C57]">
            Featured House
          </h1>
        </div>
        <div className="mx-auto flex flex-row gap-[32px] place-items-center ">
          {["House", "Villa", "Apartment"].map((name, index) => {
            return (
              <Button
                key={index}
                id={name.toLowerCase()}
                className={`${
                  chosen == name.toLowerCase() ? green_button : normal_button
                } flex flex-row`}
                onClick={handleClick}
              >
                <img
                  alt={index}
                  id={name.toLowerCase()}
                  src={`/${
                    chosen == name.toLowerCase() ? "green" : "gray"
                  }_${name.toLowerCase()}.png`}
                  className="w-[24px] h-[24px] mr-[4px]"
                  onClick={handleClick}
                />
                <p
                  id={name.toLowerCase()}
                  className="my-auto capitalize font-lexend font-medium text-[15px]"
                  onClick={handleClick}
                >
                  {name}
                </p>
              </Button>
            );
          })}
        </div>
      </div>
      <motion.div ref={scope}>
        <motion.div
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
          {list.map((obj, index) => {
            return (
              <motion.div
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
                className="flex flex-col gap-3 h-auto justify-between ml-2 mb-5 z-20"
              >
                <div className="w-80 h-96 group group-last:rotate-45">
                  <Link href={`/details/${obj.deal.propertyName}?id=${obj.id}`}>
                    <img
                      alt="images"
                      src={obj.deal.propertyImages[0]}
                      className="w-80 h-96 rounded-[36px] ml-9 z-0 shadow-lg object-cover mt-1"
                    />
                  </Link>
                  <motion.div
                    className={`relative bottom-20 w-[60%] ml-14 mt-5 z-30 flex flex-row gap-3 px-4 h-10 py-2 rounded-full text-center items-center ${
                      obj.deal.tag == "popular" ? "bg-red-100" : "bg-blue-100"
                    }`}
                  >
                    <img
                      alt="icon"
                      src={
                        obj.deal.tag == "popular" ? "/popular.png" : "/new.png"
                      }
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
                  </motion.div>
                </div>
                <div className="z-20 ml-9 mt-3 font-lexend">
                  <h2 className="font-semibold text-black text-[24px]">
                    {obj.deal.propertyName}
                  </h2>
                  <p className="font-normal text-[#3C4563] text-[18px]">
                    ${" "}
                    {divideStringIntoSegments(obj.deal.propertyCost, 3).join(
                      "."
                    )}
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
                          href={`${elem.url}?id=${obj.id}&userId=${uid}`}
                        >
                          <p className="font-lexend font-medium ">
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
                      <h2 className="font-semibold text-[18px] break-words">
                        {obj.user.details.name.split(" ").slice(1, 3).join(" ")}
                      </h2>
                      <p className="font-medium text-[16px]">
                        {obj.user.details.country + " " + obj.user.details.city}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          {list.length >= 10 ? (
            <Button className="w-16 h-12 bg-green-500 flex justify-center items-center rounded-full justify-self-center self-center ml-6 ">
              <p>More</p>
            </Button>
          ) : (
            ""
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
