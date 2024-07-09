import React from 'react'
import { Button } from '../ui/button'

const Form = () => {
    return (
        <div>
            <h1 className="text-[#2185D5] text-3xl font-bold text-center">
                Laporkan Jalan Berlubang di Daerah Anda
            </h1>
            <div className="border-b-4 border-[#2185D5] w-1/4 mx-auto mt-1"></div>
            <div>
                <div className='flex flex-row justify-evenly px-4'>
                    <div>
                        <p className='text-justify w-1/2'>
                            Kami menghargai partisipasi Anda dalam menjaga keamanan dan kenyamanan jalan di Kota Semarang. Jika Anda menemukan jalan berlubang, harap sampaikan laporan Anda melalui formulir di samping ini. Terima kasih atas kepedulian dan kerjasama Anda.
                        </p>
                        <h3 className="text-xl font-semibold">Cek Status Pengajuan Laporan Anda</h3>
                        <input className="shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Masukkan no laporan Anda" />
                        <Button variant="secondary" className="bg-[#2185D5] text-white hover:text-black">Cek Status</Button>
                    </div>
                    <div className="rounded">
                        <div>
                            <input className="w-full shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight " id="email" type="text" placeholder='Email' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form