import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
export default function DashboardSurveyor() {
  return (
    <>
      <Navbar />
      <div className="flex container mx-auto gap-10">
        <Sidebar />
      </div>
    </>
  );
}
