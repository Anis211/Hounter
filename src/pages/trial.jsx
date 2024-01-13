/* eslint-disable @next/next/no-img-element */
import { setDoc, collection, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage, auth } from "../../firebase/clientApp";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

export default function Trial() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  const handleClick = async () => {
    try {
      const storageRef = ref(storage);
      const imageRef = ref(storageRef, `images/${image.name}`);
      const user = auth.currentUser;
      const id = user.uid;

      await uploadBytes(imageRef, image);
      await getDownloadURL(imageRef).then((url) => setImageUrl(url));

      const docRef = await getDoc(doc(firestore, "list", "fields"));
      const data = docRef.data();

      await setDoc(doc(collection(firestore, "list"), "fields"), {
        ...data,
        [id]: imageUrl,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="mt-16">
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <Button onClick={handleClick}>Upload</Button>
      {imageUrl && <img alt="uploaded" src={imageUrl} className="mt-10" />}
      <img
        alt="image"
        src='https://firebasestorage.googleapis.com/v0/b/hounter-99675.appspot.com/o/images%2Fsultan-baybars-1545579847.jpg?alt=media&token=b6ab2308-f333-4c7e-a49c-b36e6067188a"'
      />
      <Button
        onClick={async () => {
          const docRef = doc(firestore, "list", "fields");
          const data = await getDoc(docRef);
          console.log(data.data());
        }}
      >
        Click me
      </Button>
    </div>
  );
}
