import Form from "@/components/form/form";
import LandingPage from "@/components/LandingPage";
import Statistika from "@/components/Statistika";
import Tentang from "@/components/Tentang";
import React from "react";

function Home() {
  return (
    <>
      <LandingPage />
      <Form />
      <Tentang />
      <Statistika />
    </>
  );
}

export default Home;
