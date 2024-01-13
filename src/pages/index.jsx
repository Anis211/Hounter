import Hero from "@/components/home/Hero";
import List from "@/components/home/List";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

export default function Home({ image }) {
  return (
    <div className="w-full h-auto p-0 m-0">
      <Hero />
      <List data={image} />
    </div>
  );
}

export async function getServerSideProps() {
  const docRef = doc(firestore, "list", "fields");
  const data = await getDoc(docRef);
  const res = data.data();

  return {
    props: {
      image: res,
    },
  };
}
