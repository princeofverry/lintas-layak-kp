import React from 'react';

const Statistika = () => {
    return (
        <div className="relative w-full h-[1000px] text-center mx-auto bg-[#F3F3F3] bg-center bg-no-repeat bg-[url('/images/peta.png')] bg-cover">
            <div className="relative top-1/5 transform -translate-y-1/3">
                <h2 className="font-poppins text-[40px] font-bold leading-[60px] text-[#2185D5] pt-[300px]">Jejak LintasLayak dalam Angka</h2>
                <div className="flex justify-around mt-5 p-8">
                    <div className="text-center">
                        <h3 className="font-poppins text-[50px] font-bold text-[#2185D5]">402</h3>
                        <p className="font-poppins text-[20px] font-semibold text-[#3A4750]">Laporan Diterima</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-[50px] font-bold text-[#2185D5]">372</h3>
                        <p className="font-poppins text-[20px] font-semibold text-[#3A4750]">Jalan Diperbaiki</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-[50px] font-bold text-[#2185D5]">90%</h3>
                        <p className="font-poppins text-[20px] font-semibold text-[#3A4750]">Tingkat Kepuasan Masyarakat</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-[50px] font-bold text-[#2185D5]">8</h3>
                        <p className="font-poppins text-[20px] font-semibold text-[#3A4750]">Instansi Kemitraan</p>
                    </div>
                </div>
            </div>
            <footer className="absolute w-full h-[250px] bottom-5 left-2.5 right-2.5 bg-[#2185D5] text-[#F3F3F3] text-left p-4">
                <p className="font-poppins text-[18px] leading-[30px] mx-16">Website ini dikelola oleh Dinas Kominfo Kota Semarang. Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132.</p>
                <p className="font-poppins text-[20px] mt-4 mx-16">© 2024 Dinas Kominfo Kota Semarang. All Right Reserved</p>
            </footer>
        </div>
    );
};

export default Statistika;
