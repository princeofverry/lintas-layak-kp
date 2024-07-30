"use client";
import React, { useEffect, useState } from "react";
import logo from "/public/images/Black and White Modern Road Construction Logo.png";
import Image from "next/image";
import { CircleCheck, Download, FolderCheck, House, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import foto from "/public/images/fotoprofil.jpg";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterSort, setFilterSort] = useState('');
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reports'); // Endpoint yang benar
      const data = await response.json();
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
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
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    router.push('/'); // Redirect to landing page
  };

  const reloadReports = () => {
    fetchReports();
  };

  const filterReports = () => {
    let filteredReports = [...reports];

    if (filterStatus) {
      filteredReports = filteredReports.filter(report => report.status === filterStatus);
    }

    if (filterDate) {
      const now = new Date();
      if (filterDate === 'Hari Ini') {
        filteredReports = filteredReports.filter(report => new Date(report.createdAt).toDateString() === now.toDateString());
      } else if (filterDate === 'Minggu Ini') {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        filteredReports = filteredReports.filter(report => new Date(report.createdAt) >= weekStart);
      } else if (filterDate === 'Bulan Ini') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filteredReports = filteredReports.filter(report => new Date(report.createdAt) >= monthStart);
      }
    }

    if (filterSort) {
      filteredReports.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return filterSort === 'Terbaru' ? dateB - dateA : dateA - dateB;
      });
    }

    return filteredReports;
  };

  const totalReport = reports.length;

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
            {name}
          </h2>
          <h3 className="mx-auto text-base text-[#F3F3F3] font-light">
            {email}
          </h3>
          <div className="flex flex-row mx-auto mt-10">
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
      <div className="flex-1">
        <h1 className="text-[#3A4750] text-2xl font-extrabold mx-14 mt-12">
          Hallo, {name}
        </h1>
        <h2 className="text-[#3A475099] text-base font-medium mx-14 mt-3 mb-7">
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
              <h2 className="font-black text-[#F3F3F3] text-3xl">
                {totalReport}
              </h2>
              <h3 className="font-light text-[#F3F3F3] text-lg">Laporan Masuk</h3>
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
        <div className="flex flex-row mt-7 mx-14 items-center">
          <Button
            onClick={reloadReports}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2"
          >
            <RefreshCw size={20} color="#F3F3F3" />
          </Button>
          <h1 className="text-[#3A4750] text-2xl font-extrabold ml-4">
            Laporan Masuk
          </h1>
          <div className="ml-auto flex flex-row gap-3">
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
        <div className="mt-5 mx-14 w-[945px] h-[350px] overflow-auto rounded-md">
          <table className="w-full table-auto">
            <thead className="bg-[#D8DADC] text-[#3A475099] h-10">
              <tr className="text-left">
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
                <tr key={report._id} className="bg-[#3A47500D] border-b border-[#D8DADC] hover:bg-[#E5E5E5]">
                  <td className="py-4 text-[#3A4750CC] text-base font-normal text-center">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${report.status === 'Selesai' ? 'bg-green-100 text-green-800' : report.status === 'Dalam Proses' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.title}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {report.email}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {new Date(report.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal">
                    {new Date(report.createdAt).toLocaleTimeString('id-ID')}
                  </td>
                  <td className="py-4 text-[#3A4750CC] text-base font-normal text-center">
                    <Link href={`/admin/dashboard_admin/${report._id}`}>
                      <Button className="bg-[#3A4750CC] text-white w-28">Details</Button>
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
