"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DataCard from "./DataCard";
import ModalUser from "./ModalUser";

interface DataProps {
  id: number;
  name: string;
  nip: string;
  division: string;
  status: string;
}

export default function CardWeekly() {
  const [data, setData] = useState<DataProps[]>([]);
  const [activeDivision, setActiveDivision] = useState("A");
  const [selectedDay, setSelectedDay] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleDateChange = async (day: string) => {
    try {
      setSelectedDay(day);
      const response = await axios.get(
        ` http://localhost:1901/v1/api/day/${day}/division/${activeDivision}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );

      console.log(response);

      if (response.data.status_info) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data from API: ", error);
    }
  };

  useEffect(() => {
    handleDateChange("Monday");
  }, [activeDivision]);

  return (
    <>
      <div className="md:pl-3 px-3 mt-20 md:mt-28 w-full md:ml-[20rem]">
        <div className="flex flex-col md:flex-row gap-3 md:justify-between">
          <div className="flex gap-2 items-center md:justify-normal justify-between md:h-[24px]">
            <p>Laporan Mingguan</p>
            <div className="dropdown">
              <select
                className="select w-full max-w-xs bg-transparent"
                id="dateDropdown"
                value={selectedDay}
                onChange={(e) => handleDateChange(e.target.value)}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 md:gap-5">
            <button
              className={`${
                activeDivision === "A" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-3 md:px-0 py-[1px] text-gray-400 rounded-full`}
              onClick={() => setActiveDivision("A")}
            >
              Divisi A
            </button>
            <button
              className={`${
                activeDivision === "B" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full `}
              onClick={() => setActiveDivision("B")}
            >
              Divisi B
            </button>
            <button
              className={`${
                activeDivision === "C" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full`}
              onClick={() => setActiveDivision("C")}
            >
              Divisi C
            </button>
            <ModalUser />
          </div>
        </div>
        {data && data.length > 0 && <DataCard data={data} />}
      </div>
    </>
  );
}
