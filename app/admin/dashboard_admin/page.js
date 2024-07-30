"use client";
import React, { useEffect, useState } from "react";
import logo from "/public/images/Black and White Modern Road Construction Logo.png";
import Image from "next/image";
import { Download, FolderCheck, House, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import foto from "/public/images/fotoprofil.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterSort, setFilterSort] = useState("");
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/reports"); // Endpoint yang benar
      const data = await response.json();
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
    }

    fetchReports();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    router.push("/"); // Redirect to landing page
  };

  const reloadReports = () => {
    fetchReports();
  };

  const filterReports = () => {
    let filteredReports = [...reports];

    if (filterStatus) {
      filteredReports = filteredReports.filter(
        (report) => report.status === filterStatus
      );
    }

    if (filterDate) {
      const now = new Date();
      if (filterDate === "Hari Ini") {
        filteredReports = filteredReports.filter(
          (report) =>
            new Date(report.createdAt).toDateString() === now.toDateString()
        );
      } else if (filterDate === "Minggu Ini") {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        filteredReports = filteredReports.filter(
          (report) => new Date(report.createdAt) >= weekStart
        );
      } else if (filterDate === "Bulan Ini") {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filteredReports = filteredReports.filter(
          (report) => new Date(report.createdAt) >= monthStart
        );
      }
    }

    if (filterSort) {
      filteredReports.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return filterSort === "Terbaru" ? dateB - dateA : dateA - dateB;
      });
    }

    return filteredReports;
  };

  const totalReport = reports.length;

  return (
    <div className="flex flex-row fixed w-screen bg-[#F3F3F3] h-screen">
      <div className="flex w-screen">
        <div className="flex flex-col bg-[#2185D5] h-screen w-80 rounded-tr-lg rounded-b-lg">
          <Image
            src={logo}
            alt="Logo Lintas Layak"
            className="-mt-10 size-64 mx-auto"
          />
          <div className="w-32 h-32 rounded-full bg-transparent mx-auto -mt-10 border-4 border-white overflow-clip">
            <Image src={foto} alt="Foto Profil" />
          </div>
          <h2 className="text-xl text-[#F3F3F3] font-bold mx-auto mt-10">
            {name}
          </h2>
          <h3 className="mx-auto text-sm opacity-85 text-[#F3F3F3] font-extralight">
            {email}
          </h3>
          <div className="flex flex-row mx-auto mt-10">
            <House color="#F3F3F3" size={20} className="mr-3" />
            <h3 className="font-semibold text-[#F3F3F3]">Dashboard</h3>
          </div>
          <div className="mx-auto">
            <Button
              className="bg-[#F3F3F3] text-[#2185D5] shadow-md shadow-slate-700 w-32 bottom-0 mt-36 font-bold hover:bg-[#e5eaee]"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-36">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-[#3A4750] text-2xl font-extrabold mt-12">
              Hallo, {name}
            </h1>
            <h2 className="text-[#3A475099] text-base font-medium  mt-3 mb-7">
              {getCurrentDate()}
            </h2>
          </div>
          <Button
            onClick={reloadReports}
            className="bg-[#3A475033] text-[#3A475099] hover:bg-[#1a1e2233] rounded-lg gap-2 shadow-xl"
          >
            <RefreshCw size={20} color="#3A475099" />
            REFRESH
          </Button>
        </div>
        <div className="flex flex-row  gap-10">
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <Users size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-bold text-[#F3F3F3] text-3xl">210</h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">Kunjungan</h3>
            </div>
          </div>
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <Download size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-bold text-[#F3F3F3] text-3xl">
                {totalReport}
              </h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">
                Laporan Masuk
              </h3>
            </div>
          </div>
          <div className="w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center">
            <FolderCheck size={90} color="#F3F3F3" />
            <div className="flex flex-col">
              <h2 className="font-bold text-[#F3F3F3] text-3xl">31</h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">Diperiksa</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-7 justify-between items-center">
          <h1 className="text-[#3A4750] text-2xl font-extrabold ml-4">
            Laporan Masuk
          </h1>
          <div className="flex flex-row gap-3">
            <h3 className="text-base text-[#3A475099] font-light">Filter By</h3>
            <select
              className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1"
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
            >
              <option value="" disabled hidden>
                Urutkan
              </option>
              <option value="Semua">Semua</option>
              <option value="Terbaru">Terbaru</option>
              <option value="Terlama">Terlama</option>
            </select>
            <select
              className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="" disabled hidden>
                Tanggal
              </option>
              <option value="Semua">Semua</option>
              <option value="Hari Ini">Hari Ini</option>
              <option value="Minggu Ini">Minggu Ini</option>
              <option value="Bulan Ini">Bulan Ini</option>
            </select>
            <select
              className="rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Semua">Semua</option>
              <option value="Belum Dicek">Belum Dicek</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>
        <div className="mt-5  max-w-6xl h-[300px] overflow-auto rounded-md no-scrollbar">
          <table className="w-full table-auto">
            <thead className="bg-[#D8DADC] text-[#3A475099] h-10">
              <tr className="text-center">
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Judul Laporan</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Tanggal</th>
                <th className="p-3 font-semibold">Waktu</th>
                <th className="p-3 font-semibold">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filterReports().map((report) => (
                <tr
                  key={report._id}
                  className="bg-[#3A47500D] border-b border-[#D8DADC] hover:bg-[#E5E5E5]"
                >
                  <td className="py-4 text-[#3A4750CC] text-base font-normal text-center">
                    <span
                      className={`flex items-center justify-center text-center text-white w-24 ml-2 py-2 text-xs rounded-lg ${
                        report.status === "Selesai"
                          ? "bg-[#2185D5]"
                          : report.status === "Dalam Proses"
                          ? "bg-[#36AE7C] "
                          : report.status === "Belum Dicek"
                          ? "bg-[#3A475080]"
                          : report.status === "Ditolak"
                          ? "bg-[#DF2E38] "
                          : "bg-transparent text-transparent"
                      }`}
                    >
                      {report.status || "Tidak Ada Status"}
                    </span>
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.title}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.email}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {new Date(report.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {new Date(report.createdAt).toLocaleTimeString("id-ID")}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal text-center">
                    <Link href={`/admin/dashboard_admin/${report._id}`}>
                      <Button className="bg-[#3A4750CC] text-white w-28">
                        Details
                      </Button>
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
