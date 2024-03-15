/* eslint-disable @next/next/no-img-element */
import Logo from "@/details/logo";
import Link from "next/link";
import useUser from "@/details/user";
import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const setName = useUser((state) => state.setName);
  const theme = useUser((state) => state.theme);

  return (
    <div className="mt-28 flex lg:flex-row flex-col px-4 md:px-10 lg:px-14">
      <div className="flex flex-col gap-10">
        <div className="p-1.5 flex flex-row gap-12 flex-2 max-w-20">
          <Logo />
          <h4
            className={`font-lexend font-bold size-[16px] ${
              theme == "dark" ? "text-white" : ""
            }`}
          >
            Hounter
          </h4>
        </div>
        <p className="font-lexend font-regular lg:text-sm md:text-lg text-md text-[#626687] lg:max-w-[50%] w-full leading-6">
          We provide information about properties such as houses, villas and
          apartments to help people find their dream home
        </p>
        <div className="flex flex-row gap-6">
          {[
            { src: "/facebook.webp", link: "/" },
            { src: "/twitter.webp", link: "/" },
            { src: "/instagram.webp", link: "/" },
          ].map((image, index) => (
            <Link key={index} href={image.link}>
              <img
                src={image.src}
                loading="lazy"
                alt="icon"
                className="w-6 h-6"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="md:flex md:flex-row grid grid-cols-2 md:gap-20 gap-5 mt-8 lg:mt-0">
        {[
          {
            header: "Property",
            body: [
              {
                text: "House",
                link: "/#list",
              },
              {
                text: "Apartment",
                link: "/#list",
              },
              {
                text: "Villa",
                link: "/#list",
              },
            ],
          },
          {
            header: "Arcticle",
            body: [
              {
                text: "New Article",
                link: "/#article",
              },
              {
                text: "Popular Article",
                link: "/#article",
              },
              {
                text: "Most Read",
                link: "/#article",
              },
              {
                text: "Tips & Tricks",
                link: "/#article",
              },
            ],
          },
          {
            header: "Contact",
            body: [
              {
                text: "2464 Royal Ln. Mesa, New Jersey 45463",
              },
              {
                text: "(671) 555-0110",
              },
              {
                text: "anishejioov@gmail.com",
              },
            ],
          },
        ].map((column, index) => (
          <div key={index} className="flex flex-col gap-5 font-lexend">
            <h2
              className={`font-bold text-lg ${
                theme == "dark" ? "text-white" : "text-[#0E1735]"
              }`}
            >
              {column.header}
            </h2>
            {column.body.map((body, index) => (
              <Link
                key={index}
                href={body.link != undefined ? body.link : "/"}
                onClick={() =>
                  body.link == "/#link"
                    ? setName(body.text.toLowerCase())
                    : setName(null)
                }
              >
                <p className="font-regular text-sm text-[#888B97]">
                  {body.text}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
