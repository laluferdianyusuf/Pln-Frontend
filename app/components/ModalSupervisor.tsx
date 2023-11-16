"use client";
import { useState, SyntheticEvent } from "react";
import { FiSave } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function ModalSupervisor() {
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickModal = async () => {
    const modal = document.getElementById(
      "modal_supervisor"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  const handleClose = () => {
    const modal = document.getElementById(
      "modal_supervisor"
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };
  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const registerPayload = {
      name: name,
      nip: nip,
      email: email,
      password: password,
      phone_number: phone_number,
      address: address,
    };
    try {
      const requestPayload = await axios.post(
        "http://localhost:1901/v1/api/users/register/supervisor",
        registerPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responsePayload = requestPayload.data;

      if (responsePayload.status_info) {
        handleClose();
        Swal.fire({
          title: "Accepted",
          text: `${responsePayload.message}`,
          icon: "success",
        });
      }
    } catch (error: any) {
      handleClose();
      Swal.fire({
        title: "Failed",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };

  const handleShowPasswords = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <button
        className="py-[6px] rounded-full flex gap-2 text-center md:static right-6 md:right-5 items-center md:py-1 text-gray-400 text-[12px] "
        onClick={handleClickModal}
      >
        <FaUserEdit /> supervisor
      </button>
      <dialog id="modal_supervisor" className="modal overflow-auto ">
        <div className="modal-overlay flex justify-center">
          <div className="modal-box w-[95%] md:w-[600px] max-w-none mt-[30px] mb-[30px] max-h-none rounded-2xl pb-14">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>

            <h3 className="font-black text-3xl pb-5">Supervisor</h3>
            <form
              onSubmit={handleRegister}
              className="bg-[#eff3f8] rounded-2xl flex items-center flex-col md:px-[5rem] px-1 py-5 gap-4"
            >
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Nama</p>
                <input
                  type="text"
                  className="w-[80%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Nip</p>
                <input
                  type="text"
                  className="w-[80%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                  placeholder="Nip"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                />
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Email</p>
                <input
                  type="text"
                  className="w-[80%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex w-[90%] gap-3 relative">
                <p className="w-1/5 py-1 text-[14px]">Password</p>
                <span className="flex justify-between w-[80%] ">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="w-[85%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={handleShowPasswords}
                    type="button"
                    className="bg-white px-2 rounded-lg"
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </span>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Phone</p>
                <input
                  type="text"
                  className="w-[80%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Address</p>
                <input
                  type="text"
                  className="w-[80%] py-1 px-3 rounded-lg bg-white focus:border-[none] outline-none"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex w-[90%] gap-3 justify-end">
                <button
                  className="flex items-center w-[170px] justify-between bg-[#393E46] rounded-xl px-5 py-1 text-white"
                  type="submit"
                >
                  <FiSave />
                  <p className="font-thin">Save</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
