/* eslint-disable @next/next/no-img-element */
import Logo from "@/details/logo";
import { AnimatePresence, motion } from "framer-motion";
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

  const router = useRouter();
  const [signOut] = useSignOut();

  const [open, setOpen] = useState(false);

  return (
    <div className="z-20 flex flex-row justify-between h-[46px]">
      <Link href="/">
        <div className="p-1.5 flex flex-col gap-5 flex-2">
          <div className="flex flex-row gap-12">
            <Logo />
            <h4 className="font-lexend font-bold text-[16px] place-self-center">
              Hounter
            </h4>
          </div>
        </div>
      </Link>

      <AnimatePresence custom={open}>
        {!open ? (
          <motion.button
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
            <Avatar src="/more.png" alt="more" />
          </motion.button>
        ) : (
          <motion.div
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
            className={`pt-32 z-50 pl-16 absolute w-[14vw] h-[14vw] rounded-full shadow-sm hover:shadow-xl active:shadow-md bg-white`}
          >
            <motion.div
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
                    router.pathname != "/account" && id == null
                      ? "/sign-in"
                      : router.pathname == "/account" && id != null
                        ? "/"
                        : `/account?id=${id}`,
                },
              ].map((elem, index) => (
                <>
                  <Link key={index} href={elem.link}>
                    <motion.button
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
                        router.pathname == "/account" && id != null
                          ? () => {
                              signOut();
                              setId(null);
                              setUrl("/incognito.png");
                              router.push("/");
                            }
                          : () => setOpen(false)
                      }
                    >
                      {elem.text != "Account"
                        ? elem.text
                        : router.pathname == "/account" && id != null
                          ? "Sign out"
                          : router.pathname != "/account" && id == null
                            ? "Sign in | up"
                            : "Account"}
                    </motion.button>
                  </Link>
                  <div className="border-b-2 border-b-black w-[80%]" />
                </>
              ))}
            </motion.div>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 absolute left-[90vw] top-[9vh]"
            >
              <img src="/close.png" alt="close" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex flex-1 justify-end gap-[56px]">
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
          {[
            { text: "Home", link: "/" },
            { text: "Comment", link: `/comment?id=${id}` },
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
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
