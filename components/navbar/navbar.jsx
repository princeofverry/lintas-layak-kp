'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleHambergerClick = () => {
            const sidenav = document.querySelector('[itemID="sidenav"]');
            sidenav.classList.remove('hidden');
        };

        const handleCloseIconClick = () => {
            const sidenav = document.querySelector('[itemID="sidenav"]');
            sidenav.classList.add('hidden');
        };

        const hamberger = document.querySelector('[itemID="hamberger"]');
        const closeIcon = document.querySelector('[itemID="closeicon"]');

        if (hamberger && closeIcon) {
            hamberger.addEventListener('click', handleHambergerClick);
            closeIcon.addEventListener('click', handleCloseIconClick);
        }

        return () => {
            if (hamberger && closeIcon) {
                hamberger.removeEventListener('click', handleHambergerClick);
                closeIcon.removeEventListener('click', handleCloseIconClick);
            }
        };
    }, []);

    return (
        <header className={`fixed top-0 z-50 right-0  w-full  flex items-center justify-between px-8 py-4 transition-all duration-300 ${isScrolled ? ' bg-[#2185D5]' : 'bg-transparent'}`}>
            <div className="flex items-center justify-start gap-4">
                <Image src='/images/logooo.png' alt="Logo" width={200} height={100} className='hidden md:block' />
                <Image src='/images/logooo.png' alt="Logo" width={120} height={100} className='block md:hidden' />
                <ul className="md:flex gap-10 text-white hidden">
                    <li>
                        <a href="#about" className={`font-semibold text-md no-underline hover:text-gray-700`}>TENTANG</a>
                    </li>
                    <li>
                        <a href="#statistics" className={`font-semibold text-md no-underline hover:text-gray-700`}>STATISTIKA</a>
                    </li>
                </ul>
                <button className="absolute right-0 pr-8" itemID='hamberger'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='md:hidden' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                </button>
                <div itemID='sidenav' className='bg-[#2185D5] w-max h-full fixed top-0 right-0 z-20 pl-6 pr-10 hidden'>
                    <div itemID='closeicon' className='flex justify-end pt-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                    <Image src='/images/logooo.png' alt="Logo" width={165} height={100} className='block md:hidden pt-7' />
                    <ul className="md:hidden gap-5 text-white flex flex-col pt-9 pl-4 ">
                        <li className='flex justify-start items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                            <a href="#about" className={`ml-4 text-[13px] no-underline hover:text-gray-700`}>TENTANG</a>
                        </li>
                        <li className='flex justify-start items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
                            <a href="#statistics" className={`ml-4 text-[13px] no-underline hover:text-gray-700`}>STATISTIKA</a>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className="md:flex items-center hidden">
                <Link href="/admin">
                    <button className="bg-white text-[#2185D5] px-10 border-none rounded-lg shadow-md font-bold text-lg text-center leading-6 cursor-pointer py-2">
                        LOGIN
                    </button>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
