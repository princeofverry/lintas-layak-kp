import React from 'react';

const LandingPage = () => {
    return (
        <div className="relative w-full h-[1000px] bg-[#F3F3F3] font-poppins">
                            <div className='w-[100%] h-32 bg-[#2185D5] z-0 absolute top-0 left-0'></div>
            <header className="relative z-10 w-full h-[93.48px] bg-transparent flex items-center justify-between p-5 shadow-md">
                <div className="ml-8">
                    <img src='/images/logooo.png' alt="Logo" className="w-[250px] h-[50px]" />
                </div>
                <nav className="flex justify-center items-center ml-12 flex-grow">
                    <ul className="flex items-center list-none m-0 p-0 flex-grow">
                        <li className="mr-8">
                            <a href="#about" className="text-[#F3F3F3] font-semibold text-[16px] no-underline">TENTANG</a>
                        </li>
                        <li className="mr-8">
                            <a href="#statistics" className="text-[#F3F3F3] font-semibold text-[16px] no-underline">STATISTIKA</a>
                        </li>
                    </ul>
                    <button className="bg-[#F3F3F3] text-[#2185D5] border-none rounded-lg shadow-md font-bold text-[20px] text-center leading-[30px] cursor-pointer px-5 py-2 ml-5 w-[150px]">LOGIN</button>
                </nav>
            </header>
            <div className="relative w-full h-[600px] bg-[#2185D5]">
                <div className="absolute z-10 top-12 left-16 max-w-[464px]">
                    <h1 className="text-[42px] font-bold text-[#F3F3F3] mb-12">Selamat Datang di Portal Pengaduan Jalan Berlubang</h1>
                    <p className="text-[22px] font-normal text-[#F3F3F3] mb-12">Jalan berlubang dapat membahayakan keselamatan kita semua. Sampaikan laporan Anda mengenai kondisi jalan yang perlu diperbaiki.</p>
                    <a href="#form"><button className="w-[215px] h-[60px] bg-[#F3F3F3] text-[#2185D5] border-none rounded-lg shadow-md font-bold text-[18px] leading-[25px] text-center cursor-pointer">Laporkan Sekarang!</button></a>
                </div>
                <div className="ml-0">
                    <img src='/images/fix.png' alt="Logo" className="w-[100%] h-[1150.5px] absolute top-0 z-0 mt-[-300px]" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;