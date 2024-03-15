/* eslint-disable @next/next/no-img-element */
import Logo from "@/details/logo";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import useUser from "@/details/user";
import { useEffect, useState } from "react";
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
  const theme = useUser((state) => state.theme);
  const setTheme = useUser((state) => state.setTheme);

  const router = useRouter();
  const [signOut] = useSignOut();

  const [open, setOpen] = useState(false);

  return (
    <div className="z-20 flex flex-row justify-between h-[46px] px-3">
      <Link href="/">
        <div className="p-1.5 flex flex-col gap-5 flex-2">
          <div className="flex flex-row gap-12">
            <Logo />
            <h4
              className={`font-lexend font-bold text-[16px] place-self-center ${
                theme != "dark" ? "text-black" : "text-white"
              }`}
            >
              Hounter
            </h4>
          </div>
        </div>
      </Link>

      <div
        className={`w-12 h-6 rounded-full shadow-xl self-center ml-5 flex ${
          theme == "dark"
            ? "justify-end bg-gray-500 ring-1 ring-offset-2 ring-offset-gray-400"
            : "justify-start bg-white"
        }`}
      >
        <div
          className="w-6 h-6 bg-black rounded-full"
          onClick={() =>
            theme == "light" ? setTheme("dark") : setTheme("light")
          }
        />
      </div>

      <AnimatePresence custom={open}>
        {!open ? (
          <m.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              type: "spring",
            }}
            onClick={() => setOpen(true)}
            className="md:hidden w-14 h-14 rounded-full shadow-sm hover:shadow-xl active:shadow-md bg-white"
          >
            <Avatar src="/more.webp" alt="more" />
          </m.button>
        ) : (
          <m.div
            initial={{
              width: "14vw",
              height: "14vh",
              borderRadius: "9999px",
              x: "80vw",
              y: "6vh",
            }}
            animate={{
              width: ["14vw", "14vw", "100vw"],
              height: ["6vh", "6vh", "120vh"],
              borderRadius: ["9999px", "90px", "0px"],
              x: ["75vw", "75vw", "-5vw"],
              y: ["1vh", "1vh", "-10vh"],
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.1, 1],
              ease: "easeOut",
            }}
            className={`ml-3 pt-44 z-40 pl-16 absolute h-[14vw] rounded-full shadow-sm hover:shadow-xl active:shadow-md bg-white`}
          >
            <m.div
              className="flex flex-col gap-8"
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                type: "spring",
                staggerChildren: 0.2,
                delayChildren: 0.3,
              }}
            >
              <div className="border-t-2 border-t-black w-[80%]" />
              {[
                { text: "Home", link: "/" },
                { text: "Comment", link: `/comment?id=${id}` },
                { text: "Property", link: "#list" },
                {
                  text: "Account",
                  link:
                    router.pathname != "/account" && id == ""
                      ? "/sign-in"
                      : router.pathname == "/account" && id != ""
                        ? "/"
                        : `/account?id=${id}`,
                },
              ].map((elem, index) => (
                <>
                  <Link key={index} href={elem.link}>
                    <m.button
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: 60,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      className="font-lexend font-bold text-xl text-black text-center z-20 w-[80%]"
                      onClick={
                        router.pathname == "/account" && id != ""
                          ? () => {
                              signOut();
                              setId("");
                              setUrl("/incognito.webp");
                              router.push("/");
                            }
                          : () => setOpen(false)
                      }
                    >
                      {elem.text != "Account"
                        ? elem.text
                        : router.pathname == "/account" && id != ""
                          ? "Sign out"
                          : router.pathname != "/account" && id == ""
                            ? "Sign in | up"
                            : "Account"}
                    </m.button>
                  </Link>
                  <div className="border-b-2 border-b-black w-[80%]" />
                </>
              ))}
            </m.div>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 absolute left-[90vw] top-[9vh]"
            >
              <img src="/close.webp" alt="close" />
            </button>
          </m.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex flex-1 justify-end gap-[56px]">
        <m.div
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
          {[
            { text: "Home", link: "/" },
            { text: "Comment", link: `/comment?id=${id}` },
            { text: "Property", link: "#list" },
          ].map((obj, index) => (
            <Link key={index} href={obj.link}>
              <m.button
                layout
                className={`bg-white bg-opacity-10 ring-1 ${
                  router.pathname == "/" ? "ring-white" : "ring-gray-500"
                } ring-opacity-30 px-[16px] py-[8px] rounded-[32px] hover:shadow-lg ${
                  router.pathname != "/" && theme == "dark" ? "text-white" : ""
                }`}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: [20, 0, 0], opacity: [0, 0.5, 1] },
                }}
              >
                <p className="font-lexend font-semibold text-neutral-100">
                  {obj.text}
                </p>
              </m.button>
            </Link>
          ))}
        </m.div>
        <Link
          href={
            router.pathname != "/account" && id == ""
              ? "/sign-in"
              : router.pathname == "/account" && id != ""
                ? "/"
                : `/account?id=${id}`
          }
        >
          <m.button
            className={`hover:shadow-lg bg-green-100 ${
              id == "" ? "px-[24px] py-[12px]" : "px-[14px] py-[8px]"
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
              router.pathname == "/account" && id != ""
                ? () => {
                    signOut();
                    setId("");
                    setUrl("/incognito.webp");
                    router.push("/");
                  }
                : ""
            }
          >
            {router.pathname == "/account" && id != ""
              ? "Sign out"
              : router.pathname != "/account" && id == ""
                ? "Sign in | up"
                : "Account"}
            {router.pathname != "/account" && id != "" ? (
              <Avatar
                src={url}
                size="sm"
                className="ring-2 ring-green-700 ml-2 "
              />
            ) : (
              ""
            )}
          </m.button>
        </Link>
      </div>
    </div>
  );
}
