import Hero from "@/components/home/Hero";
import List from "@/components/home/List";
import Comments from "@/components/home/Comments";
import Article from "@/components/home/Articles";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import useUser from "@/details/user";
import { useEffect } from "react";

export default function Home({ popular, newH, coms }) {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const id = useUser((state) => state.user);

  return (
    <div className="w-full h-auto p-0 m-0">
      {console.log(id)}
      <Hero id="about" />
      <div id="list" />
      <List popular={popular} newH={newH} />
      <div id="comments" />
      <Comments comments={coms} />
      <div id="article" />
      <Article />
    </div>
  );
}

export async function getServerSideProps() {
  const docRef = doc(firestore, "list", "fields");
  const result = await getDoc(docRef);
  const data = result.data();

  const res = await getDoc(doc(firestore, "comments", "all"));
  const data1 = res.data();

  const popularNumber = data.popular.length < 10 ? data.popular.length : 10;
  const newNumber = data.new.length < 10 ? data.new.length : 10;

  const popular = [];
  const newH = [];
  const comments =
    data1.comments.length < 5
      ? data1.comments
      : data1.comments.slice(data1.comments.length - 5, data1.comments.length);

  for (let i = 0; i < popularNumber; i++) {
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

  for (let i = 0; i < newNumber; i++) {
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
      coms: comments,
    },
  };
}
