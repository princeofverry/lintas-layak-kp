import React from 'react';

const Statistika = () => {
    return (
        <div id='statistics' className="relative h-screen w-100 text-center mx-auto bg-[#F3F3F3] bg-center bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/peta.png') "}}>
            <div className="relative pt-20">
                <h2 className="font-poppins text-4xl font-bold leading-12 text-[#2185D5] pt-32">Jejak LintasLayak dalam Angka</h2>
                <div className="flex justify-around mt-5 p-8">
                    <div className="text-center">
                        <h3 className="font-poppins text-3xl font-bold text-[#2185D5]">402</h3>
                        <p className="font-poppins text-lg font-semibold text-[#3A4750]">Laporan Diterima</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-3xl font-bold text-[#2185D5]">372</h3>
                        <p className="font-poppins text-lg font-semibold text-[#3A4750]">Jalan Diperbaiki</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-3xl font-bold text-[#2185D5]">90%</h3>
                        <p className="font-poppins text-lg font-semibold text-[#3A4750]">Tingkat Kepuasan Masyarakat</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-poppins text-3xl font-bold text-[#2185D5]">8</h3>
                        <p className="font-poppins text-lg font-semibold text-[#3A4750]">Instansi Kemitraan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistika;