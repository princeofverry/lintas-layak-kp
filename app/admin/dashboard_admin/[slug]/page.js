"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Info } from "lucide-react";
import Link from "next/link";
import reports from "@/const/reports";

const StorePage = ({ params }) => {
  const { slug } = params;

  // Cari laporan berdasarkan slug
  const report = reports.find((report) => report.slug === slug);

  // Jika laporan tidak ditemukan, tampilkan pesan atau penanganan yang sesuai
  if (!report) {
    return <p>Laporan tidak ditemukan</p>;
  }

  return (
    <div className="w-screen h-screen bg-[#F3F3F3]">
      <div className="flex flex-row">
        <div className="flex flex-row gap-3 px-7 py-5 h-20 w-screen items-center justify-between">
          <Button className="bg-transparent hover:bg-transparent">
            <Link href="/admin/dashboard_admin">
              <ChevronLeft size={25} color="#2185D5" strokeWidth={3} />
            </Link>
            <h2 className="text-2xl text-[#2185D5] font-bold">Dashboard</h2>
          </Button>
          <Button className="h-10 w-32 bg-[#2185D5] shadow-lg text-[#F3F3F3] hover:bg-[#215dd5] font-bold">
            UPDATE
          </Button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col mx-12 my-1">
          <h2 className="font-semibold text-lg text-[#2185D5] my-5">
            No. Laporan : {report.id}
          </h2>
          <div className="bg-[#3A47500D] h-56 w-auto rounded-xl flex flex-row">
            <div className="flex flex-col mx-3 my-3 gap-y-2">
              <label className="text-[#3A4750] text-sm font-normal">
                Status
              </label>
              <select className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3">
                <option>Belum Dicek</option>
                <option>Ditolak</option>
                <option>Dalam Proses</option>
                <option>Selesai</option>
              </select>
              <label className="text-[#3A4750] text-sm font-normal">
                Tahap
              </label>
              <select className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3">
                <option>Pemeriksaan</option>
                <option>Survei Lapangan</option>
                <option>Tindakan Perbaikan</option>
                <option>Selesai</option>
              </select>
              <label className="text-[#3A4750] text-sm font-normal">
                Prioritas Laporan
              </label>
              <select className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3">
                <option>Rendah</option>
                <option>Sedang</option>
                <option>Tinggi</option>
              </select>
            </div>
            <div className="flex flex-col mr-3 ml-8 my-3 gap-y-2">
              <label className="text-[#3A4750] text-sm font-normal">
                Tindakan
              </label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
              />
              <label className="text-[#3A4750] text-sm font-normal">
                Penanggung Jawab
              </label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
              />
              <label className="text-[#3A4750] text-sm font-normal">
                Estimasi
              </label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
              />
            </div>
          </div>
          <div className="bg-[#3A47500D] h-80 w-auto rounded-xl flex flex-col mt-9">
            <h2 className="text-lg font-bold text-[#2185D5] my-3 mx-3">
              Gambar Pendukung
            </h2>
            <div className="flex flex-row my-3 mx-3 gap-8">
              <div className="outline outline-slate-950 w-96 h-60 rounded-lg">
                Ceritanya Isi Gambar Jalan
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-medium text-[#3A4750]">
                  Koordinat Gps
                </h3>
                <p className="text-sm font-normal text-[#3A4750]">
                  Latitude : -7.13457
                </p>
                <p className="text-sm font-normal text-[#3A4750]">
                  Longtitude : 112.5671
                </p>
                <h3 className="text-base font-medium text-[#3A4750]">
                  Jumlah Lubang
                </h3>
                <p className="text-sm font-normal text-[#3A4750]">1</p>
                <h3 className="text-base font-medium text-[#3A4750]">
                  Catatan Khusus
                </h3>
                <p className="text-sm font-normal text-[#3A4750]">-</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 mt-7 mb-1 h-auto w-96 bg-[#3A47500D] rounded-xl flex flex-col px-3 py-5">
          <h2 className="text-xl text-[#2185D5] font-bold mb-5">Informasi</h2>
          <div className="border border-b border-[#3A47501F] w-full outline outline-none mb-5"></div>
          <div className="flex flex-row gap-5">
            <Clock size={24} color="#2185D5CC" />
            <div className="flex flex-col gap-y-3">
              <h4 className=" text-[#2185D5CC] font-semibold">Laporan Masuk</h4>
              <div className="flex flex-row gap-24">
                <h5 className="text-sm font-normal text-[#3A4750]">
                  {report.date}
                </h5>
                <h5 className="text-sm font-normal text-[#3A4750]">
                  {report.time}
                </h5>
              </div>
            </div>
          </div>
          <div className="border border-b border-[#3A47501F] w-full outline outline-none my-5"></div>
          <div className="flex flex-row gap-5">
            <div>
              <Info size={24} color="#2185D5CC" />
            </div>
            <div className="flex flex-col gap-y-3">
              <h4 className=" text-[#2185D5CC] font-semibold">Details</h4>
              <div>
                <h5 className="text-base font-medium text-[#3A4750]">Email</h5>
                <p className="text-sm font-normal text-[#3A4750]">
                  {report.email}
                </p>
              </div>
              <div>
                <h5 className="text-base font-medium text-[#3A4750]">
                  No. Laporan
                </h5>
                <p className="text-sm font-normal text-[#3A4750]">
                  {report.id}
                </p>
              </div>
              <div>
                <h5 className="text-base font-medium text-[#3A4750]">
                  Judul Laporan
                </h5>
                <p className="text-sm font-normal text-[#3A4750]">
                  {report.title}
                </p>
              </div>
              <div>
                <h5 className="text-base font-medium text-[#3A4750]">
                  Isi Laporan
                </h5>
                <p className="text-sm font-normal text-[#3A4750] text-justify">
                  {report.description}
                </p>
              </div>
              <div>
                <h5 className="text-base font-medium text-[#3A4750]">
                  Alamat/Deskripsi Lokal
                </h5>
                <p className="text-sm font-normal text-[#3A4750] text-justify">
                  {report.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
