/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimate, useInView } from "framer-motion";
import Link from "next/link";

export default function Comments({ comments }) {
  const [scope, animate] = useAnimate();

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [hovered, setHovered] = useState(false);
  const [viewHovered, setViewHovered] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [userHovered, setUserHovered] = useState(false);

  const [comment, setComment] = useState(
    comments[Math.floor(comments.length / 2)]
  );
  const [index1, setIndex1] = useState(Math.floor(comments.length / 2));

  const animation = async (direction, index) => {
    const set = async () => {
      setComment(comments[index]);
    };

    const animated = async () => {
      await animate(
        "#card",
        { opacity: [1, 0], x: [0, 1000 * direction] },
        { duration: 0.3, ease: "easeIn", times: [0, 1] }
      );
      await set();
      setTimeout(
        () =>
          animate(
            "#card",
            { opacity: [0, 1], x: [1000 * direction * -1, 0] },
            { duration: 0.5, ease: "easeOut", times: [0, 1] }
          ),
        500
      );
    };

    const remove = async () => {
      setHovered(false);
      setTimeout(animated, 900);
      setTimeout(() => setHovered(true), 1500);
    };

    if (hovered) {
      await remove();
    } else {
      await animated();
    }
  };

  useEffect(() => {
    setViewHovered(true);
    setHovered(true);
    setTimeout(() => setViewHovered(false), 500);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="md:my-20 my-32 h-[70vh] xl:h-[110vh] flex flex-col gap-4"
    >
      <motion.div
        className="flex flex-col md:gap-2 text-center"
        initial="hidden"
        animate={inView ? "visible" : ""}
        transition={{
          duration: 1,
          type: "spring",
          staggerChildren: 0.2,
        }}
      >
        <h2 className="border-t-2 border-t-orange-500 w-11 self-center" />
        <motion.h2
          className="text-orange-500 font-lexend font-regular text-lg"
          variants={{
            hidden: {
              opacity: 0,
              y: 60,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          See our review
        </motion.h2>
        <motion.h2
          className="font-lexend font-bold text-[#1B1C57] md:text-4xl text-2xl md:py-4 py-2"
          variants={{
            hidden: {
              opacity: 0,
              y: 60,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          What Our Users Say About Us
        </motion.h2>
      </motion.div>
      <motion.div
        ref={scope}
        className="mx-auto flex flex-row lg:gap-6 gap-6 md:gap-10 bg-transparent"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : ""}
        transition={{ duration: 0.8, type: "spring", delay: 0.4 }}
      >
        <button
          disabled={index1 == 0}
          className="disabled:opacity-[0.4] z-50 hover:shadow-xl active:shadow-sm shadow-md max-h-14 max-w-14 rounded-full my-auto"
        >
          <Avatar
            src="/left1.png"
            alt="icon"
            className="md:w-14 md:h-14 w-8 h-8 md:ring-4 ring-2 p-2 ring-black my-auto"
            onClick={() => {
              animation(1, index1 - 1);
              setIndex1((prev) => prev - 1);
            }}
          />
        </button>
        <div className="flex flex-col">
          <motion.div id="card" className="w-[60vw] h-[44vw]">
            <img
              src={comment.image}
              alt="comment"
              className="w-full h-[34vw] rounded-xl"
              onMouseEnter={() => (!clicked ? setHovered(true) : "")}
            />
            <AnimatePresence>
              {hovered ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    inView
                      ? { opacity: [0, 1, 1], y: ["0%", "-45%", "0%"] }
                      : ""
                  }
                  exit={{ opacity: [1, 0.8, 0], y: ["0%", "-45%", "0%"] }}
                  transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: viewHovered ? 0.5 : 0,
                  }}
                  className="w-[113%] md:max-w-[85%] right-[6%] md:right-0 h-[calc(55% - 10vw)] shadow-lg bg-white md:py-5 py-3 pb-5 px-6 md:px-8 mx-auto relative bottom-[25%] rounded-xl"
                >
                  <div className="font-lexend flex flex-col md:gap-3 gap-2">
                    <img
                      src="/close.png"
                      alt="close"
                      className="md:w-6 md:h-6 w-4 h-4 relative md:left-[98%] md:bottom-[100%] bottom-[95%] left-[100%]"
                      onClick={async () => {
                        setHovered(false);
                        setClicked(true);
                        setTimeout(() => setClicked(false), 1000);
                      }}
                    />
                    <h2 className="md:text-2xl text-xl font-bold text-[#1B1C57]">
                      {comment.header}
                    </h2>
                    <p className="text-[#626687] font-regular md:text-lg text-sm">
                      {comment.body}
                    </p>
                  </div>
                  <motion.div className="flex flex-row justify-between md:pt-8 pt-3">
                    <div className="flex flex-row gap-3">
                      <Avatar
                        src={comment.user.avatar}
                        alt="icon"
                        className="md:w-14 md:h-14 w-10 h-10"
                      />
                      {!userHovered ? (
                        <div
                          className={"flex flex-col font-lexend text-[#0E1735]"}
                          onMouseEnter={() => setUserHovered(true)}
                        >
                          <h2 className="font-semibold md:text-[18px] text-md break-words">
                            {comment.user.name.split(" ").slice(1, 3).join(" ")}
                          </h2>
                          <p className="font-regular md:text-[16px] text-sm text-[#888B97]">
                            {comment.user.country + " " + comment.user.city}
                          </p>
                        </div>
                      ) : (
                        <div
                          onMouseLeave={() => setUserHovered(false)}
                          className="w-full h-auto bg-transparent backdrop-blur-xl flex flex-row gap-[1px] p-3 pt-2"
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
                            <Link key={index} href={`${elem.url}`}>
                              <p className="font-lexend font-medium ">
                                {elem.text}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row md:gap-3 gap-1">
                      <img
                        src="/star.png"
                        alt="rating"
                        className="md:w-10 md:h-10 w-8 h-8 md:self-end self-center"
                      />
                      <h2 className="font-semibold font-lexend text-xl text-[#3C4563] md:mb-1 md:self-end self-center mt-1 md:mt-0">
                        {comment.rating}
                      </h2>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
          </motion.div>
          <div className="flex flex-row gap-2 mx-auto">
            {comments.map((elem, index) => (
              <button
                key={index}
                id={index}
                className={`rounded-full w-3 h-3 hover:scale-150 active:scale-90 ${
                  index1 == index ? "bg-[#3C4563]" : "bg-[#E0E3EB]"
                }`}
                onClick={(e) => {
                  if (e.currentTarget.id > index1) {
                    animation(-1, e.currentTarget.id);
                    setIndex1(e.currentTarget.id);
                  } else if (e.currentTarget.id < index1) {
                    animation(1, e.currentTarget.id);
                    setIndex1(e.currentTarget.id);
                  }
                  setIndex1(e.currentTarget.id);
                }}
              />
            ))}
          </div>
        </div>
        <button
          disabled={index1 == comments.length - 1}
          className="disabled:opacity-[0.4] hover:shadow-xl active:shadow-sm shadow-md rounded-full my-auto"
          onClick={() => {
            animation(-1, String(parseInt(index1) + 1));
            setIndex1((prev) => String(parseInt(prev) + 1));
          }}
        >
          <Avatar
            src="/right1.png"
            alt="icon"
            className="w-8 h-8 md:w-14 md:h-14 md:ring-4 ring-2 p-2 ring-black my-auto"
          />
        </button>
      </motion.div>
    </motion.div>
  );
}
