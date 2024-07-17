// pages/dashboard.js
"use client";
import React from "react";
import logo from "/public/images/Black and White Modern Road Construction Logo.png";
import Image from "next/image";
import { CircleCheck, Download, FolderCheck, House, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import foto from "/public/images/fotoprofil.jpg";
import Link from "next/link";

const DashboardPage = () => {
  const getCurrentDate = () => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const date = new Date();
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  const reports = [
    {
      id: 1,
      status: "red",
      title: "Jalan Rusak Tembalang",
      email: "anonim1@gmail.com",
      date: "08/07/2024",
      time: "15.21",
      slug: "jalan-rusak-tembalang-1",
    },
    {
      id: 2,
      status: "yellow",
      title: "Pohon Tumbang Banyumanik",
      email: "anonim2@gmail.com",
      date: "09/07/2024",
      time: "10.45",
      slug: "pohon-tumbang-banyumanik-2",
    },
    {
      id: 3,
      status: "green",
      title: "Kebakaran di Semarang Timur",
      email: "anonim3@gmail.com",
      date: "10/07/2024",
      time: "08.30",
      slug: "kebakaran-semarang-timur-3",
    },
    {
      id: 4,
      status: "red",
      title: "Banjir di Pedurungan",
      email: "anonim4@gmail.com",
      date: "11/07/2024",
      time: "14.00",
      slug: "banjir-pedurungan-4",
    },
    {
      id: 5,
      status: "yellow",
      title: "Kecelakaan Lalu Lintas di Tugu",
      email: "anonim5@gmail.com",
      date: "12/07/2024",
      time: "18.15",
      slug: "kecelakaan-tugu-5",
    },
    {
      id: 6,
      status: "green",
      title: "Pencurian di Genuk",
      email: "anonim6@gmail.com",
      date: "13/07/2024",
      time: "22.00",
      slug: "pencurian-genuk-6",
    },
    {
      id: 7,
      status: "red",
      title: "Jembatan Ambruk di Gunungpati",
      email: "anonim7@gmail.com",
      date: "14/07/2024",
      time: "11.45",
      slug: "jembatan-ambruk-gunungpati-7",
    },
    {
      id: 8,
      status: "yellow",
      title: "Kemacetan Parah di Simpang Lima",
      email: "anonim8@gmail.com",
      date: "15/07/2024",
      time: "09.00",
      slug: "kemacetan-simpang-lima-8",
    },
    {
      id: 9,
      status: "green",
      title: "Pemadaman Listrik di Gajahmungkur",
      email: "anonim9@gmail.com",
      date: "16/07/2024",
      time: "17.30",
      slug: "pemadaman-listrik-gajahmungkur-9",
    },
    {
      id: 10,
      status: "red",
      title: "Longsor di Candisari",
      email: "anonim10@gmail.com",
      date: "17/07/2024",
      time: "12.00",
      slug: "longsor-candisari-10",
    },
  ];

  return (
    <div className="flex flex-row fixed bg-[#F3F3F3] h-screen w-screen">
      <div className="flex">
        <div className="flex flex-col bg-[#2185D5] h-screen w-72 rounded-tr-lg rounded-b-lg">
          <Image
            src={logo}
            alt="Logo Lintas Layak"
            className="-mt-10 size-64 mx-auto"
          />
          <div className="w-32 h-32 rounded-full bg-transparent mx-auto -mt-10 border-4 border-white overflow-clip">
            <Image src={foto} alt="Foto Profil" />
          </div>
          <h2 className="text-xl text-[#F3F3F3] font-bold mx-auto mt-10">
            Admin Ganteng
          </h2>
          <h3 className="mx-auto text-base text-[#F3F3F3] font-light">
            adminganteng@gmail.com
          </h3>
          <div className="flex flex-row mx-auto mt-10 ">
            <House color="#F3F3F3" size={20} className="mr-3" />
            <h3 className="font-semibold text-[#F3F3F3]">Dashboard</h3>
          </div>
          <div className="mx-auto">
            <Button className="bg-[#F3F3F3] text-[#2185D5] shadow-md shadow-slate-700 mt-56 font-bold hover:bg-[#e5eaee]">
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-[#3A4750] text-2xl font-extrabold  mx-14 mt-12">
          Hallo, Admin Ganteng
        </h1>
        <h2 className="text-[#3A475099] text-base font-medium  mx-14 mt-3 mb-7">
          {getCurrentDate()}
        </h2>
        <div className="flex flex-row mx-14 gap-10">
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <Users size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-black text-[#F3F3F3] text-3xl">210</h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">Kunjungan</h3>
            </div>
          </div>
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <Download size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-black text-[#F3F3F3] text-3xl">68</h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">
                Laporan Masuk
              </h3>
            </div>
          </div>
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <FolderCheck size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-black text-[#F3F3F3] text-3xl">31</h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">Diperiksa</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-7 items-center gap-[250px]">
          <h1 className="text-[#3A4750] text-2xl font-extrabold mx-14">
            Laporan Masuk
          </h1>
          <div className="flex flex-row gap-5">
            <h3 className="text-base text-[#3A475099] font-light">Filter By</h3>
            <select className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1">
              <option value="" disabled selected hidden>
                Urutkan
              </option>
              <option>Semua</option>
              <option>Terbaru</option>
              <option>Terlama</option>
            </select>
            <select className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1">
              <option value="" disabled selected hidden>
                Tanggal
              </option>
              <option>Semua</option>
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
            <select className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1">
              <option value="" disabled selected hidden>
                Status
              </option>
              <option>Semua</option>
              <option>Belum Dicek</option>
              <option>Ditolak</option>
              <option>Dalam Proses</option>
              <option>Selesai</option>
            </select>
          </div>
        </div>
        <div className="mt-5 mx-14 w-[945px] h-[350px] overflow-auto scrollbar-hide rounded-md">
          <table className="mx-auto w-full table-auto">
            <thead className="sticky top-0">
              <tr className="bg-[#D8DADC] h-10">
                <th className="font-semibold text-[#3A475099]">Status</th>
                <th className="font-semibold text-[#3A475099]">
                  Judul Laporan
                </th>
                <th className="font-semibold text-[#3A475099]">Email</th>
                <th className="font-semibold text-[#3A475099]">Tanggal</th>
                <th className="font-semibold text-[#3A475099]">Waktu</th>
                <th className="font-semibold text-[#3A475099]">Detail</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {reports.map((report) => (
                <tr key={report.id} className="bg-[#3A47500D]">
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    <CircleCheck
                      size={40}
                      color={report.status}
                      className="ml-8"
                    />
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.title}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.email}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.date}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.time}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    <Link href={`dashboard_admin/${report.slug}`}>
                      <Button className="bg-[#3A4750CC] w-28">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
