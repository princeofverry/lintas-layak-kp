// import Navbar from "@/components/navbar/navbar";
import LandingPage from "@/components/LandingPage";
import Form from "@/components/form/form";
import Tentang from "@/components/Tentang";
import Statistika from "@/components/Statistika";
import Footer  from "@/components/footer/footer";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <LandingPage />
      <Form />
      <Tentang />
      <Statistika />
      <Footer />
    </div>
  );
}