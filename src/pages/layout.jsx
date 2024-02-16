import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }) {
  return (
    <div className="xl:w-screen-2xl h-auto flex flex-col 2xl:px-28 lg:px-20 md:px-10 pr-6 pl-5 md:py-12 py-6 overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
