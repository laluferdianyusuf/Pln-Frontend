import Navbar from "@/app/common/Navbar";
import Link from "next/link";
import Modal from "@/app/common/Modal";
export default function DashboardSurveyor() {
  return (
    <>
      <Navbar />
      <div className="container px-5 mx-auto mt-16">
        <div>
          <p className="mb-5 text-4xl font-bold text-[#002D72] ">
            Lihat Laporan Harian
          </p>
          <div className="flex gap-5">
            <button className="active:text-[#0056FF] focus:text-[#0056FF]">
              Divisi A
            </button>
            <button className="active:text-[#0056FF] focus:text-[#0056FF]  ">
              Divisi B
            </button>
            <button className="active:text-[#0056FF] focus:text-[#0056FF]  ">
              Divisi C
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 grid grid-cols-3 gap-4 mt-14">
        <div className="card card-compact border h-52 w-full shadow-xl flex gap-4 flex-row pl-7 bg-[#007C00] ">
          <figure className="w-1/3">
            <div className="px-14 py-12 border bg-[rgba(25,4,1,.5)] text-white font-extrabold rounded-full text-center">
              R
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Rizkul</h2>
            <p className="text-white font-thin">F1B019026</p>
            <p className="text-white">Devisi C Gardu Induk</p>
            <div className="card-actions justify-end">
              <Modal />
            </div>
          </div>
        </div>
        <div className="card card-compact border  h-52 w-full  shadow-xl flex gap-4 flex-row pl-7 bg-[#0C2240] ">
          <figure className="w-1/3">
            <div className="px-14 py-12 border bg-[rgba(25,4,1,.5)] text-white font-extrabold rounded-full text-center">
              R
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Rizkul</h2>
            <p className="text-white font-thin">F1B019026</p>
            <p className="text-white">Devisi C Gardu Induk</p>
            <div className="card-actions justify-end">
              <Modal />
            </div>
          </div>
        </div>
        <div className="card card-compact border  h-52 w-full  shadow-xl flex gap-4 flex-row pl-7 bg-[#8F0D0D] ">
          <figure className="w-1/3">
            <div className="px-14 py-12 border bg-[rgba(25,4,1,.5)] text-white font-extrabold rounded-full text-center">
              R
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Rizkul</h2>
            <p className="text-white font-thin">F1B019026</p>
            <p className="text-white">Devisi C Gardu Induk</p>
            <div className="card-actions justify-end">
              <Modal />
            </div>
          </div>
        </div>
        <div className="card card-compact border  h-52 w-full  shadow-xl flex gap-4 flex-row pl-7 bg-[#0C2240] ">
          <figure className="w-1/3">
            <div className=" border bg-[rgba(25,4,1,.5)] text-white font-extrabold px-14 py-12 rounded-full text-center">
              R
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title  text-white">Rizkul</h2>
            <p className="text-white font-thin">F1B019026</p>
            <p className="text-white">Devisi C Gardu Induk</p>
            <div className="card-actions justify-end">
              <Modal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
