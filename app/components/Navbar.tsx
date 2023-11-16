"use client";
import { MdEmail } from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { FaAddressCard, FaUserTie } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import ModalSupervisor from "./ModalSupervisor";

interface User {
  id: number;
  name: string;
  nip: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        const requestPayload = await axios.get(
          "http://localhost:1901/v1/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responsePayload = requestPayload.data;

        if (responsePayload) {
          setUser(responsePayload.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    validateLogin();
  }, []);

  return (
    <>
      <div className=" navbar fixed z-10 bg-white text-black p-0 shadow-lg">
        <div className="navbar flex justify-end md:justify-between container mx-auto px-5">
          <button className="md:flex gap-4 hidden">
            <img src="/logo.png" alt="" className="w-12 rounded-lg" />
            <p className="text-2xl font-bold">E-Lapor</p>
          </button>

          <div className="">
            <p className="text-[12px] md:text-[14px] capitalize pr-2">
              Hi, {user?.role}{" "}
            </p>
            <details className="dropdown  ">
              <summary className=" btn rounded-full w-12 h-10 md:w-14 md:h-14 bg-[#EAD6FD]">
                {user && user?.name.slice(0, 1)}{" "}
              </summary>

              <ul className="p-5 leading-7 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[20rem] right-0">
                <div>
                  <div className="leading-5 pb-2">
                    <div className="flex justify-between">
                      <p className="text-[12px] text-gray-400">Name</p>
                      <p className="text-[green] text-[10px] bg-[#5cb85c33] py-0 px-3 rounded-full">
                        {user?.role}{" "}
                      </p>
                    </div>
                    <span className="flex gap-3 items-center">
                      <FaUserTie />
                      <p>{user?.role} </p>
                    </span>
                  </div>
                  <div className="leading-5 pb-2">
                    <p className="text-[12px] text-gray-400">Email</p>
                    <span className="flex gap-3 items-center">
                      <MdEmail />
                      <p>{user?.email} </p>
                    </span>
                  </div>
                  <div className="leading-5 pb-2">
                    <p className="text-[12px] text-gray-400">Phone number</p>
                    <span className="flex gap-3 items-center">
                      <BsFillPhoneFill />
                      <p>{user?.phone_number} </p>
                    </span>
                  </div>
                  <div className="leading-5 pb-2">
                    <p className="text-[12px] text-gray-400">Address</p>
                    <span className="flex gap-3 items-center">
                      <FaAddressCard />
                      <p>{user?.address} </p>
                    </span>
                  </div>
                  <div className=" flex justify-end h-[20px] ">
                    <ModalSupervisor />
                  </div>
                </div>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
