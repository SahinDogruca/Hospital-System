import Aboutme from "@/components/Aboutme";
import DoctorCarousel from "@/components/DoctorCarousel";
import FirmCarousel from "@/components/FirmCarousel";
import Header from "@/components/Header";
import Infos from "@/components/Infos";
import { getAll } from "@/utils/db";
import { useEffect } from "react";

export default function Home({ doctors }) {
  return (
    <>
      <Header />
      <Aboutme />
      <DoctorCarousel doctors={doctors} />
      <Infos doctorsLength={doctors.length} />
      <FirmCarousel />
    </>
  );
}

export async function getServerSideProps() {
  const doctors = await getAll("doctors");

  return {
    props: {
      doctors,
    },
  };
}
