/* eslint-disable @next/next/no-img-element */
import useStorage from "@/details/chosen";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

export default function List({ data }) {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const [user] = useAuthState(auth);

  const green_button =
    "hover:shadow-lg bg-green-100 px-[24px] py-[12px] rounded-[32px] text-green-500 ";
  const normal_button =
    "hover:shadow-lg bg-[#e5e5e5] px-[24px] py-[12px] rounded-[32px] text-[#888B97] ";

  const chosen = useStorage((state) => state.chosen);
  const changeChosen = useStorage((state) => state.changeChosen);

  const handleClick = (event) => {
    changeChosen(event.target.id);
  };

  return (
    <div className="px-10 w-full h-auto flex flex-col gap-[40px]">
      <div className="flex flex-row w-full">
        <div className="font-lexend flex flex-col gap-[12px] justify-start">
          <p className=" font-medium text-[#F59E0B] text-[16px]">
            -- Our Recomendation
          </p>
          <h1 className="font-semibold text-[32px] text-[#1B1C57]">
            Featured House
          </h1>
        </div>
        <div className="mx-auto flex flex-row gap-[32px] place-items-center">
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
        <div className="flex flex-row gap-[10px] justify-end items-center *:rounded-full *:w-[60px] *:h-[55px]">
          <Button className="bg-[#E0E3EB] hover:shadow-lg">
            <img
              alt="left"
              src="/left.png"
              className="mx-auto w-[25px] h-[25px]"
            />
          </Button>
          <Button className="bg-green-500 hover:shadow-lg">
            <img
              alt="right"
              src="/right.png"
              className="mx-auto w-[25px] h-[25px]"
            />
          </Button>
        </div>
      </div>
      <div className="mt-16">{console.log(data)}</div>
    </div>
  );
}
