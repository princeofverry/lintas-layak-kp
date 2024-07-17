import React from 'react'

const Footer = () => {
    return (
        <footer className="w-100 bottom-0 left-0 px-8 bg-[#2185D5] text-[#F3F3F3] text-left p-4">
            <div className="pb-4">
                    <img src='/images/logooo.png' alt="Logo" className="w-[250px] h-[50px]" />
            </div>
            <p className="font-poppins text-[12px] md:text-base leading-8">Website ini dikelola oleh Dinas Kominfo Kota Semarang.</p>
            <p className="font-poppins text-[12px] md:text-base leading-8 pb-8">Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132.</p>
            <hr className='hidden md:block'/>
            <div className='flex flex-col-reverse md:flex-row justify-between items-start md:items-center pt-4'>
                <div className='flex w-full'>
                    <p className="font-poppins text-[12px] md:text-base font-[40px] my-6 md:my-0">&copy; 2024 Dinas Kominfo Kota Semarang. All Right Reserved</p>
                </div>
                <div className="flex flex-col w-100 h-4 mb-6 md:mb-0 w-full">
                    <div className='flex md:justify-end justify-items-end mb-6 md:mb-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='mx-2' width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" className='mx-2 bg-white rounded-full' height="18" viewBox="0 0 24 24" fill="#2185D5" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <img src='/images/x.png' alt="Logo" className='mx-2'/>
                    <svg xmlns="http://www.w3.org/2000/svg"className='mx-2' width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className='mx-2' width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    <img src='/images/youtube.png' alt="Logo" className='mx-2'/>
                    </div>
                    <hr className='block md:hidden'/>
                </div>
            </div>
        </footer>
    )
}

export default Footer