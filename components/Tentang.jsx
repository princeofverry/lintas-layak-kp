import React from 'react';

const Tentang = () => {
    return (
        <div id="about" className="p-5 pt-12 bg-[#F3F3F3]">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex justify-center mb-5 md:mb-0 md:mr-5 md:pt-15 pt-24">
                    <img src='./images/about.jpg' alt="Lintas Layak" className="w-[2000px] h-auto rounded-lg" />
                </div>
                <div className="flex-2 flex flex-col">
                    <h1 className="text-2xl text-[#2185D5] mb-5 leading-[60px] text-start md:px-24"><b>Apa itu LintasLayak?</b></h1>
                    <p className="text-base text-gray-600 text-justify mb-5 md:px-24">
                        <b>LintasLayak</b> adalah sebuah platform yang didedikasikan untuk memfasilitasi pengaduan jalan berlubang di Kota Semarang. Kami memahami betapa pentingnya kondisi jalan yang aman dan nyaman bagi semua pengguna jalan. Oleh karena itu, kami hadir untuk membantu Anda melaporkan masalah jalan berlubang dengan mudah dan cepat.
                    </p>
                    <div className="flex flex-col md:px-24">
                        <div className="bg f3f3f3 rounded-lg shadow mb-5 px-7 py-5">
                            <h2 className="text-xl text-[#2185D5] mb-2 text-center"><b>Visi</b></h2>
                            <p className="text-base text-gray-600 text-justify text-[15px]">
                                Mewujudkan infrastruktur jalan yang lebih baik dan aman di Kota Semarang melalui partisipasi aktif dari masyarakat mengenai risiko keselamatan jalan.
                            </p>
                        </div>
                        <div className="bg-f3f3f3 rounded-lg shadow mb-5 px-7 py-5">
                            <h2 className="text-xl text-[#2185D5] mb-2 text-center"><b>Misi</b></h2>
                            <ol className="text-base text-gray-600 text-justify list-decimal list-inside text-[15px]">
                                <li>Menyediakan platform pengaduan yang mudah digunakan oleh masyarakat.</li>
                                <li>Menghubungkan laporan dengan pihak berwenang untuk tindakan perbaikan yang cepat dan efisien.</li>
                                <li>Meningkatkan kesadaran masyarakat akan pentingnya kondisi jalan yang baik untuk keselamatan bersama.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center w-100 flex justify-center pt-16'>
                <hr class="border-[#2185D5] w-[150px] border-4"></hr>
            </div>
        </div>
    );
};

export default Tentang;