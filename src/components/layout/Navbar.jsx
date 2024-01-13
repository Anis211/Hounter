/* eslint-disable @next/next/no-img-element */
import Logo from "@/details/logo";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="z-20 flex flex-row h-[46px]">
      <div className="p-1.5 flex flex-row gap-12 flex-2">
        <Logo />
        <h4 className="font-lexend font-bold size-[16px] place-self-center">
          Hounter
        </h4>
        <img
          alt="svg"
          src="/line.svg"
          className="absolute top-[95px] w-[120px]"
        />
      </div>
      <div className="flex flex-1 justify-end gap-[56px]">
        <motion.div
          className="flex flex-row gap-[26px]"
          initial="hidden"
          animate="visible"
          transition={{
            type: "spring",
            duration: 1,
            times: [0, 0.5, 1],
            staggerChildren: 0.1,
          }}
        >
          {["About us", "Article", "Property"].map((text, index) => (
            <motion.button
              key={index}
              layout
              className={` bg-white bg-opacity-10 ring-1 ring-white ring-opacity-30 px-[16px] py-[8px] rounded-[32px] hover:shadow-lg`}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: [20, 0, 0], opacity: [0, 0.5, 1] },
              }}
            >
              <p className="font-lexend font-semibold text-neutral-100">
                {text}
              </p>
            </motion.button>
          ))}
        </motion.div>
        <Link href="/sign-in">
          <motion.button
            className="hover:shadow-lg bg-green-100 px-[24px] py-[12px] rounded-[32px] text-green-700 font-lexend font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [20, 0, 0], opacity: [0, 0.5, 1] }}
            transition={{
              type: "spring",
              duration: 1,
              delay: "0.4",
              times: [0, 0.5, 1],
            }}
          >
            Sign in | up
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
