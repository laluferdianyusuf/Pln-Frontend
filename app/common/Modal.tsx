"use client";
import { MdAccessTimeFilled } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
export default function Modal() {
  const handleClickModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  const handleClose = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <button
        className="bg-[#0093AD] px-3 py-1 rounded-lg text-white"
        onClick={handleClickModal}
      >
        Cek Laporan
      </button>
      <dialog id="my_modal_3" className="modal overflow-auto ">
        <div className="modal-overlay ">
          <div className="modal-box w-11/12 max-w-3xl mt-[30px] mb-[30px] max-h-none rounded-2xl pb-14">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>

            <h3 className="font-black text-3xl pb-5">Cek Laporan</h3>
            <div className="bg-[#EEE] rounded-2xl flex items-center flex-col px-[60px] py-5 gap-4">
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1">Nama</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">Nama</p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1">Nip</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">
                  F1B019026
                </p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1">Divisi</p>
                <p className="w-[80%] py-1 px-3 rounded-lg bg-white">
                  C Gardu Induk
                </p>
              </div>
              <div className="flex w-[90%] gap-3">
                <p className="w-1/5 py-1">Foto</p>
                <div className="w-[80%] py-3 px-3 rounded-lg bg-white">
                  <img
                    src="/laporan.png"
                    alt=""
                    className="h-[180px] mb-4 w-full rounded-md"
                  />
                  <div className="flex items-center gap-4">
                    <span className="w-16">
                      <MdAccessTimeFilled />
                    </span>
                    <p>Time</p>
                  </div>
                </div>
              </div>
              <div className="flex w-[90%] gap-3 ">
                <p className="w-1/5 py-1 pr-6 ">Deskripsi Kegiatan</p>
                <p className="w-[80%] py-3 px-5 rounded-lg bg-white h-[150px] text-justify overflow-y-auto">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem eligendi natus nostrum provident quas.
                </p>
              </div>
              <div className="flex w-[90%] gap-3 justify-end">
                <button className="flex items-center w-[170px] justify-between bg-[#393E46] rounded-md px-2 py-1 text-white">
                  <FiSave />
                  <p className="font-thin">Terima</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
