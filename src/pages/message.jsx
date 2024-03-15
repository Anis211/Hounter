/* eslint-disable @next/next/no-img-element */
import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import {
  Avatar,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { m, useAnimate, AnimatePresence, useInView } from "framer-motion";
import { firestore } from "../../firebase/clientApp";
import { getDoc, doc, setDoc } from "firebase/firestore";
import useUser from "@/details/user";

export default function Messanger({ user1, friends1, friendId, userId }) {
  useEffect(() => {
    useUser.persist.rehydrate;
  });

  const [open, setOpen] = useState(false);
  const theme = useUser((state) => state.theme);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [resendMessage, setResendMessage] = useState(false);
  const [resendFriendMessage, setResendFriendMessage] = useState(false);
  const [resendFriend, setResendFriend] = useState({});
  let resendFriends = [];

  const [changeMessage, setChangeMessage] = useState(false);
  const [changedMessage, setChangedMessage] = useState("");
  const [elem, setElem] = useState({});

  const [friends, setFriends] = useState(friends1);
  const [user, setUser] = useState(user1);

  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");

  const [focused, setFocused] = useState(false);
  const [focused1, setFocused1] = useState(false);

  const [scope, animate] = useAnimate();

  const [index, setIndex] = useState(friendId);
  const [chosen, setChosen] = useState(
    friendId != null ? Object.keys(user.chats).indexOf(friendId) : "-1"
  );

  const options = friends.map((friend) =>
    friend.details.name.split(" ").slice(1, 3).join(" ")
  );

  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [filteredOptions1, setFilteredOptions1] = useState(options);

  const [chosenChat, setChosenChat] = useState(
    friendId != null
      ? friends[Object.keys(user.chats).indexOf(friendId)]
      : friends[0]
  );

  const [content, setContent] = useState(
    user.chats[index].userMessages.length > 0 ||
      user.chats[index].friendMessages.length > 0
      ? [
          ...user.chats[index].userMessages,
          ...user.chats[index].friendMessages,
        ].sort((m1, m2) => (m1.time.ms > m2.time.ms ? 1 : -1))
      : []
  );

  const [context, setContext] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    content.map((elem, index) => {
      setContext((prev) => ({ ...prev, [index]: false }));
    });
  }, [content]);

  useEffect(() => {
    setContent(
      [
        ...user.chats[index].userMessages,
        ...user.chats[index].friendMessages,
      ].sort((m1, m2) => (m1.time.ms > m2.time.ms ? 1 : -1))
    );
  }, [chosen, user.chats, index]);

  useEffect(() => {
    const fetch = async () => {
      const promises = await Promise.all(
        Object.keys(user.chats).map(async (chat) => {
          const res = await getDoc(doc(firestore, "Users", chat));
          return res.data();
        })
      );

      setFriends(promises);
      setFilteredFriends(promises);
    };

    fetch();
  }, [user]);

  const appear = async () => {
    await animate(
      "ul",
      { opacity: [0, 0.5, 1] },
      { duration: 0.2, ease: "easeIn", times: [0, 0.5, 1] }
    );
  };

  const disapear = async () => {
    await animate(
      "ul",
      { opacity: [1, 0.5, 0] },
      { duration: 0.2, ease: "easeIn", times: [0, 0.5, 1] }
    );
  };

  const handleChangeChosen = async (friend, index) => {
    setChosen(index);
    setChosenChat(friend);
    setIndex(Object.keys(user.chats)[index]);

    setContent(
      [
        ...user.chats[friend.details.id].userMessages,
        ...user.chats[friend.details.id].friendMessages,
      ].sort((m1, m2) => (m1.time.ms > m2.time.ms ? 1 : -1))
    );

    setOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setFilteredOptions(options.filter((elem) => elem.includes(e.target.value)));
  };

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
    setFilteredOptions1(
      options.filter((elem) => elem.includes(e.target.value))
    );
  };

  const handleClick = async (e) => {
    setInputValue(e.target.id);
    setFilteredFriends(
      friends.filter((elem) => elem.details.name.includes(e.target.id))
    );

    await disapear();
    setFocused(false);
  };

  const handleClick1 = async (e) => {
    const arr = friends;

    setInputValue1(e.target.id);
    resendFriends = arr.filter((elem) =>
      elem.details.name.split(" ").slice(1, 3).join(" ").includes(e.target.id)
    )[0];

    setResendFriend(resendFriends);

    await disapear();
    setFocused1(false);
  };

  const handleFocus = async () => {
    const focus = async () => {
      setFocused(true);
    };

    await focus();
    await appear();
  };

  const handleFocus1 = async () => {
    const focus = async () => {
      setFocused1(true);
    };

    await focus();
    await appear();
  };

  const handleBlur = async () => {
    await disapear();
    setFocused(false);
  };

  const handleBlur1 = async () => {
    await disapear();
    setFocused1(false);
  };

  const handleSendMessage = async () => {
    const now = new Date();

    await setDoc(doc(firestore, "Users", chosenChat.details.id), {
      ...chosenChat,
      chats: {
        ...chosenChat.chats,
        [user.details.id]: {
          ...chosenChat.chats[user.details.id],
          friendMessages: [
            ...chosenChat.chats[user.details.id].friendMessages,
            {
              sender: "friend",
              text: message,
              changed: false,
              time: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                day: now.getDay(),
                hours: now.getHours(),
                minutes: now.getMinutes(),
                ms: now.getTime(),
              },
            },
          ],
          lastMessage: {
            text: message,
            time: {
              hours: now.getHours(),
              minutes: now.getMinutes(),
            },
          },
        },
      },
    });

    await setDoc(doc(firestore, "Users", user.details.id), {
      ...user,
      chats: {
        ...user.chats,
        [chosenChat.details.id]: {
          ...user.chats[chosenChat.details.id],
          userMessages: [
            ...user.chats[chosenChat.details.id].userMessages,
            {
              sender: "user",
              text: message,
              changed: false,
              time: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                day: now.getDay(),
                hours: now.getHours(),
                minutes: now.getMinutes(),
                ms: now.getTime(),
              },
            },
          ],
          lastMessage: {
            text: message,
            time: {
              hours: now.getHours(),
              minutes: now.getMinutes(),
            },
          },
        },
      },
    });

    const res = await getDoc(doc(firestore, "Users", userId));
    const user2 = res.data();

    const res1 = await getDoc(doc(firestore, "Users", chosenChat.details.id));
    const chosenChat1 = res1.data();

    setChosenChat(chosenChat1);
    setUser(user2);
    setMessage("");
  };

  const handleDeleteMessage = async (element) => {
    const friendChat = chosenChat.chats[userId];
    const userChat = user.chats[chosenChat.details.id];

    const deletedVersion = { ...element, text: "Deleted message" };

    await setDoc(doc(firestore, "Users", chosenChat.details.id), {
      ...chosenChat,
      chats: {
        ...chosenChat.chats,
        [userId]: {
          ...friendChat,
          friendMessages: [
            ...friendChat.friendMessages.slice(
              0,
              user.chats[chosenChat.details.id].userMessages.indexOf(element)
            ),
            deletedVersion,
            ...friendChat.friendMessages.slice(
              user.chats[chosenChat.details.id].userMessages.indexOf(element) +
                1,
              friendChat.friendMessages.length
            ),
          ],
          lastMessage: {
            text: deletedVersion.text,
            time: {
              hours: deletedVersion.time.hours,
              minutes: deletedVersion.time.hours,
            },
          },
        },
      },
    });

    await setDoc(doc(firestore, "Users", user.details.id), {
      ...user,
      chats: {
        ...user.chats,
        [chosenChat.details.id]: {
          ...userChat,
          userMessages: [
            ...userChat.userMessages.slice(
              0,
              user.chats[chosenChat.details.id].userMessages.indexOf(element)
            ),
            deletedVersion,
            ...userChat.userMessages.slice(
              user.chats[chosenChat.details.id].userMessages.indexOf(element) +
                1,
              userChat.userMessages.length
            ),
          ],
          lastMessage: {
            text: deletedVersion.text,
            time: {
              hours: deletedVersion.time.hours,
              minutes: deletedVersion.time.hours,
            },
          },
        },
      },
    });

    const res = await getDoc(doc(firestore, "Users", userId));
    const user2 = res.data();

    const res1 = await getDoc(doc(firestore, "Users", chosenChat.details.id));
    const chosenChat1 = res1.data();

    setChosenChat(chosenChat1);
    setUser(user2);
  };

  const handleChangeMessage = async () => {
    const friendChat = chosenChat.chats[userId];
    const userChat = user.chats[chosenChat.details.id];

    const changedUserContent = {
      ...elem,
      text: changedMessage,
      changed: true,
      sender: "user",
    };

    const changedFriendContent = {
      ...elem,
      text: changedMessage,
      changed: true,
      sender: "friend",
    };

    if (elem.sender == "user") {
      await setDoc(doc(firestore, "Users", chosenChat.details.id), {
        ...chosenChat,
        chats: {
          ...chosenChat.chats,
          [userId]: {
            ...friendChat,
            friendMessages: [
              ...friendChat.friendMessages.slice(
                0,
                user.chats[chosenChat.details.id].userMessages.indexOf(elem)
              ),
              changedFriendContent,
              ...friendChat.friendMessages.slice(
                user.chats[chosenChat.details.id].userMessages.indexOf(elem) +
                  1,
                friendChat.friendMessages.length
              ),
            ],
            lastMessage:
              content.indexOf(elem) + 1 == content.length
                ? {
                    text: changedFriendContent.text,
                    time: {
                      hours: changedFriendContent.time.hours,
                      minutes: changedFriendContent.time.minutes,
                    },
                  }
                : friendChat.lastMessage,
          },
        },
      });

      await setDoc(doc(firestore, "Users", user.details.id), {
        ...user,
        chats: {
          ...user.chats,
          [chosenChat.details.id]: {
            ...userChat,
            userMessages: [
              ...userChat.userMessages.slice(
                0,
                user.chats[chosenChat.details.id].userMessages.indexOf(elem)
              ),
              changedUserContent,
              ...userChat.userMessages.slice(
                user.chats[chosenChat.details.id].userMessages.indexOf(elem) +
                  1,
                userChat.userMessages.length
              ),
            ],
            lastMessage:
              content.indexOf(elem) + 1 == content.length
                ? {
                    text: changedUserContent.text,
                    time: {
                      hours: changedUserContent.time.hours,
                      minutes: changedUserContent.time.minutes,
                    },
                  }
                : userChat.lastMessage,
          },
        },
      });
    } else {
      await setDoc(doc(firestore, "Users", chosenChat.details.id), {
        ...chosenChat,
        chats: {
          ...chosenChat.chats,
          [userId]: {
            ...friendChat,
            userMessages: [
              ...friendChat.userMessages.slice(
                0,
                user.chats[chosenChat.details.id].friendMessages.indexOf(elem)
              ),
              changedUserContent,
              ...friendChat.userMessages.slice(
                user.chats[chosenChat.details.id].friendMessages.indexOf(elem) +
                  1,
                friendChat.userMessages.length
              ),
            ],
            lastMessage:
              content.indexOf(elem) + 1 == content.length
                ? {
                    text: changedUserContent.text,
                    time: {
                      hours: changedUserContent.time.hours,
                      minutes: changedUserContent.time.minutes,
                    },
                  }
                : friendChat.lastMessage,
          },
        },
      });

      await setDoc(doc(firestore, "Users", user.details.id), {
        ...user,
        chats: {
          ...user.chats,
          [chosenChat.details.id]: {
            ...userChat,
            friendMessages: [
              ...userChat.friendMessages.slice(
                0,
                user.chats[chosenChat.details.id].friendMessages.indexOf(elem)
              ),
              changedFriendContent,
              ...userChat.friendMessages.slice(
                user.chats[chosenChat.details.id].friendMessages.indexOf(elem) +
                  1,
                userChat.friendMessages.length
              ),
            ],
            lastMessage:
              content.indexOf(elem) + 1 == content.length
                ? {
                    text: changedFriendContent.text,
                    time: {
                      hours: changedFriendContent.time.hours,
                      minutes: changedFriendContent.time.minutes,
                    },
                  }
                : friendChat.lastMessage,
          },
        },
      });
    }
    const res = await getDoc(doc(firestore, "Users", userId));
    const user2 = res.data();

    const res1 = await getDoc(doc(firestore, "Users", chosenChat.details.id));
    const chosenChat1 = res1.data();

    setChosenChat(chosenChat1);
    setUser(user2);

    setChangeMessage(false);
    setChangedMessage("");
    setElem({});
  };

  const handleDeleteMessageFromYourself = async (element) => {
    const userChat = user.chats[chosenChat.details.id];

    if (element.sender == "user") {
      await setDoc(doc(firestore, "Users", user.details.id), {
        ...user,
        chats: {
          ...user.chats,
          [chosenChat.details.id]: {
            ...userChat,
            userMessages: [
              ...userChat.userMessages.slice(
                0,
                user.chats[chosenChat.details.id].userMessages.indexOf(element)
              ),
              ...userChat.userMessages.slice(
                user.chats[chosenChat.details.id].userMessages.indexOf(
                  element
                ) + 1,
                userChat.userMessages.length
              ),
            ],
            lastMessage:
              content.length > 1
                ? {
                    text: content[content.length - 2].text,
                    time: {
                      hours: content[content.length - 2].time.hours,
                      minutes: content[content.length - 2].time.hours,
                    },
                  }
                : {
                    text: content[0].text,
                    time: {
                      hours: content[0].time.hours,
                      minutes: content[0].time.hours,
                    },
                  },
          },
        },
      });
    } else {
      await setDoc(doc(firestore, "Users", user.details.id), {
        ...user,
        chats: {
          ...user.chats,
          [chosenChat.details.id]: {
            ...userChat,
            friendMessages: [
              ...userChat.friendMessages.slice(
                0,
                user.chats[chosenChat.details.id].friendMessages.indexOf(
                  element
                )
              ),
              ...userChat.friendMessages.slice(
                user.chats[chosenChat.details.id].friendMessages.indexOf(
                  element
                ) + 1,
                userChat.friendMessages.length
              ),
            ],
            lastMessage:
              content.length > 1
                ? {
                    text: content[content.length - 2].text,
                    time: {
                      hours: content[content.length - 2].time.hours,
                      minutes: content[content.length - 2].time.hours,
                    },
                  }
                : {
                    text: content[0].text,
                    time: {
                      hours: content[0].time.hours,
                      minutes: content[0].time.hours,
                    },
                  },
          },
        },
      });
    }
    const res = await getDoc(doc(firestore, "Users", userId));
    const user2 = res.data();

    setUser(user2);
  };

  const handleResendMessage = async () => {
    const now = new Date();

    await setDoc(doc(firestore, "Users", resendFriend.details.id), {
      ...resendFriend,
      chats: {
        ...resendFriend.chats,
        [user.details.id]: {
          ...resendFriend.chats[user.details.id],
          friendMessages: [
            ...resendFriend.chats[user.details.id].friendMessages,
            {
              sender: "friend",
              text: elem.text,
              changed: false,
              resent: true,
              resentFrom: chosenChat.details.name.split(" ").slice(1, 2),
              time: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                day: now.getDay(),
                hours: now.getHours(),
                minutes: now.getMinutes(),
                ms: now.getTime(),
              },
            },
          ],
          lastMessage: {
            text: elem.text,
            time: {
              hours: now.getHours(),
              minutes: now.getMinutes(),
            },
          },
        },
      },
    });

    await setDoc(doc(firestore, "Users", user.details.id), {
      ...user,
      chats: {
        ...user.chats,
        [resendFriend.details.id]: {
          ...user.chats[resendFriend.details.id],
          userMessages: [
            ...user.chats[resendFriend.details.id].userMessages,
            {
              sender: "user",
              text: elem.text,
              changed: false,
              resent: true,
              resentFrom: chosenChat.details.name.split(" ").slice(1, 2),
              time: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                day: now.getDay(),
                hours: now.getHours(),
                minutes: now.getMinutes(),
                ms: now.getTime(),
              },
            },
          ],
          lastMessage: {
            text: elem.text,
            time: {
              hours: now.getHours(),
              minutes: now.getMinutes(),
            },
          },
        },
      },
    });

    const res = await getDoc(doc(firestore, "Users", userId));
    const user2 = res.data();

    const res1 = await getDoc(doc(firestore, "Users", resendFriend.details.id));
    const resendFriend1 = res1.data();

    setUser(user2);
    setChosenChat(resendFriend1);
    setIndex(resendFriend.details.id);

    setResendMessage(false);
    setResendFriendMessage(false);
  };

  const overflow = (text, arr = []) => {
    if (text.length > 57) {
      arr.push(text.split("").slice(0, 57).join(""));
      return overflow(text.split("").slice(57, text.length).join(""), arr);
    }

    arr.push(text);
    return arr;
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
      <div
        ref={ref}
        className={`mt-16 h-[90vh] w-full flex flex-row rounded-sm ${
          theme != "dark" ? "bg-white ring-black ring-1" : "bg-[#1B3C73]"
        } `}
      >
        <div
          className={`lg:w-1/4 h-full ${
            open ? "w-full visible" : "hidden"
          } lg:flex flex-col gap-5 px-3 ${theme != "dark" ? "border-r-2" : ""}`}
        >
          <div className="h-[18%] flex flex-col gap-6">
            <div className="flex flex-row gap-5 items-center justify-between lg:justify-start pt-4 w-full lg:w-auto">
              <Avatar
                src={user.avatar}
                alt="icon"
                className="ring-1 bg-[#D1FAE5] w-10 h-10"
              />
              <h2
                className={`font-lexend font-semibold text-[20px] ${
                  theme == "dark" ? "text-white" : "text-black"
                }`}
              >
                Chats
              </h2>
              <button
                className="w-8 h-8 self-right lg:hidden"
                onClick={() => setOpen(false)}
              >
                <img
                  src={theme != "dark" ? "/chat-black.png" : "/chat-white.png"}
                  loading="lazy"
                  alt="chat"
                />
              </button>
            </div>
            <m.div
              ref={scope}
              className={`flex flex-col mt-3 ${focused ? "z-20" : ""}`}
            >
              <m.input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search"
                className="ring-1 ring-gray-400 rounded-sm h-9 pl-8"
              />
              <img
                alt="search"
                src="/search1.webp"
                loading="lazy"
                className="absolute z-20 w-6 h-6 mt-1 ml-1"
              />
              <m.ul
                initial={{ opacity: 0 }}
                id="object"
                className="ring-1 ring-green-500 bg-white max-h-80 overflow-y-auto scroll-ul rounded-br-md rounded-bl-md"
              >
                {filteredOptions.map((value, index) => (
                  <li
                    key={index}
                    id={value}
                    onClick={handleClick}
                    className="px-4 py-3 border-t-2 hover:bg-green-300"
                  >
                    {value}
                  </li>
                ))}
              </m.ul>
            </m.div>
          </div>
          <div
            className={`h-[82%] flex flex-col gap-2 ${
              !focused ? "z-50" : "z-0"
            } overflow-y-auto no-scroll`}
          >
            {filteredFriends.map((friend, index) => {
              return (
                <div
                  key={index}
                  className={`w-full h-auto flex flex-row justify-between rounded-lg px-2 py-3 ${
                    chosen != index ? "hover:bg-green-300 hover:text-white" : ""
                  } ${chosen == index ? "bg-green-500 text-white" : ""}`}
                  onClick={() => handleChangeChosen(friend, index)}
                >
                  <div className="flex flex-row gap-1">
                    <Avatar
                      alt="avatar"
                      src={friend.avatar}
                      className="w-12 h-12"
                      onClick={() => handleChangeChosen(friend, index)}
                    />
                    <div
                      className="flex flex-col pl-2 font-lexend z-20"
                      onClick={() => handleChangeChosen(friend, index)}
                    >
                      <h2
                        className="font-medium text-[16px]"
                        onClick={() => handleChangeChosen(friend, index)}
                      >
                        {friend.details.name.split(" ").slice(1, 2).join(" ")}
                      </h2>
                      <p
                        className="font-regular text-[14px]"
                        onClick={() => handleChangeChosen(friend, index)}
                      >
                        {friend.chats[userId].lastMessage.text != undefined
                          ? friend.chats[userId].lastMessage.text
                          : ""}
                      </p>
                    </div>
                  </div>
                  <h6
                    className="font-lexend font-thin text-[12px] pl-8 z-20"
                    onClick={() => handleChangeChosen(friend, index)}
                  >
                    {friend.chats[userId].lastMessage.time != undefined
                      ? `${friend.chats[userId]?.lastMessage.time.hours}:${
                          friend.chats[userId]?.lastMessage.time.minutes < 10
                            ? "0" +
                              friend.chats[userId]?.lastMessage.time.minutes
                            : friend.chats[userId]?.lastMessage.time.minutes
                        }`
                      : ""}
                  </h6>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`lg:w-3/4 lg:flex ${
            open ? "hidden" : "visible w-full"
          } flex-col justify-between`}
          onClick={() => {
            content.map((elem, index) =>
              context[index] == true
                ? setContext((prev) => ({ ...prev, [index]: false }))
                : ""
            );
          }}
          onScrollCapture={() => {
            content.map((elem, index) =>
              context[index] == true
                ? setContext((prev) => ({ ...prev, [index]: false }))
                : ""
            );
          }}
        >
          <div
            className={`h-[10%] flex flex-row w-full justify-between ${
              theme != "dark" ? "border-b-2" : ""
            }`}
          >
            <div className="w-auto flex flex-row items-center ml-4">
              <Avatar
                alt="avatar"
                src={chosenChat.avatar}
                className="w-12 h-12"
              />
              <div className="flex flex-col pl-2 font-lexend z-10">
                <h2
                  className={`font-medium text-[16px] ${
                    theme == "dark" ? "text-white" : ""
                  }`}
                >
                  {chosenChat.details.name.split(" ").slice(1, 3).join(" ")}
                </h2>
                <p
                  className={`font-regular text-[12px] ${
                    theme == "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Online now
                </p>
              </div>
            </div>
            <div className="w-20 flex items-center justify-end">
              <button
                className="w-8 h-8 mr-4 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <img
                  src={
                    theme != "dark" ? "/users-black.png" : "/users-white.png"
                  }
                  loading="lazy"
                  alt="users"
                />
              </button>
            </div>
          </div>
          <div
            className={` ${
              theme == "dark" ? "bg-[#40679E]" : "bg-[#F6F7F9] border-b-2"
            } w-full h-[80%] flex flex-col gap-4 pt-4 pb-20 overflow-y-scroll no-scroll`}
          >
            {content.map((obj, index) =>
              obj.sender == "friend" ? (
                <AnimatePresence key={index}>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : ""}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="w-full flex gap-2 items-end justify-start"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      content.map((elem, index) =>
                        context[index] == true
                          ? setContext((prev) => ({ ...prev, [index]: false }))
                          : ""
                      );
                      setContext((prev) => ({ ...prev, [index]: true }));
                    }}
                  >
                    <m.div layout className="w-12 h-12 self-end">
                      <Avatar alt="avatar" src={chosenChat.avatar} />
                    </m.div>
                    {context[index] == true ? (
                      <m.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{
                          duration: 0.3,
                          ease: "backInOut",
                        }}
                        className={`flex flex-col z-50 ${
                          context[index] == true ? "visible" : "hidden"
                        }`}
                      >
                        {[
                          {
                            text: "delete message from yourself",
                            func: handleDeleteMessageFromYourself,
                          },
                          {
                            text: "resend the message",
                            func: (obj) => {
                              setResendFriendMessage(true);
                              setElem(obj);
                            },
                          },
                        ].map((elem, index) => (
                          <h2
                            key={index}
                            className={`px-3 py-3 font-lexend font-medium bg-white text-black ${
                              index != 3 ? "border-b-2" : ""
                            } ${
                              index == 0
                                ? "rounded-tl-md rounded-tr-md"
                                : index == 2
                                  ? "rounded-bl-md rounded-br-md"
                                  : ""
                            }`}
                            onClick={() => elem.func(obj)}
                          >
                            {elem.text}
                          </h2>
                        ))}
                      </m.div>
                    ) : (
                      ""
                    )}
                    <m.div
                      layout
                      className="flex flex-col h-auto max-w-[50%] bg-white shadow-md rounded-lg rounded-bl-none font-lexend px-3 pt-2 pb-3"
                    >
                      {obj.text.length > 57 ? (
                        overflow(obj.text).map((text, index) => (
                          <p
                            key={index}
                            className="font-regular text-[13px] flex flex-row gap-2"
                          >
                            {obj.text == "Deleted message" ? (
                              <img
                                src="/black_deleted.webp"
                                alt="deleted"
                                loading="lazy"
                                className="w-6 h-6 z-40"
                              />
                            ) : (
                              ""
                            )}
                            {text}
                          </p>
                        ))
                      ) : (
                        <p className="font-regular text-[13px] flex flex-row gap-2">
                          {obj.text == "Deleted message" ? (
                            <img
                              src="/black_deleted.webp"
                              alt="deleted"
                              loading="lazy"
                              className="w-6 h-6 z-40"
                            />
                          ) : (
                            ""
                          )}
                          {obj.text}
                        </p>
                      )}
                      <p className="font-lexend font-thin text-[12px] mt-1 pl-8 z-20 text-gray-500 self-end justify-self-end ">
                        {obj.changed ? "(changed)  " : ""}
                        {obj.resent ? `(resend from ${obj.resentFrom})  ` : ""}
                        {`${
                          obj.time.date < 10
                            ? "0" + obj.time.date
                            : obj.time.date
                        }.${
                          obj.time.month < 10
                            ? "0" + obj.time.month
                            : obj.time.month
                        }.${obj.time.year} (${obj.time.hours}:${
                          obj.time.minutes < 10
                            ? "0" + obj.time.minutes
                            : obj.time.minutes
                        })`}
                      </p>
                    </m.div>
                    <Dialog open={resendFriendMessage}>
                      <DialogHeader>Resend The Message</DialogHeader>
                      <DialogBody>
                        <div className="w-full flex gap-2 items-end justify-center ">
                          <div className="self-end flex flex-col h-auto max-w-[50%] bg-white text-black shadow-md rounded-lg rounded-br-none font-lexend px-3 pt-2 pb-3">
                            {elem.text != undefined && elem.text.length > 57 ? (
                              overflow(elem.text).map((text, index) => (
                                <p
                                  key={index}
                                  className="font-regular text-[13px] flex flex-row gap-2"
                                >
                                  {text}
                                </p>
                              ))
                            ) : (
                              <p className="font-regular text-[13px] flex flex-row gap-2">
                                {elem != undefined ? elem.text : ""}
                              </p>
                            )}
                            {elem.time != undefined ? (
                              <p className="font-lexend font-thin text-[12px] mt-1 pl-8 z-20 text-black self-end justify-self-end ">
                                {`${
                                  elem.time.date < 10
                                    ? "0" + elem.time.date
                                    : elem.time.date
                                }.${
                                  elem.time.month < 10
                                    ? "0" + elem.time.month
                                    : elem.time.month
                                }.${elem.time.year} (${elem.time.hours}:${
                                  elem.time.minutes < 10
                                    ? "0" + elem.time.minutes
                                    : elem.time.minutes
                                })`}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <m.div
                          ref={scope}
                          className={`flex flex-col mt-3 ${
                            focused1 ? "z-20" : ""
                          }`}
                        >
                          <m.input
                            type="text"
                            value={inputValue1}
                            onChange={handleInputChange1}
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            placeholder="Search"
                            className="ring-1 ring-gray-400 rounded-sm h-9 pl-8"
                          />
                          <img
                            alt="search"
                            src="/search1.webp"
                            loading="lazy"
                            className="absolute z-20 w-6 h-6 mt-1 ml-1"
                          />
                          <m.ul
                            initial={{ opacity: 0 }}
                            id="object"
                            className="ring-1 ring-green-500 bg-white max-h-80 overflow-y-auto scroll-ul rounded-br-md rounded-bl-md"
                          >
                            {filteredOptions1.map((value, index) => (
                              <li
                                key={index}
                                id={value}
                                onClick={handleClick1}
                                className="px-4 py-3 border-t-2 hover:bg-green-300"
                              >
                                {value}
                              </li>
                            ))}
                          </m.ul>
                        </m.div>
                      </DialogBody>
                      <DialogFooter className="flex flex-row gap-5">
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={() => setResendFriendMessage(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={handleResendMessage}
                        >
                          Resend
                        </button>
                      </DialogFooter>
                    </Dialog>
                  </m.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence key={index}>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : ""}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="w-full flex gap-2 items-end justify-end"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      content.map((elem, index) =>
                        context[index] == true
                          ? setContext((prev) => ({ ...prev, [index]: false }))
                          : ""
                      );
                      setContext((prev) => ({ ...prev, [index]: true }));
                    }}
                  >
                    <m.div
                      layout
                      className="self-end flex flex-col h-auto max-w-[50%] bg-green-500 text-white shadow-md rounded-lg rounded-br-none font-lexend px-3 pt-2 pb-3"
                    >
                      {obj.text.length > 57 ? (
                        overflow(obj.text).map((text, index) => (
                          <p
                            key={index}
                            className="font-regular text-[13px] flex flex-row gap-2"
                          >
                            {obj.text == "Deleted message" ? (
                              <img
                                src="/deleted.webp"
                                alt="deleted"
                                loading="lazy"
                                className="w-6 h-6 z-40"
                              />
                            ) : (
                              ""
                            )}
                            {text}
                          </p>
                        ))
                      ) : (
                        <p className="font-regular text-[13px] flex flex-row gap-2">
                          {obj.text == "Deleted message" ? (
                            <img
                              src="/deleted.webp"
                              alt="deleted"
                              loading="lazy"
                              className="w-6 h-6 z-40"
                            />
                          ) : (
                            ""
                          )}
                          {obj.text}
                        </p>
                      )}
                      <p className="font-lexend font-thin text-[12px] mt-1 pl-8 z-20 text-white self-end justify-self-end ">
                        {obj.changed ? "(changed)  " : ""}
                        {obj.resent ? `(resend from ${obj.resentFrom})  ` : ""}
                        {`${
                          obj.time.date < 10
                            ? "0" + obj.time.date
                            : obj.time.date
                        }.${
                          obj.time.month < 10 && obj.time.month != "0"
                            ? "0" + obj.time.month
                            : obj.time.month
                        }.${obj.time.year} (${obj.time.hours}:${
                          obj.time.minutes < 10
                            ? "0" + obj.time.minutes
                            : obj.time.minutes
                        })`}
                      </p>
                    </m.div>
                    {context[index] == true ? (
                      <m.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{
                          duration: 0.3,
                          ease: "backInOut",
                        }}
                        className={`flex flex-col z-50 ${
                          context[index] == true ? "visible" : "hidden"
                        }`}
                      >
                        {[
                          {
                            text: "delete message from yourself",
                            func: handleDeleteMessageFromYourself,
                          },
                          obj.text != "Deleted message"
                            ? {
                                text: "delete message from both",
                                func: handleDeleteMessage,
                              }
                            : {},
                          obj.text != "Deleted message"
                            ? {
                                text: "change message",
                                func: () => {
                                  setChangeMessage(true);
                                  setChangedMessage(obj.text);
                                  setElem(obj);
                                },
                              }
                            : {},
                          obj.text != "Deleted message"
                            ? {
                                text: "resend the message",
                                func: () => {
                                  setResendMessage(true);
                                  setElem(obj);
                                },
                              }
                            : {},
                        ].map((elem, index) =>
                          elem.text != undefined ? (
                            <h2
                              key={index}
                              className={`px-3 py-3 font-lexend fonr-medium bg-green-500 text-white ${
                                index != 3 ? "border-b-2" : ""
                              } ${
                                index == 0
                                  ? "rounded-tl-md rounded-tr-md"
                                  : index == 2
                                    ? "rounded-bl-md rounded-br-md"
                                    : ""
                              }`}
                              onClick={() => elem.func(obj)}
                            >
                              {elem.text}
                            </h2>
                          ) : (
                            ""
                          )
                        )}
                      </m.div>
                    ) : (
                      ""
                    )}
                    <m.div layout className="w-12 h-12 self-end">
                      <Avatar alt="avatar" src={user.avatar} />
                    </m.div>
                    <Dialog open={changeMessage}>
                      <DialogHeader>Change The Message</DialogHeader>
                      <DialogBody>
                        <div className="w-full flex gap-2 items-end justify-center ">
                          <div className="self-end flex flex-col h-auto max-w-[50%] bg-green-500 text-white shadow-md rounded-lg rounded-br-none font-lexend px-3 pt-2 pb-3">
                            <input
                              type="text"
                              value={changedMessage}
                              onChange={(e) =>
                                setChangedMessage(e.target.value)
                              }
                              className="font-regular text-[13px] text-white bg-green-500 w-full py-3 pl-2"
                            />
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter className="flex flex-row gap-5">
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={() => setChangeMessage(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={handleChangeMessage}
                        >
                          Change
                        </button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog open={resendMessage}>
                      <DialogHeader>Resend The Message</DialogHeader>
                      <DialogBody>
                        <div className="w-full flex gap-2 items-end justify-center ">
                          <div className="self-end flex flex-col h-auto max-w-[50%] bg-green-500 text-white shadow-md rounded-lg rounded-br-none font-lexend px-3 pt-2 pb-3">
                            {elem.text != undefined && elem.text.length > 57 ? (
                              overflow(elem.text).map((text, index) => (
                                <p
                                  key={index}
                                  className="font-regular text-[13px] flex flex-row gap-2"
                                >
                                  {text}
                                </p>
                              ))
                            ) : (
                              <p className="font-regular text-[13px] flex flex-row gap-2">
                                {elem != undefined ? elem.text : ""}
                              </p>
                            )}
                            {elem.time != undefined ? (
                              <p className="font-lexend font-thin text-[12px] mt-1 pl-8 z-20 text-white self-end justify-self-end ">
                                {`${
                                  elem.time.date < 10
                                    ? "0" + elem.time.date
                                    : elem.time.date
                                }.${
                                  elem.time.month < 10
                                    ? "0" + elem.time.month
                                    : elem.time.month
                                }.${elem.time.year} (${elem.time.hours}:${
                                  elem.time.minutes < 10
                                    ? "0" + elem.time.minutes
                                    : elem.time.minutes
                                })`}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <m.div
                          ref={scope}
                          className={`flex flex-col mt-3 ${
                            focused1 ? "z-20" : ""
                          }`}
                        >
                          <m.input
                            type="text"
                            value={inputValue1}
                            onChange={handleInputChange1}
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            placeholder="Search"
                            className="ring-1 ring-gray-400 rounded-sm h-9 pl-8"
                          />
                          <img
                            alt="search"
                            src="/search1.webp"
                            loading="lazy"
                            className="absolute z-20 w-6 h-6 mt-1 ml-1"
                          />
                          <m.ul
                            initial={{ opacity: 0 }}
                            id="object"
                            className="ring-1 ring-green-500 bg-white max-h-80 overflow-y-auto scroll-ul rounded-br-md rounded-bl-md"
                          >
                            {filteredOptions1.map((value, index) => (
                              <li
                                key={index}
                                id={value}
                                onClick={handleClick1}
                                className="px-4 py-3 border-t-2 hover:bg-green-300"
                              >
                                {value}
                              </li>
                            ))}
                          </m.ul>
                        </m.div>
                      </DialogBody>
                      <DialogFooter className="flex flex-row gap-5">
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={() => setResendMessage(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={handleResendMessage}
                        >
                          Resend
                        </button>
                      </DialogFooter>
                    </Dialog>
                  </m.div>
                </AnimatePresence>
              )
            )}
          </div>
          <div className="h-[10%] flex justify-center py-3 ">
            <input
              type="text"
              placeholder="Type Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSendMessage();
                }
              }}
              className="lg:w-[60%] w-[80%] bg-[#F6F7F9] ring-1 ring-gray-300 rounded-lg lg:pl-11 pl-4"
            />
            <button
              disabled={message.length == 0 ? true : false}
              className="p-2 disabled:bg-[#F6F7F9] bg-green-400 ml-3 ring-1 ring-gray-300 rounded-lg"
              onClick={handleSendMessage}
            >
              <img
                alt="send"
                src="/send.webp"
                loading="lazy"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id != undefined ? context.query.id : null;
  const userId = context.query.userId;

  const res = await getDoc(doc(firestore, "Users", userId));
  const user = res.data();

  const checker = (chats) => {
    let res = false;

    chats.map((chat) => {
      if (chat == userId) {
        res = true;
      } else {
        res = false;
      }
    });

    return res;
  };

  const addChat = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const friend = res.data();

    if (!checker(Object.keys(friend.chats))) {
      await setDoc(doc(firestore, "Users", userId), {
        ...user,
        chats: {
          ...user.chats,
          [id]: {
            userMessages: [],
            friendMessages: [],
            name: friend.details.name,
            lastMessage: "",
          },
        },
      });

      await setDoc(doc(firestore, "Users", id), {
        ...friend,
        chats: {
          ...friend.chats,
          [userId]: {
            userMessages: [],
            friendMessages: [],
            name: user.details.name,
            lastMessage: "",
          },
        },
      });
    }
  };

  const promises = await Promise.all(
    Object.keys(user.chats).map(async (chat) => {
      const res = await getDoc(doc(firestore, "Users", chat));
      return res.data();
    })
  );

  id != null ? addChat() : "";

  return {
    props: {
      user1: user,
      friends1: promises,
      userId: userId,
      friendId: id != undefined ? id : null,
    },
  };
}
