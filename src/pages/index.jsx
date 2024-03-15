import { firestore } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";
import useUser from "@/details/user";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

const Hero = dynamic(() => import("../components/home/Hero"), { ssr: true });

export default function Home() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const [coms, setComs] = useState([]);
  const [list, setList] = useState([]);

  const [listChanged, setListChanged] = useState(false);
  const [commentsChanged, setCommentsChanged] = useState(false);

  const heroRef = useRef(null);
  const listRef = useRef(null);
  const commentsRef = useRef(null);
  const articlesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const listInView = useInView(listRef, { once: true });
  const commentsInView = useInView(commentsRef, { once: true });
  const articlesInView = useInView(articlesRef, { once: true });

  let List = "";
  let Comments = "";
  let Article = "";

  useEffect(() => {
    const fetch = async () => {
      const res = await getDoc(doc(firestore, "comments", "last"));
      const coms = res.data();

      setComs(coms.comments);
      setCommentsChanged(true);
    };

    !commentsChanged && commentsInView ? fetch() : "";
  }, [commentsInView, commentsChanged]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getDoc(doc(firestore, "list", "last"));
      const list = res.data();

      setList(list.list);
      setListChanged(true);
    };

    !listChanged && listInView ? fetch() : "";
  }, [listInView, listChanged]);

  heroInView
    ? (List = dynamic(() => import("@/components/home/List"), {
        ssr: false,
        loading: () => (
          <Button loading={true} className="mx-auto">
            Loading
          </Button>
        ),
      }))
    : "";

  listInView
    ? (Comments = dynamic(() => import("@/components/home/Comments"), {
        ssr: false,
        loading: () => (
          <Button loading={true} className="mx-auto">
            Loading
          </Button>
        ),
      }))
    : "";

  commentsInView
    ? (Article = dynamic(() => import("@/components/home/Articles"), {
        ssr: false,
        loading: () => (
          <Button loading={true} className="mx-auto">
            Loading
          </Button>
        ),
      }))
    : "";

  return (
    <div className="h-auto p-0 m-0">
      <div ref={heroRef} id="about" />
      <Hero />

      <div ref={listRef} id="list" />
      {listInView ? <List list1={list} /> : ""}
      <div className={`${!listInView ? "mb-[100svh]" : "mb-0"}`} />

      <div ref={commentsRef} id="comments" />
      {commentsInView && coms.length > 0 ? <Comments comments={coms} /> : ""}
      <div className={`${!commentsInView ? "mb-[100svh]" : "mb-0"}`} />

      <div ref={articlesRef} id="article" />
      {articlesInView ? <Article /> : ""}
    </div>
  );
}
