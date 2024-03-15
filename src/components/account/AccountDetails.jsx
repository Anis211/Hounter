/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ButtonGroup,
  Button,
} from "@material-tailwind/react";
import { storage, firestore } from "../../../firebase/clientApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";
import useUser from "@/details/user";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";

export default function Details({ id, det }) {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const [chosen, setChosen] = useState("details");
  const [details, setDetails] = useState(det);

  const imageUrl = useUser((state) => state.url);
  const setImageUrl = useUser((state) => state.setUrl);
  const url = imageUrl;

  const [deals, setDeals] = useState(null);

  const [dialog, setDialog] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [image, setImage] = useState("");
  const [iUrl, setIUrl] = useState("");
  const paths = [
    "/defaultAvatars/base_man_body.png",
    "/defaultAvatars/base_man.png",
    "/defaultAvatars/base_woman.png",
    "/defaultAvatars/black_man.png",
    "/defaultAvatars/colored_man.png",
    "/defaultAvatars/colored_office_man.png",
  ];

  const [country, setCountry] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const [state, setState] = useState("");
  const [stateOpen, setStateOpen] = useState(false);

  const [city, setCity] = useState("");
  const [cityOpen, setCityOpen] = useState(false);

  const [name, setName] = useState("");
  const [nameOpen, setNameOpen] = useState(false);

  const [number, setNumber] = useState("");
  const [numberOpen, setNumberOpen] = useState(false);

  const [addDeal, setAddDeal] = useState(false);
  const [newDealImagesList, setNewDealImagesList] = useState([]);
  const [newDealName, setNewDealName] = useState("");
  const [newDealPrice, setNewDealPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [carports, setCarports] = useState("");
  const [floors, setFloors] = useState("");
  const [type, setType] = useState("");

  const handleSort = async (e) => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const details = res.data();
    setDeals([]);

    if (e.target.value != "all") {
      Object.values(details).forEach((deal) =>
        deal.type == e.target.value ? setDeals((prev) => [...prev, deal]) : ""
      );
    } else {
      setDeals(Object.values(details));
    }
  };

  const handleReveal = async () => {
    try {
      const res = await getDoc(doc(firestore, "Users", id));
      setDetails(res.data().details);
      setImageUrl(res.data().avatar);
    } catch (e) {
      console.log(e.message);
    }

    setChosen("details");
  };

  const handleClose = () => {
    setChosen("");
  };

  const handleReveal1 = async () => {
    try {
      const res = await getDoc(doc(firestore, "deals", id));
      res.data() != undefined
        ? setDeals(Object.values(res.data()))
        : setDeals(null);
    } catch (e) {
      console.log(e.message);
    }

    setChosen("deals");
  };

  const handleOpen = () => {
    setDialog(true);
  };

  const handleChoice = async (e) => {
    const src = e.target.src.split("/");
    const image = src[src.length - 1];

    const avatars = await getDoc(doc(firestore, "avatars", "paths"));
    const paths = avatars.data();

    const details = await getDoc(doc(firestore, "Users", id));
    const data = details.data();

    await setDoc(doc(collection(firestore, "Users"), id), {
      ...data,
      avatar: paths[image.split(".")[0]],
    });

    await setImageUrl(paths[image.split(".")[0]]);
    setDialog(false);
  };

  const handleAddImage = async () => {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, `images/users/${id}/avatar/${image.name}`);

    await uploadBytes(fileRef, image);
    await getDownloadURL(fileRef).then((url) => setIUrl(url));

    const details = await getDoc(doc(firestore, "Users", id));
    const data = details.data();

    const docRef = doc(collection(firestore, "Users"), id);

    await setDoc(docRef, {
      ...data,
      avatar: iUrl,
    }).then(() =>
      setDoc(docRef, {
        ...data,
        avatar: iUrl,
      })
    );

    await setImageUrl(iUrl);
    setDialog(false);
  };

  const handleCountryChange = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const data = res.data();
    const details = data.details;

    await setDoc(doc(collection(firestore, "Users"), id), {
      ...data,
      details: {
        ...details,
        country: country,
      },
    }).then(() =>
      setDoc(docRef, {
        ...data,
        details: {
          ...details,
          country: country,
        },
      })
    );

    const res1 = await getDoc(doc(firestore, "Users", id));
    const details1 = res1.data().details;

    setDetails(details1);
    setCountryOpen(false);
  };

  const handleStateChange = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const details = res.data().details;
    const avatar = res.data().avatar;

    const docRef = doc(collection(firestore, "Users"), id);

    await setDoc(docRef, {
      details: {
        ...details,
        state: state,
      },
      avatar: avatar,
    }).then(() =>
      setDoc(docRef, {
        details: {
          ...details,
          state: state,
        },
        avatar: avatar,
      })
    );

    const res1 = await getDoc(doc(firestore, "Users", id));
    const details1 = res1.data().details;

    setDetails(details1);
    setStateOpen(false);
  };

  const handleCityChange = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const details = res.data().details;
    const avatar = res.data().avatar;

    const docRef = doc(collection(firestore, "Users"), id);

    await setDoc(docRef, {
      details: {
        ...details,
        city: city,
      },
      avatar: avatar,
    }).then(() =>
      setDoc(docRef, {
        details: {
          ...details,
          city: city,
        },
        avatar: avatar,
      })
    );

    const res1 = await getDoc(doc(firestore, "Users", id));
    const details1 = res1.data().details;

    setDetails(details1);
    setCityOpen(false);
  };

  const handleNameChange = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const details = res.data().details;
    const avatar = res.data().avatar;

    const docRef = doc(collection(firestore, "Users"), id);

    await setDoc(docRef, {
      details: {
        ...details,
        name: name,
      },
      avatar: avatar,
    }).then(() =>
      setDoc(docRef, {
        details: {
          ...details,
          name: name,
        },
        avatar: avatar,
      })
    );

    const res1 = await getDoc(doc(firestore, "Users", id));
    const details1 = res1.data().details;

    setDetails(details1);
    setNameOpen(false);
  };

  const handleNumberChange = async () => {
    const res = await getDoc(doc(firestore, "Users", id));
    const details = res.data().details;
    const avatar = res.data().avatar;

    const docRef = doc(collection(firestore, "Users"), id);

    await setDoc(docRef, {
      details: {
        ...details,
        number: number,
      },
      avatar: avatar,
    }).then(() =>
      setDoc(docRef, {
        details: {
          ...details,
          number: number,
        },
        avatar: avatar,
      })
    );

    const res1 = await getDoc(doc(firestore, "Users", id));
    const details1 = res1.data().details;

    setDetails(details1);
    setNumberOpen(false);
  };

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleAddDeal = async () => {
    let urls = [];

    const docRef = doc(collection(firestore, "deals"), id);
    const docRef1 = doc(
      collection(firestore, "properties"),
      type.toLowerCase() + "s"
    );

    const res = await getDoc(doc(firestore, "deals", id));
    const data = res?.data();

    const res1 = await getDoc(
      doc(firestore, "properties", type.toLowerCase() + "s")
    );
    const data1 = res1.data();

    const storageRef = ref(storage);
    const folderRef = ref(
      storageRef,
      `images/users/${id}/deals/${newDealName}`
    );

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();

    const random = randomInt(1, 1000000);

    for (let i = 0; i < Object.values(newDealImagesList).length; i++) {
      const fileRef = ref(folderRef, `${newDealImagesList[i].name}`);

      await uploadBytes(fileRef, newDealImagesList[i]);
      await getDownloadURL(fileRef).then((url) => {
        urls.push(url);
      });
    }

    await setDoc(docRef1, {
      ...data1,
      [random]: { user: id, name: newDealName },
    }).then(() =>
      setDoc(docRef1, { ...data1, [random]: { user: id, name: newDealName } })
    );

    await setDoc(docRef, {
      ...data,
      [newDealName]: {
        propertyImages: urls,
        propertyName: newDealName,
        propertyCost: newDealPrice,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        carports: carports,
        floors: floors,
        type: type,
        date: { year: year, month: month, day: day },
        viewed: 0,
        tag: "new",
      },
    });

    const res2 = await getDoc(doc(firestore, "list", "last"));
    const fields = res2.data();

    const res3 = await getDoc(doc(firestore, "Users", id));
    const user = res3.data();

    if (fields.list.length < 10) {
      await setDoc(doc(firestore, "list", "last"), [
        ...fields,
        {
          deal: {
            propertyImages: urls,
            propertyName: newDealName,
            propertyCost: newDealPrice,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            carports: carports,
            floors: floors,
            type: type,
            date: { year: year, month: month, day: day },
            viewed: 0,
            tag: null,
          },
          id: id,
          user: {
            avatar: user.avatar,
            details: user.details,
          },
        },
      ]);
    } else {
      await setDoc(doc(firestore, "list", "last"), [
        {
          deal: {
            propertyImages: urls,
            propertyName: newDealName,
            propertyCost: newDealPrice,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            carports: carports,
            floors: floors,
            type: type,
            date: { year: year, month: month, day: day },
            viewed: 0,
            tag: null,
          },
          id: id,
          user: {
            avatar: user.avatar,
            details: user.details,
          },
        },
        ...fields.slice(0, fields.length - 1),
      ]);
    }

    setAddDeal(false);
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
    <m.div className="w-full h-auto">
      <div className="mx-auto flex flex-row gap-3 justify-center mt-12 z-30">
        <m.button
          onClick={handleReveal}
          className="w-32 h-12 bg-[#D1FAE5] ring-1 ring-green-500 rounded-lg hover:shadow-lg active:shadow-sm "
        >
          Reveal details
        </m.button>
        <m.button
          onClick={handleReveal1}
          className="w-32 h-12 bg-[#D1FAE5] ring-1 ring-green-500 rounded-lg hover:shadow-lg active:shadow-sm "
        >
          Reveal deals
        </m.button>
      </div>
      <AnimatePresence>
        {chosen == "details" ? (
          <m.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ y: [60, 0, 0], opacity: [0, 0.5, 1] }}
            exit={{ y: [0, 60, 60], opacity: [1, 0.5, 0] }}
            transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
            className={`opacity-0 mx-auto mt-5 lg:w-[60vw] w-full md:h-96 h-auto pb-14 rounded-[20px] bg-[#D1FAE5] ring-green-500 ring-1 flex flex-col gap-5 z-20`}
          >
            <div className="absolute mt-3 mr-3 self-end" onClick={handleClose}>
              <img
                alt="cross"
                src="/close.webp"
                loading="lazy"
                className="w-5 h-5 z-20"
              />
            </div>
            <div className="flex flex-row text-center mx-auto">
              <Dialog open={dialog} handler={handleOpen}>
                <DialogHeader>Choose Your Avatar</DialogHeader>
                <DialogBody>
                  <div className="grid grid-cols-3 gap-2">
                    {paths.map((path, index) => {
                      return (
                        <img
                          key={index}
                          alt={index}
                          src={path}
                          className="w-10 h-10 hover:shadow-xl active:shadow-sm rounded-full ring-1"
                          onClick={handleChoice}
                        />
                      );
                    })}
                    <div className="">
                      <img
                        alt="choose"
                        src="/defaultAvatars/plus.png"
                        className={`w-10 h-10 hover:shadow-xl active:shadow-sm rounded-full ${
                          openInput ? "ring-1" : ""
                        }`}
                        onClick={() => setOpenInput(!openInput)}
                      />
                      <input
                        type="file"
                        className={`${!openInput ? "hidden" : "visible"} mt-2 `}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <button
                        onClick={handleAddImage}
                        className={` ${
                          openInput ? "visible" : "hidden"
                        } w-[150px] h-[40px] p-2 pt-1 mt-2 font-lexend font-medium text-[18px] rounded-lg bg-green-100 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm`}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <button
                    className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                    onClick={() => setDialog(false)}
                  >
                    Close
                  </button>
                </DialogFooter>
              </Dialog>
              <Avatar
                src={url}
                size="lg"
                className="ring-2 ring-green-500 m-5 hover:shadow-lg active:shadow-sm"
                onClick={handleOpen}
              />

              <h2 className="self-center font-lexend font-semibold text-[#1B1C57] text-[20px] ">
                {details != undefined ? details.name?.split(" ")[1] : ""}
              </h2>
            </div>
            <div className="flex lg:flex-row flex-col items-center h-full">
              <div className="flex flex-col gap-2 lg:ml-14 ml-[10%] mt-5 text-[#1B1C57] font-lexend">
                <h1 className="font-bold text-[21px] text-center mb-5 lg:mb-0">
                  Address Information
                </h1>
                <h2 className="font-semibold text-[18px] flex flex-row">
                  Country:
                  <span className="font-medium text-[16px] flex flex-row ml-2 mt-[1px]">
                    {" "}
                    {details != undefined ? details.country : ""}
                    <img
                      alt="pencil"
                      src="/pencil.webp"
                      loading="lazy"
                      className="ml-2 w-5 h-5 hover:shadow-lg active:shadow-sms"
                      onClick={() => setCountryOpen(true)}
                    />
                    <Dialog open={countryOpen}>
                      <DialogHeader className="text-center">
                        Change the country
                      </DialogHeader>
                      <DialogBody className="mb-7">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Change Country"
                          className="absolute w-[95%] h-10 hover:shadow-md focus:shadow-lg px-3 py-2"
                        />
                      </DialogBody>
                      <DialogFooter className="flex flex-row gap-5">
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={() => setCountryOpen(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                          onClick={handleCountryChange}
                        >
                          Change
                        </button>
                      </DialogFooter>
                    </Dialog>
                  </span>
                </h2>
                <h2 className="font-semibold text-[18px] flex flex-row gap-2">
                  State:
                  <span className="font-medium text-[16px] flex flex-row gap-1">
                    {" "}
                    {details != undefined ? details.state : ""}
                  </span>
                  <img
                    alt="pencil"
                    src="/pencil.webp"
                    loading="lazy"
                    className=" w-5 h-5 hover:shadow-lg active:shadow-sm"
                    onClick={() => setStateOpen(true)}
                  />
                  <Dialog open={stateOpen}>
                    <DialogHeader className="text-center">
                      Change the state
                    </DialogHeader>
                    <DialogBody className="mb-7">
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Change State"
                        className="absolute w-[95%] h-10 hover:shadow-md focus:shadow-lg px-3 py-2"
                      />
                    </DialogBody>
                    <DialogFooter className="flex flex-row gap-5">
                      <button
                        className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                        onClick={() => setStateOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                        onClick={handleStateChange}
                      >
                        Change
                      </button>
                    </DialogFooter>
                  </Dialog>
                </h2>
                <h2 className="font-semibold text-[18px] flex flex-row gap-2">
                  City:
                  <span className="font-medium text-[16px] flex flex-row">
                    {" "}
                    {details != undefined ? details.city : ""}
                  </span>
                  <img
                    alt="pencil"
                    src="/pencil.webp"
                    loading="lazy"
                    className=" w-5 h-5 hover:shadow-lg active:shadow-sm"
                    onClick={() => setCityOpen(true)}
                  />
                  <Dialog open={cityOpen}>
                    <DialogHeader className="text-center">
                      Change the city
                    </DialogHeader>
                    <DialogBody className="mb-7">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Change City"
                        className="absolute w-[95%] h-10 hover:shadow-md focus:shadow-lg px-3 py-2"
                      />
                    </DialogBody>
                    <DialogFooter className="flex flex-row gap-5">
                      <button
                        className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                        onClick={() => setCityOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                        onClick={handleCityChange}
                      >
                        Change
                      </button>
                    </DialogFooter>
                  </Dialog>
                </h2>
              </div>
              <div className="lg:w-[2px] lg:h-[80%] w-[80%] h-[2px] lg:mx-20 my-10 mx-auto bg-green-500" />
              <div className="flex flex-col gap-2 text-[#1B1C57] font-lexend mt-5 items-center">
                <h1 className="font-bold text-[20px] text-center mb-5 lg:mb-0">
                  Contact Information
                </h1>
                {[
                  {
                    h2: "Full Name: ",
                    text: details.name,
                    setOpen: () => setNameOpen(true),
                    open: nameOpen,
                    dialogHeader: "Change the full name",
                    inputValue: name,
                    inputChange: (e) => setName(e.target.value),
                    inputPlaceholder: "Change Name",
                    close: () => setNameOpen(false),
                    change: handleNameChange,
                  },
                  {
                    h2: "Number: ",
                    text: details.number,
                    setOpen: () => setNumberOpen(true),
                    open: numberOpen,
                    dialogHeader: "Change the phone number",
                    inputValue: number,
                    inputChange: (e) => setNumber(e.target.value),
                    inputPlaceholder: "Change Number",
                    close: () => setNumberOpen(false),
                    change: handleNumberChange,
                  },
                  ,
                ].map((obj, index) => {
                  return (
                    <h2
                      key={index}
                      className="font-semibold text-[18px] flex flex-row gap-1"
                    >
                      {obj.h2}
                      <span className="font-medium text-[16px]">
                        {details != undefined ? obj.text : ""}
                      </span>
                      <img
                        alt="pencil"
                        src="/pencil.webp"
                        className="ml-2 w-5 h-5 hover:shadow-lg active:shadow-sms"
                        onClick={obj.setOpen}
                      />
                      <Dialog open={obj.open}>
                        <DialogHeader className="text-center">
                          {obj.dialogHeader}
                        </DialogHeader>
                        <DialogBody className="mb-7">
                          <input
                            type="text"
                            value={obj.inputValue}
                            onChange={obj.inputChange}
                            placeholder={obj.inputPlaceholder}
                            className="absolute w-[95%] h-10 hover:shadow-md focus:shadow-lg px-3 py-2"
                          />
                        </DialogBody>
                        <DialogFooter className="flex flex-row gap-5">
                          <button
                            className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                            onClick={obj.close}
                          >
                            Close
                          </button>
                          <button
                            className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                            onClick={obj.change}
                          >
                            Change
                          </button>
                        </DialogFooter>
                      </Dialog>
                    </h2>
                  );
                })}
              </div>
            </div>
          </m.div>
        ) : chosen == "deals" ? (
          <m.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ y: [60, 0, 0], opacity: [0, 0.5, 1] }}
            exit={{ y: [0, 60, 60], opacity: [1, 0.5, 0] }}
            transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
            className={`opacity-0 lg:w-[90vw] w-full h-[80vh] mt-5 mb-[60px] rounded-[20px] bg-[#D1FAE5] ring-green-500 ring-1 flex flex-col gap-5 z-20 `}
          >
            <div className="absolute mt-3 mr-3 self-end" onClick={handleClose}>
              <img
                alt="cross"
                src="/close.webp"
                loading="lazy"
                className="w-5 h-5"
              />
            </div>
            <div className="flex lg:flex-row flex-col gap-2 justify-center">
              <m.h2
                className="self-center font-lexend font-semibold text-[#1B1C57] text-[26px] mt-4 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "backInOut", delay: 1 }}
              >
                Your Deals
              </m.h2>
              <ButtonGroup
                className={`font-lexend font-semibold lg:text-[18px] text-sm text-center lg:ml-4 mt-3 flex flex-row lg:gap-2 gap-1 px-2 self-center rounded-lg`}
              >
                {["house", "villa", "apartment", "all"].map(
                  (variant, index) => (
                    <Button
                      key={index}
                      value={variant}
                      onClick={handleSort}
                      className="capitalize font-lexend font-semibold text-[16px] bg-black"
                    >
                      {variant != "all" ? variant + "s" : variant}
                    </Button>
                  )
                )}
              </ButtonGroup>
            </div>
            <div className="flex flex-row gap-5 mt-1 w-full overflow-x-auto account-scroll">
              {deals != null
                ? deals.map((deal, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-3 h-auto justify-between ml-2"
                      >
                        <div className="w-80 h-96 group group-last:rotate-45">
                          <Link
                            key={index}
                            href={`/account/${deal.propertyName}?id=${id}`}
                          >
                            <img
                              alt="images"
                              src={deal.propertyImages[0]}
                              className="hover:shadow-xl active:shadow-sm w-80 h-96 ring-1 ring-black rounded-[36px] ml-9 shadow-sm object-cover mt-1"
                            />
                          </Link>
                        </div>
                        <div className="z-20 ml-9 mt-3 font-lexend px-8">
                          <h2 className="font-semibold text-black text-[24px]">
                            {deal.propertyName}
                          </h2>
                          <p className="font-normal text-[#3C4563] text-[18px]">
                            ${" "}
                            {divideStringIntoSegments(
                              deal.propertyCost,
                              3
                            ).join(".")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : ""}
              <div
                onClick={() => setAddDeal(true)}
                className="ml-11 min-w-80 h-96 bg-gray-50 ring-1 mt-1 ring-black rounded-[36px] flex flex-col text-center justify-center hover:shadow-xl active:shadow-sm shadow-md"
              >
                <img
                  alt="plus"
                  src="/big_plus.webp"
                  className="w-24 h-24 mx-auto "
                />
                <h2 className="text-black font-lexend font-semibold text-[26px]">
                  Add Deal
                </h2>
              </div>
            </div>
            <Dialog open={addDeal} className="overflow-y-scroll">
              <DialogHeader>Add Your Deal</DialogHeader>
              <DialogBody>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      h2: "The Property Cost",
                      type: "text",
                      value: newDealPrice,
                      change: (e) => setNewDealPrice(e.target.value),
                      placeholder: "The Property Cost",
                    },
                    {
                      h2: "The Property Name",
                      type: "text",
                      value: newDealName,
                      change: (e) => setNewDealName(e.target.value),
                      placeholder: "The Property Name",
                    },
                    {
                      h2: "The Number of Bedrooms",
                      type: "number",
                      value: bedrooms,
                      change: (e) => setBedrooms(e.target.value),
                      placeholder: "The Number of Bedrooms",
                    },
                    {
                      h2: "The Number of Bathrooms",
                      type: "number",
                      value: bathrooms,
                      change: (e) => setBathrooms(e.target.value),
                      placeholder: "The Number of Bathrooms",
                    },
                    {
                      h2: "The Number of Carports",
                      type: "number",
                      value: carports,
                      change: (e) => setCarports(e.target.value),
                      placeholder: "The Number of Carports",
                    },
                    {
                      h2: "The Number of Floors",
                      type: "number",
                      value: floors,
                      change: (e) => setFloors(e.target.value),
                      placeholder: "The Number of Floors",
                    },
                    {
                      h2: "The Type of the Property",
                      type: "text",
                      value: type,
                      change: (e) => setType(e.target.value),
                      placeholder:
                        "The Type of the Property ( house / villa / apartment )",
                    },
                  ].map((obj, index) => (
                    <div key={index}>
                      <h2 className="font-lexend font-medium text-[16px]">
                        {obj.h2}
                      </h2>
                      <input
                        type={obj.type}
                        value={obj.value}
                        onChange={obj.change}
                        placeholder={obj.placeholder}
                      />
                    </div>
                  ))}
                  <input
                    type="file"
                    placeholder="Photos of the Property"
                    multiple
                    onChange={(e) => setNewDealImagesList(e.target.files)}
                    className=" w-[95%] h-10 px-3 py-2"
                  />
                </div>
              </DialogBody>
              <DialogFooter className="flex flex-row gap-5 mt-4">
                <button
                  className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                  onClick={() => setAddDeal(false)}
                >
                  Close
                </button>
                <button
                  className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                  onClick={handleAddDeal}
                >
                  Create
                </button>
              </DialogFooter>
            </Dialog>
          </m.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </m.div>
  );
}
