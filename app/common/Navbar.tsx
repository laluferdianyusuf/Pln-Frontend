import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" navbar text-white pt-5 ">
      <div className="navbar bg-base-100 flex justify-between container mx-auto px-5">
        <div className="flex gap-4">
          <img src="/logo.png" alt="" className="w-16" />
          <p className="text-2xl font-bold">E-Lapor</p>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <details>
                <summary style={{ color: "#FFF200" }}>Dashboard </summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li className="pr-3">
              <Link href="/login">Kinerja</Link>
            </li>
            <li>
              <button
                className="py-2 px-5 rounded-md text-white"
                style={{ background: "#F2884B" }}
              >
                <Link href="/login">Login</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
