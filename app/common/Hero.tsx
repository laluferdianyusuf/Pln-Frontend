export default function Hero() {
  return (
    <>
      <div className="hero pt-16 bg-white w-full">
        <div className="hero-content flex-col lg:flex-row-reverse pb-6">
          <img src="content1.png" className="max-w-sm rounded-lg shadow-2xl" />
          <div className="w-1/2">
            <h1 className="text-7xl font-bold" style={{ color: "#0C2240" }}>
              E-Lapor
            </h1>
            <p
              className="py-6 text-4xl pr-10 mr-10 font-bold"
              style={{ color: "#1E1E1E" }}
            >
              Selamat Datang di E-Lapor: Solusi Terbaik untuk Manajemen Tugas
              dan Kinerja PLN
            </p>
            <button
              className="py-2 px-5 rounded-md text-white"
              style={{ background: "#0C2240" }}
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </div>
      <div className="hero"></div>
    </>
  );
}
