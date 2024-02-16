import Vector from "@/details/vector";
import Yellow from "@/details/yellow";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { Rating } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/clientApp";

export default function AddComment({ user }) {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [image, setImage] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    const res = await getDoc(doc(firestore, "comments", "all"));
    const data = res.data();
    const now = new Date();

    if (
      inputValue.split(" ").length > 1 &&
      textareaValue.split(" ").length > 1
    ) {
      const storageRef = ref(storage);
      const fileRef = ref(
        storageRef,
        `images/users/${user.details.id}/comments/${image.name}`
      );

      let downloadUrl = "";

      await uploadBytes(fileRef, image);
      await getDownloadURL(fileRef).then((url) => {
        downloadUrl = url;
      });

      await setDoc(doc(firestore, "comments", "all"), {
        comments: [
          ...data.comments,
          {
            header: inputValue,
            body: textareaValue,
            user: { ...user.details, avatar: user.avatar },
            rating: ratingValue,
            time: {
              ms: now.getTime(),
            },
            image: downloadUrl,
          },
        ],
      });

      await setDoc(doc(firestore, "Users", user.details.id), {
        ...user,
        comments: [
          ...user.comments,
          {
            header: inputValue,
            body: textareaValue,
            rating: ratingValue,
            time: {
              ms: now.getTime(),
            },
            image: downloadUrl,
          },
        ],
      });

      setInputValue("");
      setTextareaValue("");
      setRatingValue(0);

      router.push("/#comments");
    }
  };

  return (
    <div
      className={`${
        user != null
          ? "h-[auto]"
          : "h-[80vh] flex place-items-center justify-center"
      } w-full pt-14`}
    >
      <div className="absolute left-64 bottom-[60vh]">
        <Vector />
      </div>
      <div className="absolute left-[38vw] bottom-[94vh]">
        <Vector />
      </div>
      {user != null ? (
        <div className="xl:px-6 px-3 pt-10 pb-14 rounded-lg bg-[#D1FAE5] h-auto mx-auto xl:max-w-[55vw] w-full z-10 flex flex-col gap-5">
          <h2 className="font-lexend font-bold xl:text-2xl text-xl text-[#047857] text-center">
            Add Your Comment
          </h2>
          {inputValue != "" ? (
            <h2 className="font-lexend font-bold text-md text-[#047857] xl:ml-[6vw] ml-[2.5%]">
              Comment Header
            </h2>
          ) : (
            ""
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter the header of the comment..."
            className="pl-4 py-3 xl:w-[40vw] w-[95%] z-20 mx-auto h-[7vh] overflow-hidden rounded-lg bg-white bg-opacity-65 placeholder:text-gray-600 placeholder:text-opacity-70"
          />

          {textareaValue != "" ? (
            <h2 className="font-lexend font-bold text-md text-[#047857] xl:ml-[6vw] ml-[2.5%]">
              Comment Body
            </h2>
          ) : (
            ""
          )}
          <textarea
            placeholder="Enter the body of the comment"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className={`bg-white bg-opacity-55 xl:w-[40vw] w-[95%] z-10 overflow-y-hidden max-h-[40vh] mx-auto rounded-lg px-3 pt-3 min-h-[10vw]`}
          />

          <h2 className="font-lexend font-bold text-md text-[#047857] xl:ml-[6vw] ml-[2.5%]">
            Rate our service
          </h2>
          <Rating
            value={ratingValue}
            onChange={(value) => setRatingValue(value)}
            className="xl:ml-[6vw] ml-[2.5%]"
          />

          <h2 className="font-lexend font-bold text-md text-[#047857] xl:ml-[6vw] ml-[2.5%] z-10">
            Add an image of your house
          </h2>
          <input
            type="file"
            onChange={(e) => setImage(e.currentTarget.files[0])}
            className="xl:ml-[6vw] ml-[2.5%] z-10 file:bg-green-500 file:text-white file:font-lexend file:font-bold file:text-md file:border-0 file:px-3 file:py-2 file:rounded-md text-green-500 font-lexend font-medium text-md"
          />

          <button
            disabled={
              inputValue == "" ||
              textareaValue == "" ||
              ratingValue == 0 ||
              image == ""
                ? true
                : false
            }
            className="bg-green-500 z-10 text-white font-lexend font-medium text-lg disabled:bg-opacity-65 py-2 px-3 rounded-lg xl:w-[40vw] w-[95%] mx-auto hover:shadow-xl active:shadow-sm disabled:hover:shadow-sm "
            onClick={handleClick}
          >
            Post the comment
          </button>
        </div>
      ) : (
        <h2 className="font-lexend font-bold xl:text-3xl text-2xl text-red-600">
          To write a comment you have to sign in or sign up
        </h2>
      )}
      <div className="absolute left-[105vw] top-[60vh]">
        <Yellow />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const res = await getDoc(doc(firestore, "Users", id));
  const user1 = res.data();

  return {
    props: {
      user: user1 != undefined ? user1 : null,
    },
  };
}
