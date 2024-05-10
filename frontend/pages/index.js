import Aboutme from "@/components/Aboutme";
import DoctorCarousel from "@/components/DoctorCarousel";
import FirmCarousel from "@/components/FirmCarousel";
import Header from "@/components/Header";
import Infos from "@/components/Infos";

export default function Home() {
  return (
    <>
      <Header />
      <Aboutme />
      <DoctorCarousel />
      <Infos />
      <FirmCarousel />
    </>
  );
}
