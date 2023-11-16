"use client";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const loginPayload = {
      email: email,
      password: password,
    };
    try {
      const requestPayload = await axios.post(
        "http://localhost:1901/v1/api/users/login",
        loginPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responsePayload = requestPayload.data;

      if (responsePayload.status_info) {
        router.push("/dashboard/supervisor");
        localStorage.setItem("token", responsePayload.data.token);
        toast.success(`${responsePayload.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleShowPasswords = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form action="" className="mt-3 w-[90%] " onSubmit={handleLogin}>
        <div className="mb-6 grid ">
          <input
            type="text"
            className=" bg-[transparent] border-b-2 border-[rgba(0,0,0,.25)] w-full p-2 focus:border-[none] outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="flex relative w-full">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className=" bg-[transparent] border-b-2 border-[rgba(0,0,0,.25)] w-full p-2 focus:border-[none] outline-none "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleShowPasswords}
              type="button"
              className="bg-transparent px-2 rounded-lg absolute right-0 bottom-0 top-0"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </span>
        </div>
        <div>
          <button
            className="w-full bg-[#292D32] py-2 rounded-lg mb-3 text-white"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}
