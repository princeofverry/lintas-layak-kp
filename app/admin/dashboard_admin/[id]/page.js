"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StorePage = ({ params }) => {
  const { id } = params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [stage, setStage] = useState('');
  const [priority, setPriority] = useState('');
  const [action, setAction] = useState('');
  const [responsible, setResponsible] = useState('');
  const [estimate, setEstimate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/reports/${id}`);
        const data = await response.json();
        setReport(data);
        setStatus(data.status || '');
        setStage(data.stage || '');
        setPriority(data.priority || '');
        setAction(data.action || '');
        setResponsible(data.responsible || '');
        setEstimate(data.estimate || '');
      } catch (error) {
        console.error("Error fetching report:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, router]);

  useEffect(() => {
    if (report) {
      console.log('File URL:', report.fileUrl); // Log the file URL for debugging
    }
  }, [report]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          stage,
          priority,
          action,
          responsible,
          estimate,
        }),
      });

      if (response.ok) {
        alert('Update successful');
        router.push(`/admin/dashboard_admin`);
      } else {
        const responseData = await response.json();
        alert(`Update failed: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating report:", error);
      alert('Update failed');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
          <Button
            className="h-10 w-32 bg-[#2185D5] shadow-lg text-[#F3F3F3] hover:bg-[#215dd5] font-bold"
            onClick={handleUpdate}
          >
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
              <label className="text-[#3A4750] text-sm font-normal">Status</label>
              <select
                className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Belum Dicek">Belum Dicek</option>
                <option value="Ditolak">Ditolak</option>
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
              <label className="text-[#3A4750] text-sm font-normal">Tahap</label>
              <select
                className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="Pemeriksaan">Pemeriksaan</option>
                <option value="Survei Lapangan">Survei Lapangan</option>
                <option value="Tindakan Perbaikan">Tindakan Perbaikan</option>
                <option value="Selesai">Selesai</option>
              </select>
              <label className="text-[#3A4750] text-sm font-normal">Prioritas Laporan</label>
              <select
                className="bg-transparent outline rounded-md w-[420px] h-7 outline-[#3A475099] text-sm font-normal text-[#3A4750] px-3"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Rendah">Rendah</option>
                <option value="Sedang">Sedang</option>
                <option value="Tinggi">Tinggi</option>
              </select>
            </div>
            <div className="flex flex-col mr-3 ml-8 my-3 gap-y-2">
              <label className="text-[#3A4750] text-sm font-normal">Tindakan</label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
              <label className="text-[#3A4750] text-sm font-normal">Penanggung Jawab</label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
              />
              <label className="text-[#3A4750] text-sm font-normal">Estimasi</label>
              <input
                type="text"
                className="bg-transparent w-[420px] h-7 border-b border-[#3A475099] outline outline-none text-sm font-normal text-[#3A4750]"
                value={estimate}
                onChange={(e) => setEstimate(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-[#3A47500D] h-80 w-auto rounded-xl flex flex-col mt-9">
            <h2 className="text-lg font-bold text-[#2185D5] my-3 mx-3">Gambar Pendukung</h2>
            <div className="flex flex-row my-3 mx-3 gap-8">
              <div className="w-96 h-60 rounded-lg overflow-hidden">
              <img src={`http://localhost:5000/uploads/${report.fileUrl}`} className="w-full h-full object-contain" alt="Pendukung" onError={(e) => console.error('Error loading image:', e)} 
/>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-medium text-[#3A4750]">Koordinat Gps</h3>
                <p className="text-sm font-normal text-[#3A4750]">Latitude : {report.latitude}</p>
                <p className="text-sm font-normal text-[#3A4750]">Longitude : {report.longitude}</p>
                <h3 className="text-base font-medium text-[#3A4750]">Jumlah Lubang</h3>
                <p className="text-sm font-normal text-[#3A4750]">{report.holes}</p>
                <h3 className="text-base font-medium text-[#3A4750]">Catatan Khusus</h3>
                <p className="text-sm font-normal text-[#3A4750]">{report.notes}</p>
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
              <h4 className="text-[#2185D5CC] font-semibold">Laporan Masuk</h4>
              <div className="flex flex-row gap-24">
                <h5 className="text-sm font-normal text-[#3A4750]">
                  {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </h5>
                <h5 className="text-sm font-normal text-[#3A4750]">
                  {new Date(report.createdAt).toLocaleTimeString('id-ID')}
                </h5>
              </div>
            </div>
          </div>
          <div className="border border-b border-[#3A47501F] w-full outline outline-none my-5"></div>
          <div className="flex flex-row gap-5">
            <Info size={24} color="#2185D5CC" />
            <div className="flex flex-col gap-y-3">
              <h4 className="text-[#2185D5CC] font-semibold">Details</h4>
              <h4 className="text-sm font-semibold text-[#2185D5CC]">Email</h4>
              <p className="text-sm font-normal text-[#3A4750]">{report.email}</p>
              <h4 className="text-sm font-semibold text-[#2185D5CC]">Title</h4>
              <p className="text-sm font-normal text-[#3A4750]">{report.title}</p>
              <h4 className="text-sm font-semibold text-[#2185D5CC]">Content</h4>
              <p className="text-sm font-normal text-[#3A4750]">{report.content}</p>
              <h4 className="text-sm font-semibold text-[#2185D5CC]">Address</h4>
              <p className="text-sm font-normal text-[#3A4750]">{report.address}</p>
              <h4 className="text-sm font-semibold text-[#2185D5CC]">Unique Code</h4>
              <p className="text-sm font-normal text-[#3A4750]">{report.uniqueCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
