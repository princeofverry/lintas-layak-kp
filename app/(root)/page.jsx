import Form from "@/components/form/form";
import LandingPage from "@/components/user/LandingPage";
import Statistika from "@/components/user/Statistika";
import Tentang from "@/components/user/Tentang";
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
