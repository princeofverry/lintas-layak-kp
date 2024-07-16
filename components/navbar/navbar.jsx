'use client'
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

    return (
        <header className={`fixed top-0 z-10 w-full flex items-center justify-between px-8 py-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md shadow-lg bg-[#2185D5]' : 'bg-transparent'}`}>
            <div className="flex items-center justify-start gap-4">
                <img src='/images/logooo.png' alt="Logo" width={200} height={100} />
                <ul className="flex gap-10 text-white">
                    <li>
                        <a href="#about" className={`font-semibold text-md no-underline hover:text-gray-700`}>TENTANG</a>
                    </li>
                    <li>
                        <a href="#statistics" className={`font-semibold text-md no-underline hover:text-gray-700`}>STATISTIKA</a>
                    </li>
                </ul>
            </div>
            <nav className="flex items-center">
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
