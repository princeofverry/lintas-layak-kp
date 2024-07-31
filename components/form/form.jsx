"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Import Image from next/image
import { Button } from '../ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormWithMap from './maps';

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [detections, setDetections] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [numPotholes, setNumPotholes] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [reportId, setReportId] = useState('');
    const [reportStatus, setReportStatus] = useState(null);
    const [showProcess, setShowProcess] = useState(false);
    const [uniqueCode, setUniqueCode] = useState('');
    const [report, setReport] = useState(null);
    const [locationData, setLocationData] = useState({
        lat: null,
        lng: null,
        address: '',
        kelurahan: '',
        kecamatan: ''
    });

    const handleLocationChange = (data) => {
        setLocationData(data);
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!selectedFile) {
            toast.error('Harap masukkan laporan Anda');
            return;
        }

        const email = document.getElementById('email').value;
        const title = document.getElementById('judul-laporan').value;
        const content = document.getElementById('isi-laporan').value;
        const address = document.getElementById('alamat-laporan').value;

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('email', email);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('address', address);
        formData.append('kelurahan', locationData.kelurahan);  // Tambahkan kelurahan
        formData.append('kecamatan', locationData.kecamatan);  // Tambahkan kecamatan
        formData.append('latitude', locationData.lat);         // Tambahkan latitude
        formData.append('longitude', locationData.lng);        // Tambahkan longitude


        try {
            // Mengirim ke endpoint /detect
            const detectResponse = await axios.post('http://127.0.0.1:5000/detect', formData);
            const { detections, num_potholes, image } = detectResponse.data;
            setDetections(detections);
            setNumPotholes(num_potholes);

            // Convert the hex string back to a blob
            const byteArray = new Uint8Array(image.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const blob = new Blob([byteArray], { type: 'image/png' });
            const imageObjectURL = URL.createObjectURL(blob);
            setImageSrc(imageObjectURL);

            // Prepare the form data for report
            const reportFormData = new FormData();
            reportFormData.append('image', blob, 'detection_image.png'); // Menambahkan gambar yang sudah diproses
            reportFormData.append('email', email);
            reportFormData.append('title', title);
            reportFormData.append('content', content);
            reportFormData.append('address', address);

            // Mengirim ke endpoint /api/report
            const reportResponse = await axios.post(
                'http://localhost:5000/api/report',
                reportFormData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true // Sertakan cookies
                }
            );

            const { uniqueCode } = reportResponse.data;
            toast.success('Laporan Anda Berhasil Dikirim. Informasi selanjutnya terkait detail laporan telah dikirim melalui Email Anda.');

            // Me-reload halaman setelah 3 detik
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error("Error uploading the file", error.response ? error.response.data : error.message);

            // Jika endpoint /detect gagal, kirim gambar mentah
            try {
                const rawReportFormData = new FormData();
                rawReportFormData.append('image', selectedFile); // Menggunakan gambar yang dipilih sebelumnya
                rawReportFormData.append('email', email);
                rawReportFormData.append('title', title);
                rawReportFormData.append('content', content);
                rawReportFormData.append('address', address);

                const rawReportResponse = await axios.post(
                    'http://localhost:5000/api/report',
                    rawReportFormData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true // Sertakan cookies
                    }
                );

                const { uniqueCode } = rawReportResponse.data;
                toast.success('Laporan Anda Berhasil Dikirim. Informasi selanjutnya terkait detail laporan telah dikirim melalui Email Anda.');

                // Me-reload halaman setelah 3 detik
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } catch (reportError) {
                console.error("Error sending raw image", reportError.response ? reportError.response.data : reportError.message);
                toast.error("Error sending the file. Please try again.");
            }
        }
    };


    const onCheckStatus = async () => {
        if (!uniqueCode) {
            toast.error('Harap masukkan nomor laporan Anda!!');
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5000/api/report/uniqueCode/${uniqueCode}`,
                { withCredentials: true }
            );
            setReport(response.data);
        } catch (error) {
            console.error(
                'Error saat memeriksa status laporan',
                error.response ? error.response.data : error.message
            );
            toast.error('Error while checking report status!');
        }

        setShowProcess(true);
    };

    const getStatusClass = (step) => {
        if (report === null) {
            return 'bg-[#3A4750]';
        }

        const stages = ['Pemeriksaan', 'Survei Lapangan', 'Tindakan Perbaikan', 'Selesai'];
        if (stages.indexOf(step) <= stages.indexOf(report.stage)) {
            return 'bg-[#2185D5]';
        }

        return 'bg-gray-300';
    };

    return (
        <div id="form" className="flex flex-col items-center bg-[#f3f3f3]">
            <ToastContainer />
            <h1 className="text-[#2185D5] text-2xl font-bold text-center mt-12">
                Laporkan Jalan Berlubang di Daerah Anda
            </h1>
            <div className='text-center w-100 flex justify-center pt-8 pb-16'>
                <hr className="border-[#2185D5] w-[150px] border-[2px]" />
            </div>
            <div className="flex flex-col md:flex-row justify-evenly px-8 w-full">
                <div className="md:w-1/2 md:pr-8">
                    <p className="text-justify mb-8 text-gray-600">
                        Kami menghargai partisipasi Anda dalam menjaga keamanan dan kenyamanan jalan di Kota Semarang. Jika Anda menemukan jalan berlubang, harap sampaikan laporan Anda melalui formulir di samping ini. Terima kasih atas kepedulian dan kerjasama Anda.
                    </p>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Cek Status Pengajuan Laporan Anda</h3>
                    <div className="mb-8">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-[#f3f3f3]"
                            id="kode unik"
                            type="text"
                            placeholder="Masukkan no laporan Anda"
                            value={uniqueCode}
                            onChange={(e) => setUniqueCode(e.target.value)}
                        />
                        <button
                            className="bg-[#2185D5] rounded px-3 py-2 hover:bg-[#0b69b7] text-white w-full"
                            onClick={onCheckStatus}
                        > Cek Status
                        </button>
                    </div>
                    {showProcess && (
                        <div className="p-3">
                            <div className="relative">
                                <div className="absolute left-4 top-8 bottom-8 h-[calc(100%-4rem)] w-0.5 bg-gray-300"></div>

                                <div className="mb-8 flex items-center">
                                    <div className={`relative z-10 ${getStatusClass('Pemeriksaan')} rounded-full p-2`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen">
                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                        </svg>
                                    </div>
                                    <div className="ml-8">
                                        <p className="text-base">
                                            <span className="text-[#3A4750] font-semibold">Pemeriksaan</span>
                                            <br /><span className="text-[#3A475099]">Tim kami akan memeriksa laporan untuk memastikan informasi yang diberikan sudah lengkap.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex items-center">
                                    <div className={`relative z-10 ${getStatusClass('Survei Lapangan')} rounded-full p-2`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map">
                                            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                                            <path d="M15 5.764v15" />
                                            <path d="M9 7.764v13" />
                                        </svg>
                                    </div>
                                    <div className="ml-8">
                                        <p className="text-base">
                                            <span className="text-[#3A4750] font-semibold">Survei Lapangan</span>
                                            <br /><span className="text-[#3A475099]">Tim akan mengunjungi lokasi yang dilaporkan untuk menilai tingkat kerusakan dan menentukan prioritas perbaikan.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex items-center">
                                    <div className={`relative z-10 ${getStatusClass('Tindakan Perbaikan')} rounded-full p-2`}>
                                        <Image src='/images/tindakan.png' alt="Logo" height={20} width={25} />
                                    </div>
                                    <div className="ml-8">
                                        <p className="text-base">
                                            <span className="text-[#3A4750] font-semibold">Tindakan Perbaikan</span>
                                            <br /><span className="text-[#3A475099]">Perbaikan akan dijadwalkan dan dilaksanakan oleh tim pemeliharaan jalan.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex items-center">
                                    <div className={`relative z-10 ${getStatusClass('Selesai')} rounded-full p-2`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3F3F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <div className="ml-8">
                                        <p className="text-base">
                                            <span className="text-[#3A4750] font-semibold">Selesai</span>
                                            <br /><span className="text-[#3A475099]">Tindakan perbaikan selesai dilakukan.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 bg-[#f3f3f3] px-20 pt-10 pb-8 rounded shadow-md">
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
                        <FormWithMap onLocationChange={handleLocationChange} />
                        <input
                            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline outline-2 mb-4"
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        <Button
                            variant="secondary"
                            className="bg-[#2185D5] px-16 text-bold text-white hover:bg-[#0b69b7] w-full py-2"
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
            {/* {detections && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Detections:</h2>
                    <p className="mb-4">Number of potholes detected: {numPotholes}</p>
                    <button
                        className="bg-[#2185D5] text-white px-4 py-2 rounded hover:bg-[#0b69b7]"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                    {showDetails && (
                        <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(detections, null, 2)}</pre>
                    )}
                </div>
            )} */}
            <div className='text-center w-100 flex justify-center pt-16'>
                <hr className="border-[#2185D5] w-[150px] border-[2px]" />
            </div>
        </div>
    );
}

export default Form;