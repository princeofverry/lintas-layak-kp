'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [detections, setDetections] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [numPotholes, setNumPotholes] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [reportId, setReportId] = useState('');
    const [reportStatus, setReportStatus] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showProcess, setShowProcess] = useState(false);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/detect',
                formData
            );

            const { detections, num_potholes, image } = response.data;
            setDetections(detections);
            setNumPotholes(num_potholes);

            const byteArray = new Uint8Array(
                image.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
            );
            const blob = new Blob([byteArray], { type: 'image/png' });
            const imageObjectURL = URL.createObjectURL(blob);
            setImageSrc(imageObjectURL);

            setShowSuccessMessage(true);
        } catch (error) {
            console.error(
                'Error saat mengunggah file',
                error.response ? error.response.data : error.message
            );
        }
    };

    const onCheckStatus = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/report_status/${reportId}`
            );
            setReportStatus(response.data.status);
        } catch (error) {
            console.error(
                'Error saat memeriksa status laporan',
                error.response ? error.response.data : error.message
            );
        }

        setShowProcess(true);
    };

    return (
        <div className="flex flex-col items-center bg-[#f3f3f3]">
            <h1 className="text-[#2185D5] text-3xl font-bold text-center mt-8">
                Laporkan Jalan Berlubang di Daerah Anda
            </h1>
            <div className="border-b-4 border-[#2185D5] w-1/4 mx-auto mt-1 mb-8"></div>
            {showSuccessMessage && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Laporan Anda Berhasil Dikirim. Informasi selanjutnya terkait detail laporan telah dikirim melalui Email Anda.</span>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-evenly px-8 w-full">
                <div className="md:w-1/2 md:pr-8">
                    <p className="text-justify mb-8">
                        Kami menghargai partisipasi Anda dalam menjaga keamanan dan kenyamanan jalan di Kota Semarang. Jika Anda menemukan jalan berlubang, harap sampaikan laporan Anda melalui formulir di samping ini. Terima kasih atas kepedulian dan kerjasama Anda.
                    </p>
                    <h3 className="text-xl font-semibold mb-4">Cek Status Pengajuan Laporan Anda</h3>
                    <div className="mb-8">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-[#f3f3f3]"
                            id="report-id"
                            type="text"
                            placeholder="Masukkan no laporan Anda"
                            value={reportId}
                            onChange={(e) => setReportId(e.target.value)}
                        />
                        <button
                            className="bg-[#2185D5] rounded px-3 py-2 hover:bg-[#0b69b7] text f3f3f3 w-full"
                            onClick={onCheckStatus}
                        >
                            Cek Status
                        </button>
                    </div>
                    {showProcess && (
                        <div className="bg f3f3f3 rounded shadow-md">
                            <h4 className="text-lg font-semibold mb-2">Proses Pengajuan Laporan</h4>
                            <ul className="list-disc list-inside">
                                <li className="mb-2">Pemeriksaan: Tim kami akan melakukan layout untuk memeriksa informasi yang Anda berikan.</li>
                                <li className="mb-2">Survei Lapangan: Tim kami mengunjungi lokasi yang Anda laporkan untuk mengumpulkan data tambahan.</li>
                                <li className="mb-2">Tindakan Perbaikan: Kami merencanakan dan melaksanakan aksi perbaikan berdasarkan data yang telah kami kumpulkan.</li>
                                <li>Selesai: Setelah perbaikan selesai, Anda akan menerima notifikasi melalui email.</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 bg f3f3f3 p-8 rounded shadow-md">
                    <div>
                        <input
                            className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4 bg-[#f3f3f3]"
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4 bg-[#f3f3f3]"
                            id="judul-laporan"
                            type="text"
                            placeholder="Judul Laporan"
                        />
                        <textarea
                            className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4 bg-[#f3f3f3]"
                            id="isi-laporan"
                            placeholder="Isi Laporan"
                        />
                        <input
                            className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4 bg-[#f3f3f3]"
                            id="alamat-laporan"
                            type="text"
                            placeholder="Alamat / Deskripsi Lokasi"
                        />
                        <input
                            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline outline-2 mb-4"
                            id="file"
                            type="file"
                            onChange={onFileChange}
                        />
                        <Button
                            variant="secondary"
                            className="bg-[#2185D5] px-16 text-bold hover:bg-[#0b69b7] text f3f3f3 w-full py-2"
                            onClick={onFileUpload}
                        >
                            KIRIM
                        </Button>
                    </div>
                </div>
            </div>
            {imageSrc && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Detection Image:</h2>
                    <img src={imageSrc} alt="Detection result" className="max-w-full h-auto" />
                </div>
            )}
            {detections && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Detections:</h2>
                    <p className="mb-4">Number of potholes detected: {numPotholes}</p>
                    <button
                        className="bg-[#2185D5] text f3f3f3 px-4 py-2 rounded hover:bg-[#0b69b7]"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                    {showDetails && (
                        <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(detections, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
}

export default Form;
