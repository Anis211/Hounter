/* eslint-disable @next/next/no-img-element */
import Logo from "@/details/logo";
import { motion } from "framer-motion";
import Link from "next/link";
import useUser from "@/details/user";
import { useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";

export default function Navbar() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const id = useUser((state) => state.user);
  const setId = useUser((state) => state.setUser);
  const url = useUser((state) => state.url);
  const setUrl = useUser((state) => state.setUrl);

  const router = useRouter();
  const [signOut] = useSignOut();

  return (
    <div className="z-20 flex flex-row h-[46px]">
      <Link href="/">
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
      </Link>

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
          {console.log(router.pathname)}
          {[
            { text: "Home", link: "/" },
            { text: "Article", link: "" },
            { text: "Property", link: "#list" },
          ].map((obj, index) => (
            <Link key={index} href={obj.link}>
              <motion.button
                layout
                className={`bg-white bg-opacity-10 ring-1 ${
                  router.pathname == "/" ? "ring-white" : "ring-gray-500"
                } ring-opacity-30 px-[16px] py-[8px] rounded-[32px] hover:shadow-lg`}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: [20, 0, 0], opacity: [0, 0.5, 1] },
                }}
              >
                <p className="font-lexend font-semibold text-neutral-100">
                  {obj.text}
                </p>
              </motion.button>
            </Link>
          ))}
        </motion.div>
        <Link
          href={
            router.pathname != "/account" && id == null
              ? "/sign-in"
              : router.pathname == "/account" && id != null
                ? "/"
                : `/account?id=${id}`
          }
        >
          <motion.button
            className={`hover:shadow-lg bg-green-100 ${
              id == null ? "px-[24px] py-[12px]" : "px-[14px] py-[8px]"
            } rounded-[32px] text-green-700 font-lexend font-semibold`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [20, 0, 0], opacity: [0, 0.5, 1] }}
            transition={{
              type: "spring",
              duration: 1,
              delay: "0.4",
              times: [0, 0.5, 1],
            }}
            onClick={
              router.pathname == "/account" && id != null
                ? () => {
                    signOut();
                    setId(null);
                    setUrl("/incognito.png");
                    router.push("/");
                  }
                : ""
            }
          >
            {router.pathname == "/account" && id != null
              ? "Sign out"
              : router.pathname != "/account" && id == null
                ? "Sign in | up"
                : "Account"}
            {router.pathname != "/account" && id != null ? (
              <Avatar
                src={url}
                size="sm"
                className="ring-2 ring-green-700 ml-2 "
              />
            ) : (
              ""
            )}
            {console.log(id)}
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
