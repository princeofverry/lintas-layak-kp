import React from 'react';

const Tentang = () => {
    return (
        <div className="p-5 pt-12 bg-[#F3F3F3]">
            <h1 className="text-2xl text-[#2185D5] mb-5 leading-[60px] text-center"><b>Apa itu LintasLayak?</b></h1>
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex justify-center mb-5 md:mb-0 md:mr-5 md:pt-15">
                    <img src='./images/about.jpg' alt="Lintas Layak" className="w-[600px] h-[385px] rounded-lg" />
                </div>
                <div className="flex-2 flex flex-col">
                    <p className="text-base text-gray-600 text-justify mb-5 md:px-24">
                        <b>LintasLayak</b> adalah sebuah platform yang didedikasikan untuk memfasilitasi pengaduan jalan berlubang di Kota Semarang. Kami memahami betapa pentingnya kondisi jalan yang aman dan nyaman bagi semua pengguna jalan. Oleh karena itu, kami hadir untuk membantu Anda melaporkan masalah jalan berlubang dengan mudah dan cepat.
                    </p>
                    <div className="flex flex-col md:px-24">
                        <div className="bg-white p-5 rounded-lg shadow mb-5">
                            <h2 className="text-xl text-[#2185D5] mb-2 text-center"><b>Visi</b></h2>
                            <p className="text-base text-gray-600 text-justify mb-5">
                                Mewujudkan infrastruktur jalan yang lebih baik dan aman di Kota Semarang melalui partisipasi aktif dari masyarakat mengenai risiko keselamatan jalan.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow mb-5">
                            <h2 className="text-xl text-[#2185D5] mb-2 text-center"><b>Misi</b></h2>
                            <ul className="text-base text-gray-600 text-justify list-disc list-inside">
                                <li>Menyediakan platform pengaduan yang mudah digunakan oleh masyarakat.</li>
                                <li>Menghubungkan laporan dengan pihak berwenang untuk tindakan perbaikan yang cepat dan efisien.</li>
                                <li>Meningkatkan kesadaran masyarakat akan pentingnya kondisi jalan yang baik untuk keselamatan bersama.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tentang;
