import React from 'react';

const LandingPage = () => {
    return (
        <div className="relative w-full h-screen bg-[#F3F3F3] font-poppins">
            <div className='block md:hidden'>
                <img src='/images/Rectangle 1.png' className="w-full h-screen absolute top-6 z-0" />
            </div>
            <div className='block md:hidden'>
                <img src='/images/Rectangle 2.png' className="w-full h-screen absolute top-0 z-1" />
            </div>
            <div className="relative w-full h-[600px] md:bg-[#2185D5]">
                <div className="absolute z-10 top-24 left-8 md:left-16 max-w-[464px]">
                    <h1 className="text-[22px] md:text-[42px] font-bold text-[#F3F3F3] w-[282px] md:w-full mb-4 md:mb-12">Selamat Datang di Portal Pengaduan Jalan Berlubang</h1>
                    <p className="text-base md:text-[22px] font-normal text-[#F3F3F3] w-[270px] md:w-full mb-12">Jalan berlubang dapat membahayakan keselamatan kita semua. Sampaikan laporan Anda mengenai kondisi jalan yang perlu diperbaiki.</p>
                    <a href="#form"><button className="w-[215px] h-[60px] bg-[#F3F3F3] text-[#2185D5] border-none rounded-lg shadow-md font-bold text-[18px] leading-[25px] text-center cursor-pointer">Laporkan Sekarang!</button></a>
                </div>
                <div className='hidden md:block'>
                    <img src='/images/landing page bg.png' alt="Logo" className="w-screen rem h-screen  absolute top-0 z-0" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;