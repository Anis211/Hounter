/* eslint-disable @next/next/no-img-element */
import { firestore, storage, auth } from "../../../firebase/clientApp";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import Image from "next/image";
import { m } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

export default function Property({ data, id, name1 }) {
  const [pencil, setPencil] = useState({
    bed: false,
    bath: false,
    carport: false,
    stairs: false,
    price: false,
  });

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [chosen, setChosen] = useState(data.propertyImages[0]);
  const [remained, setRemained] = useState(
    data.propertyImages.slice(1, data.propertyImages.length)
  );

  const name = data.propertyName.split(" ");

  const [addImages, setAddImages] = useState(false);
  const [newImages, setNewImages] = useState([]);

  const [changeBedrooms, setChangeBedrooms] = useState(false);
  const [newBedrooms, setNewBedrooms] = useState("");

  const [changeBathrooms, setChangeBathrooms] = useState(false);
  const [newBathrooms, setNewBathrooms] = useState("");

  const [changeCarports, setChangeCarports] = useState(false);
  const [newCarports, setNewCarports] = useState("");

  const [changeFloors, setChangeFloors] = useState(false);
  const [newFloors, setNewFloors] = useState("");

  const [changePrice, setChangePrice] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  const handleUpload = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    const storageRef = ref(storage);
    const folderRef = ref(
      storageRef,
      `images/users/${id}/deals/${data.propertyName}`
    );
    const urls = [];

    for (let i = 0; i < Object.values(newImages).length; i++) {
      const fileRef = ref(folderRef, `${newImages[i].name}`);

      await uploadBytes(fileRef, newImages[i]);
      await getDownloadURL(fileRef).then((url) => {
        urls.push(url);
      });
    }

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        propertyImages: [...deal.propertyImages, ...urls],
      },
    });

    const res1 = await getDoc(doc(collection(firestore, "deals"), id));
    const data1 = res1.data()[name1];
    console.log(data1);

    setRemained(data1.propertyImages.slice(1, data1.propertyImages.length));
    setAddImages(false);
  };

  const handleUploadBedrooms = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        bedrooms: newBedrooms,
      },
    });

    setChangeBedrooms(false);
  };

  const handleUploadBathrooms = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        bathrooms: newBathrooms,
      },
    });

    setChangeBathrooms(false);
  };

  const handleUploadCarports = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        carports: newCarports,
      },
    });

    setChangeCarports(false);
  };

  const handleUploadFloors = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        floors: newFloors,
      },
    });

    setChangeFloors(false);
  };

  const handleUploadPrice = async () => {
    const docRef = doc(collection(firestore, "deals"), id);
    const res = await getDoc(docRef);
    const save = res.data();
    const deal = save[data.propertyName];

    await setDoc(doc(firestore, "deals", id), {
      ...save,
      [deal.propertyName]: {
        ...deal,
        propertyCost: newPrice,
      },
    });

    setChangePrice(false);
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
      {console.log(name1)}
      <div className="mt-16">
        <div className="flex flex-row gap-3 justify-center">
          <div
            className="flex flex-col justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <m.h2
              className="flex flex-row font-lexend font-bold text-[36px] text-[#1B1C57] mx-auto"
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                times: [0, 0.5, 1],
                type: "spring",
                staggerChildren: 0.2,
              }}
            >
              {name.map((letter, index) => (
                <m.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 80,
                      y: 40,
                    },
                    visible: {
                      opacity: [0, 0.5, 1],
                      x: [80, 80, 0],
                      y: [40, -20, 0],
                    },
                  }}
                  key={index}
                  className={`font-lexend font-bold text-[36px] text-[#1B1C57] inline-block ${
                    data.propertyName.includes(" ") ? "mr-2" : ""
                  }`}
                >
                  {letter}
                </m.span>
              ))}
            </m.h2>
            <m.hr
              className="border-black mt-2 border-[1px] mx-auto"
              initial={{ width: "100%" }}
              animate={hovered ? { width: "0px" } : ""}
              transition={
                hovered
                  ? {
                      duration: 1.5,
                      ease: "backInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }
                  : ""
              }
            />
          </div>
          {data.tag != "" ? (
            <m.div
              initial={{
                opacity: 0,
                x: 80,
                y: 40,
              }}
              animate={{
                opacity: [0, 0.5, 0.5, 1],
                x: [80, 80, 80, 0],
                y: [40, -20, -20, 0],
              }}
              transition={{
                duration: 1,
                times: [0, 0.4, 0.8, 1],
                type: "spring",
                delay: 0.6,
              }}
              className={`self-center flex flex-row gap-3 px-4 h-10 py-2 rounded-full text-center items-center ${
                data.tag == "popular" ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              <img
                alt="icon"
                src={data.tag == "popular" ? "/popular.png" : "/new.png"}
                className="w-5 h-5"
              />
              <p
                className={`font-lexend font-semibold text-[16px] capitalize ${
                  data.tag == "popular" ? "text-red-500" : "text-blue-700"
                }`}
              >
                {data.tag}
              </p>
            </m.div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-row gap-10 justify-between pt-16">
          <m.div
            className="font-lexend flex flex-col"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: [60, -15, 0], opacity: [0, 0.5, 1] }}
            transition={{
              duration: 1,
              ease: "backInOut",
              times: [0, 0.5, 1],
            }}
          >
            <h2 className="font-semibold text-[22px] text-[#1B1C57]">
              House Details
            </h2>
            <div className="grid grid-cols-2 text-[#3C4563] gap-10 mt-10 mb-8">
              {[
                {
                  text:
                    data.bedrooms > 1
                      ? data.bedrooms + " Bedrooms"
                      : data.bedrooms + " Bedroom",
                  url: "/bed.png",
                  function: () => {
                    setChangeBedrooms(true);
                  },
                },
                {
                  text:
                    data.bathrooms > 1
                      ? data.bathrooms + " Bathrooms"
                      : data.bathrooms + " Bathroom",
                  url: "/bath.png",
                  function: () => setChangeBathrooms(true),
                },
                {
                  text:
                    data.carports > 1
                      ? data.carports + " Carports"
                      : data.carports + " Carport",
                  url: "/carport.png",
                  function: () => setChangeCarports(true),
                },
                {
                  text:
                    data.floors > 1
                      ? data.floors + " Floors"
                      : data.floors + " Floor",
                  url: "/stairs.png",
                  function: () => setChangeFloors(true),
                },
              ].map((obj, index) => {
                return (
                  <div key={index} className="flex flex-row gap-3">
                    <Image alt="icon" src={obj.url} width={40} height={40} />
                    <p
                      className="my-auto"
                      onMouseEnter={() =>
                        setPencil((prev) => ({
                          ...prev,
                          [obj.url.slice(1, obj.url.length).split(".")[0]]:
                            true,
                        }))
                      }
                    >
                      {obj.text}
                    </p>
                    <img
                      alt="pencil"
                      src="/pencil.png"
                      className={`w-8 h-8 ${
                        pencil[obj.url.slice(1, obj.url.length).split(".")[0]]
                          ? "visible"
                          : "hidden"
                      }`}
                      onMouseLeave={() =>
                        setPencil((prev) => ({
                          ...prev,
                          [obj.url.slice(1, obj.url.length).split(".")[0]]:
                            false,
                        }))
                      }
                      onClick={obj.function}
                    />
                  </div>
                );
              })}
            </div>
            <hr className="border-black" />
            <div className="mt-10 text-[#3C4563] flex flex-col gap-5 mb-8">
              {[
                {
                  text:
                    "Price: $ " +
                    divideStringIntoSegments(data.propertyCost, 3).join("."),
                  change: () => setChangePrice(true),
                },
                {
                  text: "Property type: " + data.type,
                  change: "",
                },
                {
                  text: `Creation Date: ${data?.date.day}.${data?.date.month}.${data?.date.year}`,
                  change: "",
                },
                {
                  text: "The number of visitors: " + data.viewed,
                  change: "",
                },
              ].map((obj, index) => (
                <p
                  className={`text-[18px] ${
                    obj.change != "" ? "flex flex-row gap-1" : ""
                  }`}
                  onMouseEnter={() =>
                    setPencil((prev) => ({
                      ...prev,
                      [obj.text.split(":")[0].toLowerCase()]: true,
                    }))
                  }
                  key={index}
                >
                  {obj.text}
                  {obj.change != "" ? (
                    <img
                      alt="pencil"
                      src="/pencil.png"
                      className={`w-6 h-6 ${
                        pencil[obj.text.split(":")[0].toLowerCase()]
                          ? "visible"
                          : "hidden"
                      }`}
                      onClick={obj.change}
                      onMouseLeave={() =>
                        setPencil((prev) => ({
                          ...prev,
                          [obj.text.split(":")[0].toLowerCase()]: false,
                        }))
                      }
                    />
                  ) : (
                    ""
                  )}
                </p>
              ))}
            </div>
            <hr className="border-black" />
          </m.div>
          <m.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: [60, -15, 0], opacity: [0, 0.5, 1] }}
            transition={{
              duration: 1,
              ease: "backInOut",
              times: [0, 0.5, 1],
            }}
          >
            <Dialog open={open} className="w-full">
              <DialogHeader>Image</DialogHeader>
              <DialogBody>
                <img
                  alt="main"
                  src={chosen}
                  className="w-96 h-96 object-contain"
                />
              </DialogBody>
              <DialogFooter>
                <button
                  className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </DialogFooter>
            </Dialog>
            <div className="flex flex-col mr-24 ">
              <img
                src={chosen}
                alt="main image"
                className="w-96 h-96 rounded-lg ml-20 "
                onClick={() => setOpen(true)}
              />
              <div className="flex flex-row gap-3 z-20 w-auto justify-between absolute bottom-8 ">
                <div
                  onClick={() => setAddImages(true)}
                  className="min-w-48 h-32 z-20 rounded-lg shadow-lg hover:shadow-xl bg-white opacity-95 flex items-center justify-center"
                >
                  <img alt="plus" src="/big_plus.png" className="w-16 h-16" />
                </div>
                <div className="flex flex-row gap-3 overflow-x-auto image-scroll">
                  {remained.map((url, index) => (
                    <img
                      key={index}
                      alt={index}
                      src={url}
                      className="bg-white w-48 h-32 z-20 rounded-lg shadow-lg hover:shadow-xl object-cover"
                      onClick={(e) => {
                        setRemained((prev) => [
                          ...prev.slice(0, prev.indexOf(e.target.src)),
                          ...prev.slice(
                            prev.indexOf(e.target.src) + 1,
                            prev.length
                          ),
                          chosen,
                        ]);
                        setChosen(e.target.src);
                      }}
                    />
                  ))}
                </div>
              </div>
              <Dialog open={addImages}>
                <DialogHeader>Add New Image / Images</DialogHeader>
                <DialogBody>
                  <input
                    type="file"
                    multiple
                    placeholder="New photos"
                    onChange={(e) => setNewImages(e.target.files)}
                  />
                </DialogBody>
                <DialogFooter>
                  <button
                    className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                    onClick={() => setAddImages(false)}
                  >
                    Close
                  </button>
                  <button
                    className="w-[200px] h-[50px] p-2 ml-3 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </DialogFooter>
              </Dialog>
            </div>
          </m.div>
        </div>
        {[
          {
            open: changeBedrooms,
            header: "Change the Number of Bedrooms",
            value: newBedrooms,
            onChange: (e) => setNewBedrooms(e.target.value),
            close: () => setChangeBedrooms(false),
            change: handleUploadBedrooms,
          },
          {
            open: changeBathrooms,
            header: "Change the Number of Bathrooms",
            value: newBathrooms,
            onChange: (e) => setNewBathrooms(e.target.value),
            close: () => setChangeBathrooms(false),
            change: handleUploadBathrooms,
          },
          {
            open: changeCarports,
            header: "Change the Number of Carports",
            value: newCarports,
            onChange: (e) => setNewCarports(e.target.value),
            close: () => setChangeCarports(false),
            change: handleUploadCarports,
          },
          {
            open: changeFloors,
            header: "Change the Number of Floors",
            value: newFloors,
            onChange: (e) => setNewFloors(e.target.value),
            close: () => setChangeFloors(false),
            change: handleUploadFloors,
          },
          {
            open: changePrice,
            header: "Change the Price of the Property",
            value: newPrice,
            onChange: (e) => setNewPrice(e.target.value),
            close: () => setChangePrice(false),
            change: handleUploadPrice,
          },
        ].map((obj, index) => (
          <Dialog key={index} open={obj.open}>
            <DialogHeader>{obj.header}</DialogHeader>
            <DialogBody>
              <input
                type="number"
                value={obj.value}
                onChange={obj.onChange}
                className="w-full h-10 pl-3"
              />
            </DialogBody>
            <DialogFooter>
              <button
                className="w-[200px] h-[50px] p-2 font-lexend font-medium text-[18px] rounded-lg bg-red-400 text-white ring-1 ring-black hover:shadow-xl active:shadow-sm "
                onClick={obj.close}
              >
                Close
              </button>
              <button
                className="w-[200px] h-[50px] p-2 ml-3 font-lexend font-medium text-[18px] rounded-lg bg-green-200 text-green-500 ring-1 ring-black hover:shadow-xl active:shadow-sm "
                onClick={obj.change}
              >
                Change
              </button>
            </DialogFooter>
          </Dialog>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  function removeDuplicates(arr, propertyName) {
    const uniqueSet = new Set();

    const uniqueArray = arr.filter((item) => {
      const propertyValue = item[propertyName];

      if (uniqueSet.has(propertyValue)) {
        return false;
      } else {
        uniqueSet.add(propertyValue);
        return true;
      }
    });

    return uniqueArray;
  }

  const id = context.query.id;
  const name = context.query.name;

  const docRef = doc(collection(firestore, "deals"), id);
  const res = await getDoc(docRef);
  const data = res.data();

  const result = await getDoc(doc(firestore, "list", "fields"));
  const list = result != undefined ? result.data() : null;

  if (list != null) {
    if (data[name].tag == "popular") {
      await setDoc(doc(collection(firestore, "list"), "fields"), {
        new: [...list.new],
        popular: removeDuplicates(
          [
            ...list.popular,
            {
              userId: id,
              name: data[name].propertyName,
            },
          ],
          "name"
        ),
      });
    } else if (data[name].tag.split(" ")[0] == "new") {
      await setDoc(doc(collection(firestore, "list"), "fields"), {
        popular: [...list.popular],
        new: removeDuplicates(
          [
            ...list.new,
            {
              userId: id,
              name: data[name].propertyName,
            },
          ],
          "name"
        ),
      });
    }
  }

  return {
    props: {
      data: data[name],
      id: id,
      name1: context.query.name,
    },
  };
}
