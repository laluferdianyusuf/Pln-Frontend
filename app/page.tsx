import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Hero from "./common/Hero";
export default function page() {
  return (
    <main className="bg-white">
      <div className="h-screen">
        <Navbar />
        <Hero />
      </div>
      <div className="footer-content">
        <Footer />
      </div>
    </main>
  );
}
