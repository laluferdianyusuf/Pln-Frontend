import Link from "next/link";
export default function Login() {
  return (
    <>
      <div className="h-screen bg-[#00AFEF] px-20 py-10 flex justify-center">
        <div className="shadow-lg shadow-[#79CBD7] h-full rounded-[20px] overflow-hidden bg-[#FFF200] flex space-between w-[80%] ">
          <div className="p-10 flex flex-col items-center justify-center">
            <p className=" text-6xl font-extrabold text-center leading-[4rem] ">
              Hallo, Supervisor
            </p>
            <p className="font-bold mt-3">Masuk ke akun anda sekarang juga</p>
            <form action="" className="mt-3 w-[90%] ">
              <div className="mb-6 grid justify-items-center">
                <input
                  type="text"
                  className=" bg-[transparent] border-b-2 border-[rgba(0,0,0,.25)] w-full p-2 focus:border-[none] outline-none"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className=" bg-[transparent] border-b-2 border-[rgba(0,0,0,.25)] w-full p-2 focus:border-[none] outline-none "
                  placeholder="Password"
                />
              </div>
              <div>
                <button className="w-full bg-[#292D32] py-2 rounded-lg mb-3 text-white">
                  <Link href={"/dashboard/supervisor"}>Sign In</Link>
                </button>
                <button className="w-full bg-[#F3F1F1] border-2 border-[#292D32] py-2 rounded-md mb-3">
                  Sign In With Google
                </button>
              </div>
            </form>
          </div>
          <img src="/login.png" alt="" className="w-auto" />
        </div>
      </div>
    </>
  );
}
