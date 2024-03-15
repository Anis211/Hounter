/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import { Checkbox, Button } from "@material-tailwind/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/clientApp";
import { getDoc, doc } from "firebase/firestore";
import { m, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUser from "@/details/user";

export default function SignIn() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const setUser = useUser((state) => state.setUser);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const theme = useUser((state) => state.theme);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ref1 = useRef(null);
  const inView1 = useInView(ref1);

  const ref2 = useRef(null);
  const inView2 = useInView(ref2);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(email, password);

      const user = auth.currentUser;
      const id = user.uid;
      const res = await getDoc(doc(firestore, "Users", id));

      if (res.data() == undefined) {
        throw new Error("The user is not registered (try to sign up first)");
      } else {
        await setUser(id);

        setIsSuccess(true);
        setTimeout(() => {
          router.push(`/account?id=${id}`);
        }, 1000);
      }
    } catch (e) {
      setIsError(true);
      setError(e.message);

      setTimeout(() => {
        setIsError(false);
        setError("");
      }, 4000);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      className={`w-full h-[80vh] flex overflow-hidden ${
        theme != "dark" ? "" : "bg-[#10274F]"
      }`}
    >
      <div className="absolute left-64 bottom-[60vh]">
        <Vector />
      </div>
      <div className="absolute left-[38vw] bottom-[94vh]">
        <Vector />
      </div>
      <m.div
        ref={ref1}
        initial={{ opacity: 0, y: -60 }}
        animate={inView1 ? { opacity: [0, 0.5, 1], y: [-60, 0, 0] } : {}}
        transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
        className={`px-6 py-2 pt-3 rounded-lg bg-[#D1FAE5] h-[80px] ml-7 mt-7 absolute ${
          isSuccess ? "visible" : "hidden"
        }`}
      >
        <h2 className="font-lexend font-semibold text-[#047857] text-[20px]">
          Success
        </h2>
        <p className="font-lexend font-semibold text-[#047857] text-[14px]">
          You have signed in successfully!
        </p>
      </m.div>
      <m.div
        ref={ref2}
        initial={{ opacity: 0, y: -60 }}
        animate={inView2 ? { opacity: [0, 0.5, 1], y: [-60, 0, 0] } : {}}
        exit={{ opacity: [1, 0.5, 0], y: [0, -60, -60] }}
        transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
        className={`px-6 py-2 pt-3 rounded-lg bg-red-400 h-[80px] ml-7 mt-7 absolute ${
          isError ? "visible" : "hidden"
        } `}
      >
        <h2 className="font-lexend font-semibold text-gray-50 text-[20px]">
          Error
        </h2>
        <p className="font-lexend font-semibold text-gray-50 text-[14px]">
          {error}
        </p>
      </m.div>
      <div className="2xl:w-[30vw] w-full lg:w-[60vw] md:w-[60vw] h-auto px-8 pt-10 pb-14 self-center mx-auto bg-[#D1FAE5] mt-[10%] text-center shadow-lg rounded-[16px] z-10">
        <div className="w-32 mb-6 mx-auto">
          <h2 className="font-lexend font-bold xl:text-[30px] text-2xl text-[#047857] mb-1">
            Sign In
          </h2>
        </div>
        <input
          type="email"
          placeholder="Email: "
          value={email}
          className="2xl:w-80 w-[90%] md:w-[80%] lg:w-[70%] h-12 rounded-lg mb-[15px] pl-[10px] focus:shadow-lg hover:shadow-md "
          onChange={handleEmailChange}
        />
        <div className="flex flex-row relative xl:left-9 left-[5%] md:left-[10%] lg:left-[15%]">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Your password: "
            className="2xl:w-80 lg:w-[60%] h-12 rounded-lg mb-[25px] pl-[10px]"
            onChange={handlePasswordChange}
          />
          <div className="flex flex-col">
            <Checkbox
              color="green"
              ripple={true}
              onChange={togglePasswordVisibility}
              className=""
              label={
                <p className="font-lexend font-normal text-[#047857] text-[16px] mr-2">
                  {showPassword ? "hide" : "show"}
                </p>
              }
            />
          </div>
        </div>
        <Button
          className="2xl:w-80 w-[90%] md:w-[80%] lg:w-[70%] h-12 bg-[#10B981] rounded-md font-lexend font-semibold text-gray-50 hover:shadow-lg active:bg-[#118C63]"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <p className="font-lexend font-normal text-[#047857] text-[14px] mt-4">
          If you are not signed up
          <Link href="/sign-up">
            <span>{" ' click here '"}</span>
          </Link>
        </p>
      </div>
      <div className="fixed left-[105vw] top-[60vh]">
        <Yellow />
      </div>
    </div>
  );
}
