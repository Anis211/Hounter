/* eslint-disable @next/next/no-img-element */
import DarkYellow from "@/details/darkYellow";
import LightGreen from "@/details/lightGreen";
import GreenTheme from "@/details/greenTheme";
import BlueTheme from "@/details/blueTheme";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Avatar } from "@material-tailwind/react";
import { m, useInView } from "framer-motion";
import useUser from "@/details/user";
import Image from "next/image";

export default function Article() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const theme = useUser((state) => state.theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [articles, setArticles] = useState([
    {
      image: "/house1.webp",
      header: "12 Things to know before buying a house",
      body: "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      user: {
        avatar: "/defaultAvatars/base_man_body.png",
        name: "Emil Etibarovich",
      },
      timeToRead: {
        minutes: 8,
      },
      time: {
        date: 25,
        month: months[3],
        year: 2023,
      },
    },
    {
      image: "/house2.webp",
      header: "The things we need to check when we want to buy a house",
      body: "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      user: {
        avatar: "/defaultAvatars/base_man_body.png",
        name: "Emil Etibarovich",
      },
      timeToRead: {
        minutes: 4,
      },
      time: {
        date: 18,
        month: months[5],
        year: 2023,
      },
    },
    {
      image: "/house3.webp",
      header: "7 Ways to distinguish the quality of the house we want to buy",
      body: "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      user: {
        avatar: "/defaultAvatars/base_man_body.png",
        name: "Emil Etibarovich",
      },
      timeToRead: {
        minutes: 3,
      },
      time: {
        date: 21,
        month: months[5],
        year: 2023,
      },
    },
    {
      image: "/house4.webp",
      header: "The best way to know the quality of the house we want to buy",
      body: "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      user: {
        avatar: "/defaultAvatars/base_man_body.png",
        name: "Emil Etibarovich",
      },
      timeToRead: {
        minutes: 7,
      },
      time: {
        date: 1,
        month: months[6],
        year: 2023,
      },
    },
  ]);

  const [userHovered, setUserHovered] = useState({});

  useEffect(() => {
    articles.map((elem, index) =>
      setUserHovered((prev) => ({ ...prev, [index]: false }))
    );
  }, [articles]);

  return (
    <div ref={ref} className="mt-32 h-auto flex flex-col gap-4">
      <div className="absolute left-[30svw] top-[360svh]">
        <LightGreen />
      </div>
      <div className="absolute left-[30svw] top-[380svh]">
        <DarkYellow />
      </div>
      <m.div
        className="flex flex-col gap-2 text-center z-20"
        initial="hidden"
        animate={inView ? "visible" : ""}
        transition={{
          duration: 1,
          type: "spring",
          staggerChildren: 0.2,
        }}
      >
        <h2 className="border-t-2 border-t-orange-500 w-11 self-center" />
        <m.h2
          className="text-orange-500 font-lexend font-regular"
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
          See tips and trick from our partnership
        </m.h2>
        <m.h2
          className={`max-w-lg mx-auto font-lexend font-bold ${
            theme != "dark" ? "text-[#1B1C57]" : "text-white"
          } md:text-4xl text-2xl lg:py-4 py-2`}
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
          {"Find out more about \n selling and buying homes"}
        </m.h2>
        <m.button
          className="mx-auto py-3 px-4 max-w-36 bg-[#118C63] hover:shadow-xl active:shadow-sm shadow-md text-white rounded-full font-lexend font-medium text-sm"
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
          More Article
        </m.button>
      </m.div>
      <m.div className="2xl:grid 2xl:grid-cols-2 2xl:gap-12 2xl:my-10 flex flex-col z-30 gap-10 px-4 md:px-10 lg:px-16 2xl:px-0">
        <m.div
          className="flex flex-col gap-10 md:gap-7 2xl:gap-0"
          initial="hidden"
          animate={inView ? "visible" : ""}
          transition={{
            duration: 1,
            type: "spring",
            staggerChildren: 0.2,
            delayChildren: 1.1,
          }}
        >
          {articles.slice(1, 4).map((article, index) => (
            <m.div
              key={index}
              className="flex 2xl:flex-row flex-col gap-10"
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
              <img
                src={article.image}
                alt="article icon"
                className="2xl:max-w-[60%] 2xl:max-h-[80%] w-full h-auto rounded-2xl hover:shadow-2xl"
              />
              <div className="flex flex-col gap-4 self-start">
                <div className="flex flex-row gap-2">
                  <Avatar
                    src={article.user.avatar}
                    alt="icon"
                    className="2xl:w-12 2xl:h-12 w-12 h-12 md:w-16 md:h-16"
                  />
                  {!userHovered[index + 1] ? (
                    <div
                      className={`flex flex-col font-lexend ${
                        theme != "dark" ? "text-[#0E1735]" : "text-white"
                      }`}
                      onMouseEnter={() =>
                        setUserHovered((prev) => ({
                          ...prev,
                          [index + 1]: true,
                        }))
                      }
                    >
                      <h2
                        className={`font-semibold 2xl:text-md text-md md:text-xl break-words my-auto`}
                      >
                        {article.user.name}
                      </h2>
                    </div>
                  ) : (
                    <div
                      onMouseLeave={() =>
                        setUserHovered((prev) => ({
                          ...prev,
                          [index + 1]: false,
                        }))
                      }
                      className="w-full h-auto bg-transparent backdrop-blur-xl flex flex-row gap-[1px] p-3 2xl:pt-2 pt-2 md:pt-4"
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
                          <p
                            className={`font-lexend font-medium text-md 2xl:text-sm text-xl  ${
                              theme != "dark" ? "text-[#0E1735]" : "text-white"
                            }`}
                          >
                            {elem.text}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <h2
                  className={`font-lexend font-bold  ${
                    theme != "dark" ? "text-[#0E1735]" : "text-white"
                  } 2xl:text-xl text-2xl md:text-3xl self-center`}
                >
                  {article.header}
                </h2>
                <p
                  className={`font-lexend font-medium ${
                    theme != "dark" ? "text-[#626687]" : "text-gray-400"
                  } text-md 2xl:text-md md:text-xl visible xl:hidden`}
                >
                  {article.body}
                </p>
                <div className="font-lexend font-regular text-[#888B97] flex flex-row gap-3 pt-4 justify-self-end">
                  <Image
                    src="/clock.webp"
                    alt="time"
                    width={100}
                    height={100}
                    className="max-w-6 max-h-6"
                  />
                  <p className="text-sm 2xl:text-sm md:text-lg my-auto">{`${article.timeToRead.minutes} min read  |  ${article.time.date} ${article.time.month} ${article.time.year}`}</p>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
        <m.div
          className="flex flex-col gap-6"
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={inView ? { opacity: 1, y: 0 } : ""}
          transition={{
            duration: 0.8,
            type: "spring",
            delay: 0.6,
          }}
        >
          <img
            src={articles[0].image}
            alt="article icon"
            className="rounded-2xl hover:shadow-2xl"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <Avatar
                src={articles[0].user.avatar}
                alt="icon"
                className="w-12 h-12 2xl:w-12 2xl:h-12 md:w-16 md:h-16"
              />
              {!userHovered[0] ? (
                <div
                  className={"flex flex-col font-lexend text-[#0E1735]"}
                  onMouseEnter={() =>
                    setUserHovered((prev) => ({ ...prev, [0]: true }))
                  }
                >
                  <h2
                    className={`font-semibold text-md 2xl:text-md md:text-xl break-words my-auto  ${
                      theme != "dark" ? "text-black" : "text-white"
                    }`}
                  >
                    {articles[0].user.name}
                  </h2>
                </div>
              ) : (
                <div
                  onMouseLeave={() =>
                    setUserHovered((prev) => ({ ...prev, [0]: false }))
                  }
                  className="w-full h-auto bg-transparent backdrop-blur-xl flex flex-row gap-[1px] p-3 2xl:pt-2 pt-2 md:pt-4"
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
                      <p
                        className={`font-lexend font-medium text-md 2xl:text-md md:text-xl${
                          theme != "dark" ? "text-black" : "text-white"
                        }`}
                      >
                        {elem.text}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <h2
              className={`font-lexend font-bold  ${
                theme != "dark" ? "text-[#0E1735]" : "text-white"
              } 2xl:text-2xl text-2xl md:text-3xl`}
            >
              {articles[0].header}
            </h2>
            <p
              className={`font-lexend font-medium  ${
                theme != "dark" ? "text-[#626687]" : "text-gray-400"
              } text-md 2xl:text-md md:text-xl`}
            >
              {articles[0].body}
            </p>
            <div className="font-lexend font-regular text-[#888B97] flex flex-row gap-3 pt-4">
              <Image
                width={100}
                height={100}
                src="/clock.webp"
                alt="time"
                className="max-w-6 max-h-6"
              />
              <p className="text-sm 2xl:text-sm md:text-lg my-auto">{`${articles[0].timeToRead.minutes} min read  |  ${articles[0].time.date} ${articles[0].time.month} ${articles[0].time.year}`}</p>
            </div>
          </div>
        </m.div>
      </m.div>
      <div className="absolute left-[100svw] top-[480svh] z-[-2]">
        <GreenTheme />
      </div>
      <div className="absolute left-[120svw] top-[460svh] z-[-1]">
        <BlueTheme />
      </div>
    </div>
  );
}
