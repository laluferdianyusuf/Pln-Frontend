import LoginForm from "./components/LoginForm";
export default function page() {
  return (
    <>
      <div className=" bg-[#00AFEF]  md:px-20 md:h-screen md:py-0 py-[98px] px-5 flex justify-center">
        <div className="shadow-lg shadow-[#79CBD7] h-[80%] self-center rounded-[20px] overflow-hidden bg-[#FFF200] md:flex gap-9 md:w-[70%]">
          <div className="pl-12 flex flex-col items-center justify-center">
            <p className="text-4xl md:text-6xl font-extrabold text-center leading-[3rem] md:leading-[4rem] ">
              Hallo, Supervisor
            </p>
            <p className="font-bold px-4 text-center mt-3 pb-3 md:pb-0">
              Masuk ke akun anda sekarang juga
            </p>
            <LoginForm />
          </div>
          <img src="/login.png" alt="" className="w-auto hidden md:block" />
        </div>
      </div>
    </>
  );
}
