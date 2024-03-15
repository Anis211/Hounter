import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LazyMotion, domAnimation } from "framer-motion";
import useUser from "@/details/user";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const theme = useUser((state) => state.theme);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`h-full w-[100svw] flex flex-col 2xl:px-28 md:py-12 py-6 overflow-x-hidden ${
          theme == "light" ? "bg-transparent" : "bg-[#10274F]"
        }`}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </LazyMotion>
  );
}
