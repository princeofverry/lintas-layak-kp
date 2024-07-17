'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import ilustrasi from "/public/images/tampilanloginadmin.png";
import Image from "next/image";
import Link from 'next/link';

const AdminPage = () => {
  return <div className="bg-[#A6CEEE] w-screen h-screen fixed overflow-clip">
    <div className="w-[500px] h-[500px] bg-[#2185D5] absolute z-0 -mt-60 -ml-56 rounded-full"></div>
    <div className="w-[300px] h-[300px] bg-[#2185D5] absolute z-0 mx-[350px] my-[550px] rounded-full"></div>
    <div className="w-[1000px] h-[800px] bg-[#2185D5] absolute z-0 mx-[500px] my-[300px]"></div>
    {/* <div className="w-[10px] h-[10px] bg-[#2185D5] absolute z-0 mx-[500px] my-[10px] bg-gradient-to-r from-[#2185D5] to-transparent rounded-full"></div> */}
    <div className="flex relative">
      <div className="bg-[#F3F3F3] mx-auto my-[110px] w-[1000px] h-[520px] rounded-lg flex justify-center">
        <div className="flex flex-row justify-center px-8">
          <Image src={ilustrasi} alt="Ilustrasi Login" className="w-10/12 m-auto" />
          <div>
            <h1 className="font-bold text-3xl text-[#3A4750] mt-20 mb-3">
              Selamat Datang Kembali !
            </h1>
            <p className="font-light text-sm text-[#3A4750] mb-8">
              Silahkan login ke akun Anda untuk melanjutkan.
            </p>
            <div>
              <input placeholder="Username" type="text" id="username"
                className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-5" />
              <input placeholder="Email" type="text" id="email"
                className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-5" />
              <input placeholder="Password" type="password" id="password"
                className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-7 " />
              <div className="flex justify-center ">
                <Link href="/admin/dashboard_admin">
                  <Button className="bg-[#2185D5] font-bold px-11 hover:bg-[#235985]">LOGIN</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default AdminPage;
