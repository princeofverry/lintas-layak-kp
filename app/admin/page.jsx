'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ilustrasi from "/public/images/tampilanloginadmin.png";

const AdminPage = () => {
  const [username, setUsername] = useState(''); // Renamed from `name` to `username`
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Renamed to `username`
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        // Login berhasil, arahkan ke halaman dashboard
        router.push('/admin/dashboard_admin');
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="bg-[#A6CEEE] w-screen h-screen fixed overflow-clip">
      <div className="w-[500px] h-[500px] bg-[#2185D5] absolute z-0 -mt-60 -ml-56 rounded-full"></div>
      <div className="w-[300px] h-[300px] bg-[#2185D5] absolute z-0 mx-[350px] my-[550px] rounded-full"></div>
      <div className="w-[1000px] h-[800px] bg-[#2185D5] absolute z-0 mx-[500px] my-[300px]"></div>
      <div className="flex relative">
        <div className="bg-[#F3F3F3] mx-auto my-[110px] w-[1000px] h-[520px] rounded-lg flex justify-center">
          <div className="flex flex-row justify-center px-8">
            <Image src={ilustrasi} alt="Ilustrasi Login" className="w-10/12 m-auto" />
            <div>
              <h1 className="font-bold text-3xl text-[#3A4750] mt-20 mb-3">
                Selamat Datang Kembali!
              </h1>
              <p className="font-light text-sm text-[#3A4750] mb-8">
                Silahkan login ke akun Anda untuk melanjutkan.
              </p>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-5"
                  value={username} // Updated to `username`
                  onChange={(e) => setUsername(e.target.value)} // Updated to `username`
                />
                <input
                  placeholder="Email"
                  type="text"
                  id="email"
                  className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  className="outline outline-[#3A4750] shadow-md bg-transparent w-2/3 rounded-lg py-2 px-3 leading-3 mb-7"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center">
                  <Button className="bg-[#2185D5] font-bold px-11 hover:bg-[#235985]" type="submit">
                    LOGIN
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
