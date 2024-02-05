import Hero from "@/components/home/Hero";
import List from "@/components/home/List";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import useUser from "@/details/user";
import { useEffect } from "react";

export default function Home({ popular, newH }) {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const id = useUser((state) => state.user);

  return (
    <div className="w-full h-auto p-0 m-0">
      {console.log(id)}
      <Hero id="about" />
      <div id="list"></div>
      <List popular={popular} newH={newH} />
    </div>
  );
}

export async function getServerSideProps() {
  const docRef = doc(firestore, "list", "fields");
  const result = await getDoc(docRef);
  const data = result.data();

  const popular = [];
  const newH = [];

  for (let i = 0; i < data.popular.length; i++) {
    const docRef = doc(firestore, "list", "fields");
    const result = await getDoc(docRef);
    const data = result.data();

    const res = await getDoc(doc(firestore, "deals", data.popular[i].userId));
    const data1 = res.data()[data.popular[i].name];

    const res1 = await getDoc(doc(firestore, "Users", data.popular[i].userId));
    const user = res1.data();

    popular.push({
      deal: data1,
      user: user,
      id: data.popular[i].userId,
    });
  }

  for (let i = 0; i < data.new.length; i++) {
    const result = await getDoc(doc(firestore, "list", "fields"));
    const data = result.data();

    const res = await getDoc(doc(firestore, "deals", data.new[i].userId));
    const data1 = res.data()[data.new[i].name];

    const res1 = await getDoc(doc(firestore, "Users", data.new[i].userId));
    const user = res1.data();

    newH.push({ deal: data1, user: user, id: data.new[i].userId });
  }

  return {
    props: {
      popular: popular,
      newH: newH,
    },
  };
}
