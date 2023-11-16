/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

interface DataItem {
  image: string;
  createdAt: string;
  description: string;
  type: string;
}

interface DataProps {
  id: number;
  name: string;
  nip: string;
  division: string;
  status: string;
}
interface ModalProps {
  item: DataProps;
}

export default function Modal({ item }: ModalProps) {
  const [data, setData] = useState<DataItem | undefined>(undefined);
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(!modal);
    fetchData(item.id);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const fetchData = async (createdById: number | undefined) => {
    try {
      const response = await axios.get(
        `http://localhost:1901/v2/api/search/${createdById}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      if (response.data.status_info) {
        if (item.status !== "alpha") {
          setData(response.data.data);
        }
      } else {
        console.error("Request success but status_info is false");
      }
    } catch (error) {
      console.error("Error during fetchData:", error);
    }
  };

  const handleAccept = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      const requestPayload = await axios.put(
        `http://localhost:1901/v1/api/update/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responsePayload = requestPayload.data;

      if (responsePayload.status_info) {
        handleCloseModal();
        Swal.fire({
          title: "Accepted",
          text: `${responsePayload.message}`,
          icon: "success",
        });
      }
    } catch (error: any) {
      handleCloseModal();
      Swal.fire({
        title: "Failed",
        text: `${error.response.data.message}`,
        icon: "error",
      });
    }
  };

  const getColor = (status: string | undefined) => {
    if (status === "alpha") {
      return "#F97444";
    } else if (status === "waiting") {
      return "#0C2240";
    } else {
      return "#007C00";
    }
  };
  const getBackgroundColor = (status: string | undefined) => {
    if (status === "alpha") {
      return "#FEDDC7";
    } else if (status === "waiting") {
      return "#EAD6FD";
    } else {
      return "#5cb85c33";
    }
  };

  const updateColor = (status: string | undefined) => {
    return getColor(status);
  };
  const updateBackgroundColor = (status: string | undefined) => {
    return getBackgroundColor(status);
  };

  return (
    <>
      <button
        className="uppercase flex items-center justify-center py-1 rounded-lg  w-[2.5rem] h-[2.5rem] text-[1.25rem] "
        style={{
          backgroundColor: updateBackgroundColor(item.status),
          color: updateColor(item.status),
        }}
        onClick={handleOpenModal}
      >
        {item.name ? item.name.slice(0, 1) : ""}
      </button>

      <input
        type="checkbox"
        checked={modal}
        className="modal-toggle"
        onChange={handleOpenModal}
      />
      <div id="modal_item " className="modal overflow-auto " key={item.id}>
        <div className="modal-overlay flex justify-center">
          <div className="modal-box w-[98%] md:w-[700px] max-w-none mt-[30px] mb-[30px] max-h-none rounded-2xl pb-14">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleOpenModal}
            >
              ✕
            </button>

            <h3 className="font-black text-3xl pb-5">Cek Laporan</h3>
            <div className="bg-[#eff3f8] rounded-2xl flex items-center flex-col px-1 md:px-[5rem] py-5 gap-4">
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Nama</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">
                  {item.name}
                </p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Nip</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">
                  {item.nip}
                </p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Divisi</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">
                  Divisi {item.division}
                </p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1 text-[14px]">Foto</p>
                <div className="w-[80%] py-3 px-3 rounded-lg bg-white">
                  {data ? (
                    <img
                      src={data && data.image}
                      alt=""
                      className="h-[110px] w-[220px] md:h-[200px] mb-4 md:w-[500px] rounded-md"
                    />
                  ) : (
                    <div className="rounded-md flex flex-col items-center justify-center">
                      <img
                        src="/no-image.png"
                        alt=""
                        className="md:w-[150px] mb-4 rounded-md"
                      />
                      <p>No Image</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] md:text-[14px] ">
                      <MdAccessTimeFilled />
                    </span>
                    <p className="text-[10px] md:text-[14px] ">
                      {data ? data.createdAt : "Time"}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-[90%] gap-3 ">
                <p className="w-1/5 py-1 pr-6 text-[14px] ">
                  Deskripsi Kegiatan
                </p>
                <p className="w-[80%] py-3 px-5 rounded-lg bg-white h-[100px] md:h-[150px] text-justify overflow-y-auto">
                  {data ? data.description : "No Descriptions"}
                </p>
              </div>
              <div className="flex w-[90%] gap-3 justify-end">
                <button
                  className="flex items-center w-[170px] justify-between bg-[#393E46] rounded-xl px-3 py-1 text-white"
                  onClick={() => handleAccept(item.id)}
                  disabled={data && data.type !== "HARIAN"}
                >
                  <FiSave />
                  <p className="font-thin">Terima</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
