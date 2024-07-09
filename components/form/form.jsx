import React from 'react'
import { Button } from '../ui/button'

const Form = () => {
    return (
        <div>
            <h1 className="text-[#2185D5] text-3xl font-bold text-center">
                Laporkan Jalan Berlubang di Daerah Anda
            </h1>
            <div className="border-b-4 border-[#2185D5] w-1/4 mx-auto mt-1 my-4"></div>
            <div>
                <div className='flex flex-row justify-evenly px-8'>
                    <div className='w-1/2'>
                        <p className='text-justify pr-12'>
                            Kami menghargai partisipasi Anda dalam menjaga keamanan dan kenyamanan jalan di Kota Semarang. Jika Anda menemukan jalan berlubang, harap sampaikan laporan Anda melalui formulir di samping ini. Terima kasih atas kepedulian dan kerjasama Anda.
                        </p>
                        <h3 className="text-xl font-semibold my-4">Cek Status Pengajuan Laporan Anda</h3>
                        <input className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Masukkan no laporan Anda" />
                        <button dir="rtl" className="bg-[#2185D5] rounded-s-lg px-3 py-2 hover:bg-[#0b69b7] text-white">Cek Status</button>
                    </div>
                    <div className="rounded w-1/2 ">
                        <div>
                            <input className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4" id="email" type="text" placeholder='Email' />
                            <input className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4" id="judul-laporan" type="text" placeholder='Judul Laporan' />
                            <textarea className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4" id="isi-laporan" type="text" placeholder='Isi Laporan' />
                            <input className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight outline outline-2 mb-4" id="alamat-laporan" type="text" placeholder='Alamat Laporan' />
                            <input className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" />
                            <div className="flex justify-end my-4">
                                <Button variant="secondary" className="bg-[#2185D5] px-16 text-bold hover:bg-[#0b69b7] text-white">KIRIM</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Form