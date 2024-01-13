/* eslint-disable @next/next/no-img-element */
import Vector from "@/details/vector1";
import Yellow from "@/details/yellow";
import { Checkbox, Button } from "@material-tailwind/react";
import { useState, useRef } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password3, setPassword3] = useState("");
  const [showPassword3, setShowPassword3] = useState(false);

  const [password4, setPassword4] = useState("");
  const [showPassword4, setShowPassword4] = useState(false);

  const [isError1, setIsError1] = useState(false);
  const password1 = useRef(null);
  const password2 = useRef(null);

  const router = useRouter();

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const togglePasswordVisibility4 = () => {
    setShowPassword4(!showPassword4);
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const ref1 = useRef(null);
  const inView1 = useInView(ref1);

  const ref2 = useRef(null);
  const inView2 = useInView(ref2);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange3 = (e) => {
    setPassword3(e.target.value);
  };

  const handlePasswordChange4 = (e) => {
    setPassword4(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(email, password4);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (e) {
      setIsError(true);
      setError(e.message);
      setTimeout(() => {
        setIsError(false);
        setError("");
      }, 4000);
    } finally {
      setEmail("");
      setPassword4("");
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="absolute left-64 bottom-[60vh]">
        <Vector />
      </div>
      <div className="absolute left-[38vw] bottom-[94vh]">
        <Vector />
      </div>
      <motion.div
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
          You have signed up successfully!
        </p>
      </motion.div>
      <motion.div
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
      </motion.div>
      <div className="w-[460px] h-auto px-8 pl-12 pt-10 pb-14 self-center mx-auto bg-[#D1FAE5] mt-[14%] text-center shadow-lg rounded-[16px]">
        <div className="w-32 mb-6 mx-auto">
          <h2 className="font-lexend font-bold text-[30px] text-[#047857] mb-1">
            Sign Up
          </h2>
          <img alt="svg" src="/line.svg" className="mx-auto w-full" />
        </div>
        <input
          type="email"
          placeholder="Your email: "
          className="w-80 h-12 rounded-lg mb-[15px] pl-[10px]"
          onChange={handleEmailChange}
        />
        <div className="flex flex-row relative left-8">
          <input
            ref={password1}
            type={showPassword3 ? "text" : "password"}
            value={password3}
            placeholder="Password: "
            className={`w-80 h-12 rounded-lg mb-[15px] pl-[10px] focus:shadow-lg hover:shadow-md ${
              isError1 ? "ring-red-500 ring-offset-1 ring-[2px]" : ""
            }`}
            onChange={handlePasswordChange3}
            onBlur={(event) => {
              event.target.value == password2.current.value ||
              password2.current.value == ""
                ? setIsError(false)
                : setIsError(true);
            }}
          />
          <div className="flex flex-col">
            <Checkbox
              color="green"
              ripple={true}
              onChange={togglePasswordVisibility3}
              className=""
              label={
                <p className="font-lexend font-normal text-[#047857] text-[16px] mr-3">
                  {showPassword3 ? "hide" : "show"}
                </p>
              }
            />
          </div>
        </div>
        <div className="flex flex-row relative left-8">
          <input
            ref={password2}
            type={showPassword4 ? "text" : "password"}
            value={password4}
            placeholder="One more time: "
            className={`w-80 h-12 rounded-lg mb-[25px] pl-[10px] focus:shadow-lg hover:shadow-md ${
              isError1 ? "ring-red-500 ring-offset-1 ring-[2px]" : ""
            }`}
            onChange={handlePasswordChange4}
            onBlur={(event) => {
              event.target.value == password1.current.value
                ? setIsError1(false)
                : setIsError1(true);
            }}
          />
          <div className="flex flex-col">
            <Checkbox
              color="green"
              ripple={true}
              onChange={togglePasswordVisibility4}
              label={
                <p className="font-lexend font-normal text-[#047857] text-[16px] mr-3">
                  {showPassword4 ? "hide" : "show"}
                </p>
              }
            />
          </div>
        </div>
        <Button
          className="w-80 h-12 bg-[#10B981] rounded-md font-lexend font-semibold text-gray-50 hover:shadow-lg active:bg-[#118C63]"
          onClick={handleSubmit}
          disabled={password4.length > 0 ? false : true}
        >
          Sign Up
        </Button>
        <p className="font-lexend font-normal text-[#047857] text-[14px] mt-4">
          If you are already signed up
          <Link href="/sign-in">
            <span>{" ' click here '"}</span>
          </Link>
        </p>
      </div>
      <div className="absolute left-[110vw] top-[22vh]">
        <Yellow />
      </div>
    </div>
  );
}
