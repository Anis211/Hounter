import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }) {
  return (
    <div className="w-full h-auto flex flex-col px-28 py-12 ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
