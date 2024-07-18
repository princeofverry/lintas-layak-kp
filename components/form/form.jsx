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
        <div id="form" className="flex flex-col items-center bg-[#f3f3f3]">
            <h1 className="text-[#2185D5] text-2xl font-bold text-center mt-12">
                Laporkan Jalan Berlubang di Daerah Anda
            </h1>
            <div className='text-center w-100 flex justify-center pt-8 pb-16'>
                <hr class="border-[#2185D5] w-[150px] border-[2px]"></hr>
            </div>
            {showSuccessMessage && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Laporan Anda Berhasil Dikirim. Informasi selanjutnya terkait detail laporan telah dikirim melalui Email Anda.</span>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-evenly px-8 w-full">
                <div className="md:w-1/2 md:pr-8">
                    <p className="text-justify mb-8 text-gray-600 ">
                        Kami menghargai partisipasi Anda dalam menjaga keamanan dan kenyamanan jalan di Kota Semarang. Jika Anda menemukan jalan berlubang, harap sampaikan laporan Anda melalui formulir di samping ini. Terima kasih atas kepedulian dan kerjasama Anda.
                    </p>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Cek Status Pengajuan Laporan Anda</h3>
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
                            className="bg-[#2185D5] rounded px-3 py-2 hover:bg-[#0b69b7] text f3f3f3 text-white w-full"
                            onClick={onCheckStatus}
                        > Cek Status
                        </button>
                    </div>
                    {showProcess && (
                        <div className="p-3">
                            <div className="mb-2">
                                <div className='flex items-center space-x-2'>
                                    <div className="bg-[#3A4750] rounded-full mr-2 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                                    </div>
                                    <p className='text-[15px]'>
                                        <span className='text-[#3A4750] font-semibold'>
                                        Pemeriksaan</span>
                                        <br/><span className='text-[#3A475099]'>Tim kami akan melakukan layout untuk memeriksa informasi yang Anda berikan.</span>
                                    </p>
                                </div>
                            </div>                            
                            <div className="mb-2">
                                <div className='flex items-center space-x-2'>
                                    <div className="bg-[#3A4750] rounded-full mr-2 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>
                                    </div>
                                    <p className='text-[15px]'>
                                        <span className='text-[#3A4750] font-semibold'>
                                        Survei Lapangan</span>
                                        <br/><span className='text-[#3A475099]'>Tim kami mengunjungi lokasi yang Anda laporkan untuk mengumpulkan data tambahan.</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className='flex items-center space-x-2'>
                                    <div className="bg-[#3A4750] rounded-full mr-2 p-2">
                                        <img src='/images/tindakan.png' alt="Logo" className="h-6 w-8" />
                                    </div>
                                    <p className='text-[15px]'>
                                    <span className='text-[#3A4750] font-semibold'>Tindakan Perbaikan</span>
                                    <br/><span className='text-[#3A475099]'>Kami merencanakan dan melaksanakan aksi perbaikan berdasarkan data yang telah kami kumpulkan.</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className='flex items-center space-x-2'>
                                    <div className="bg-[#3A4750] rounded-full mr-2 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                                    </div>
                                    <p className='text-[15px]'>
                                    <span className='text-[#3A4750] font-semibold'>Selesai</span>
                                    <br/><span className='text-[#3A475099]'>Setelah perbaikan selesai, Anda akan menerima notifikasi melalui email.</span>
                                    </p>
                                </div>
                            </div>        
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 bg f3f3f3 px-20 pt-10 pb-8 rounded shadow-md">
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
                            className="bg-[#2185D5] px-16 text-bold text-white hover:bg-[#0b69b7] text f3f3f3 w-full py-2"
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
            <div className='text-center w-100 flex justify-center pt-16'>
                <hr class="border-[#2185D5] w-[150px] border-[2px]"></hr>
            </div>
        </div>
    );
}

export default Form;
