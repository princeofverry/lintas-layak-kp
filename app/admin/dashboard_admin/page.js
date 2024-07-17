'use client'
import React from 'react';
import logo from "/public/images/Black and White Modern Road Construction Logo.png";
import Image from "next/image";
import { CircleCheck, CircleCheckBig, Download, FolderCheck, House, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import foto from "/public/images/fotoprofil.jpg";


const DashboardPage = () => {
  const getCurrentDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const date = new Date();
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  return (
    <div className='flex flex-row fixed bg-[#F3F3F3] h-screen w-screen'>
      <div className='flex'>
        <div className='flex flex-col bg-[#2185D5] h-screen w-72 rounded-tr-lg rounded-b-lg'>
          <Image src={logo} alt='Logo Lintas Layak' className='-mt-10 size-64 mx-auto'/>
          <div className='w-[120px] h-[120px] rounded-full bg-transparent mx-auto -mt-10 border-4 border-white overflow-clip'>
            <Image src={foto} alt='Foto Profil'/>
          </div>
          <h2 className='text-xl text-[#F3F3F3] font-bold mx-auto mt-10'>Admin Ganteng</h2>
          <h3 className='mx-auto text-base text-[#F3F3F3] font-light'>adminganteng@gmail.com</h3>
          <div className='flex flex-row mx-auto mt-14 '>
            <House color='#F3F3F3' size={20} className='mr-3' />
            <h3 className='font-semibold text-[#F3F3F3]'>Dashboard</h3>
          </div>
          <div className='mx-auto'>
            <Button className='bg-[#F3F3F3] text-[#2185D5] shadow-md shadow-slate-700 mt-56 font-bold hover:bg-[#e5eaee]'>LOGOUT</Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-[#3A4750] text-2xl font-extrabold  mx-14 mt-12'>Hallo, Admin Ganteng</h1>
        <h2 className='text-[#3A475099] text-base font-medium  mx-14 mt-3 mb-7'>{getCurrentDate()}</h2>
        <div className='flex flex-row mx-14 gap-10'>
          <div className='w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center'>
            <Users size={90} color='#F3F3F3'/>
            <div className='flex flex-col'>
              <h2 className='font-black text-[#F3F3F3] text-3xl'>210</h2>
              <h3 className='font-light text-[#F3F3F3] text-lg'>Kunjungan</h3>
            </div>
          </div>
          <div className='w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center'>
            <Download size={90} color='#F3F3F3'/>
            <div className='flex flex-col'>
              <h2 className='font-black text-[#F3F3F3] text-3xl'>68</h2>
              <h3 className='font-light text-[#F3F3F3] text-lg'>Laporan Masuk</h3>
            </div>
          </div>
          <div className='w-72 h-40 bg-[#2185D5] rounded-lg flex flex-row justify-stretch gap-5 px-5 items-center'>
            <FolderCheck size={90} color='#F3F3F3' />
            <div className='flex flex-col'>
              <h2 className='font-black text-[#F3F3F3] text-3xl'>31</h2>
              <h3 className='font-light text-[#F3F3F3] text-lg'>Diperiksa</h3>
            </div>
          </div>
        </div>
        <div className='flex flex-row mt-7 items-center gap-[250px]'>
          <h1 className='text-[#3A4750] text-2xl font-extrabold mx-14'>Laporan Masuk</h1>
          <div className='flex flex-row gap-5'>
            <h3 className='text-base text-[#3A475099] font-light'>Filter By</h3>
            <select className='rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1'>
              <option value="" disabled selected hidden>Urutkan</option>
              <option>Semua</option>
              <option>Terbaru</option>
              <option>Terlama</option>
            </select>
            <select className='rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1'>
              <option value="" disabled selected hidden>Tanggal</option>
              <option>Semua</option>
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
            <select className='rounded-sm outline outline-[#3A475099] bg-transparent w-28 text-sm font-light text-[#3A475099] px-1'>
              <option value="" disabled selected hidden>Status</option>
              <option>Semua</option>
              <option>Belum Dicek</option>
              <option>Ditolak</option>
              <option>Dalam Proses</option>
              <option>Selesai</option>
            </select>
          </div>
        </div>
        <div className='mt-5 mx-14 w-[945px] h-[350px] overflow-auto scrollbar-hide rounded-md'>
          <table className='mx-auto w-full table-auto'>
            <thead className='sticky top-0'>
              <tr className='bg-[#D8DADC] h-10'>
                <th className='font-semibold text-[#3A475099]'>Status</th>
                <th className='font-semibold text-[#3A475099]'>Judul Laporan</th>
                <th className='font-semibold text-[#3A475099]'>Email</th>
                <th className='font-semibold text-[#3A475099]'>Tanggal</th>
                <th className='font-semibold text-[#3A475099]'>Waktu</th>
                <th className='font-semibold text-[#3A475099]'>Detail</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#DF2E38' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#2185D5' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#3A475080' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#2185D5' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#2185D5' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
              <tr className='bg-[#3A47500D]'>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <CircleCheck size={40} color='#3A475080' className='ml-8'/>
                </td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>Jalan Rusak Tembalang</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>anonim1@gmail.com</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>08/07/2024</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>15.21</td>
                <td className='py-4 text-[#3A4750CC] text-base font-normal'>
                  <Button className='bg-[#3A4750CC] w-28'>Details</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
