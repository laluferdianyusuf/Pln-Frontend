"use client";
import { SyntheticEvent, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import {
  BsCalendar2Day,
  BsCalendar2Week,
  BsCalendar2Month,
} from "react-icons/bs";
import CardDaily from "./CardDaily";
import CardWeekly from "./CardWeekly";
import CardMonthly from "./CardMonthly";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CustomButtonProps {
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  selected,
  onClick,
  children,
}) => (
  <button
    className={`ml-2 mt-2 flex items-center gap-3 text-[14px] w-full p-2 ${
      selected ? "valid:text-[#0093AD]" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function Sidebar() {
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [data, setData] = useState([]);
  const router = useRouter();

  const dailyHandler = async () => {
    setDaily(true);
    setWeekly(false);
    setMonthly(false);
    setSelectedIndex(1);
    await searchType("HARIAN");
  };
  const weeklyHandler = async () => {
    setDaily(false);
    setWeekly(true);
    setMonthly(false);
    setSelectedIndex(2);
    await searchType("MINGGUAN");
  };
  const monthlyHandler = async () => {
    setDaily(false);
    setWeekly(false);
    setMonthly(true);
    setSelectedIndex(3);
    await searchType("BULANAN");
  };

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/");
  };

  const searchType = async (reportType: string) => {
    try {
      const requestPayload = await axios.get(
        `http://localhost:1901/v1/api/find/${reportType}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );
      const response = requestPayload.data;
      console.log(response);
      if (response.status_info) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data from API: ", error);
    }
  };

  return (
    <>
      <div className="mt-28 w-[300px] sidebar overflow-y-auto hidden bg-white rounded-2xl py-4 px-6 shadow-md md:fixed md:block">
        <div>
          <h4 className="text-gray-400">Home</h4>
          <CustomButton onClick={dailyHandler} selected={selectedIndex === 1}>
            <BiHomeAlt />
            Dashboard
          </CustomButton>
        </div>
        <div className="mt-4">
          <h4 className="text-gray-400">Kelola Data</h4>
          <CustomButton onClick={dailyHandler} selected={selectedIndex === 1}>
            <BsCalendar2Day />
            Harian
          </CustomButton>
          <CustomButton onClick={weeklyHandler} selected={selectedIndex === 2}>
            <BsCalendar2Week />
            Mingguan
          </CustomButton>
          <CustomButton onClick={monthlyHandler} selected={selectedIndex === 3}>
            <BsCalendar2Month />
            Bulanan
          </CustomButton>
        </div>
        <div className="mt-4">
          <h4 className="text-gray-400">Akun</h4>
          <button
            className="ml-2 mt-2 flex items-center justify-between gap-3 rounded-md px-2 text-[14px] w-full p-2 hover:text-[#F97444] "
            onClick={handleLogout}
          >
            <p>Logout</p>
            <IoIosLogOut />
          </button>
        </div>
      </div>
      <div className="drawer z-50 fixed md:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="drawer-button flex gap-4 items-center absolute top-[10px] left-[15px] cursor-pointer"
          >
            <img src="/logo.png" alt="" className="w-8 md:w-12 rounded-lg" />
            <p className="md:text-2xl font-bold">E-Lapor</p>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="flex gap-4 items-center py-4">
              <img src="/logo.png" alt="" className="w-12 rounded-lg" />
              <p className="text-2xl font-bold">E-Lapor</p>
            </div>
            <div className="mt-8 rounded-2xl py-4 px-6">
              <div>
                <h4 className="text-gray-400">Home</h4>
                <CustomButton
                  onClick={dailyHandler}
                  selected={selectedIndex === 1}
                >
                  <BiHomeAlt />
                  Dashboard
                </CustomButton>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400">Kelola Data</h4>
                <CustomButton
                  onClick={dailyHandler}
                  selected={selectedIndex === 1}
                >
                  <BsCalendar2Day />
                  Harian
                </CustomButton>
                <CustomButton
                  onClick={weeklyHandler}
                  selected={selectedIndex === 2}
                >
                  <BsCalendar2Week />
                  Mingguan
                </CustomButton>
                <CustomButton
                  onClick={monthlyHandler}
                  selected={selectedIndex === 3}
                >
                  <BsCalendar2Month />
                  Bulanan
                </CustomButton>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400">Akun</h4>
                <button
                  className="ml-2 mt-2 flex items-center justify-between gap-3 rounded-md px-2 text-[14px] w-full p-2 hover:text-[#F97444] "
                  onClick={handleLogout}
                >
                  <p>Logout</p>
                  <IoIosLogOut />
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
      {daily && <CardDaily />}
      {weekly && <CardWeekly />}
      {monthly && <CardMonthly />}
    </>
  );
}
