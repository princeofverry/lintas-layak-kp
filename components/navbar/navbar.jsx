import React from 'react';

const Navbar = () => {
    return (
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
    );
};

export default Navbar;