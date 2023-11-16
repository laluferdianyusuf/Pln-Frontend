"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DataCard from "./DataCard";
import ModalUser from "./ModalUser";

// ... (existing imports)

interface DataProps {
  id: number;
  name: string;
  nip: string;
  division: string;
  status: string;
}

export default function CardMonthly() {
  const [data, setData] = useState<DataProps[]>([]);
  const [activeDivision, setActiveDivision] = useState("A");
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(1); // Set the day to 1
    return currentDate;
  });

  useEffect(() => {
    fetchData(selectedDate, activeDivision);
  }, [selectedDate, activeDivision]);

  const handleDateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDateString = event.target.value;
    const selectedDate = new Date(selectedDateString);
    setSelectedDate(selectedDate);
  };

  const handleDivisionChange = (division: string) => {
    setActiveDivision(division);
  };

  const fetchData = async (selectedDate: Date, division: string) => {
    try {
      const formattedDate = selectedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const response = await axios.get(
        `http://localhost:1901/v1/api/created/${formattedDate}/division/${division}`,
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

  const generateDateOptions = () => {
    const options = [];
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Makassar",
      });

      options.push({
        label: formattedDate,
        value: date.toISOString(),
      });
    }

    return options;
  };

  return (
    <>
      <div className="md:pl-3 px-3 mt-20 md:mt-28 w-full md:ml-[20rem] ">
        <div className="flex flex-col md:flex-row gap-3 md:justify-between">
          <div className="flex gap-2 items-center md:justify-normal justify-between md:h-[24px]">
            <p>Laporan Bulanan</p>
            <div className="dropdown">
              <select
                className="select w-full max-w-xs bg-transparent"
                id="dateDropdown"
                value={selectedDate.toISOString()}
                onChange={handleDateChange}
              >
                {generateDateOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
              onClick={() => handleDivisionChange("A")}
            >
              Divisi A
            </button>
            <button
              className={`${
                activeDivision === "B" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full `}
              onClick={() => handleDivisionChange("B")}
            >
              Divisi B
            </button>
            <button
              className={`${
                activeDivision === "C" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full`}
              onClick={() => handleDivisionChange("C")}
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
