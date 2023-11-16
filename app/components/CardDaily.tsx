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

export default function CardDaily() {
  const [data, setData] = useState<DataProps[]>([]);
  const [activeDivision, setActiveDivision] = useState("A");

  const handleDivisionClick = async (division: string) => {
    try {
      setActiveDivision(division);
      const requestPayload = await axios.get(
        `http://localhost:1901/v1/api/users/${division}`,
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

  // ...

  const fetchDataPeriodically = async () => {
    try {
      const requestPayload = await axios.get(
        `http://localhost:1901/v1/api/users/${activeDivision}`,
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

  useEffect(() => {
    handleDivisionClick(activeDivision);
    const intervalId = setInterval(() => {
      fetchDataPeriodically();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeDivision]);

  return (
    <>
      <div className="md:pl-3 px-3 mt-20 md:mt-28 w-full md:ml-[20rem] ">
        <div className="flex flex-col md:flex-row gap-3 md:justify-between md:h-[24px]">
          <p>Laporan Harian</p>

          <div className="flex gap-2 md:gap-5">
            <button
              className={`${
                activeDivision === "A" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-3 md:px-0 py-[1px] text-gray-400 rounded-full`}
              onClick={() => handleDivisionClick("A")}
            >
              Divisi A
            </button>
            <button
              className={`${
                activeDivision === "B" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full `}
              onClick={() => handleDivisionClick("B")}
            >
              Divisi B
            </button>
            <button
              className={`${
                activeDivision === "C" ? "valid:text-[#00AEEF]" : ""
              } bg-[#eeeeee] md:bg-transparent px-4 md:px-0 py-[1px] text-gray-400 rounded-full`}
              onClick={() => handleDivisionClick("C")}
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
