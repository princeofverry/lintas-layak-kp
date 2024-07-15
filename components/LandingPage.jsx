import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src='/images/logooo.png' alt="Logo" />
                </div>
                <nav className={styles.navbar}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <a href="#about" className={styles.navLink}>TENTANG </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#statistics" className={styles.navLink}> STATISTIKA</a>
                        </li>
                    </ul>
                    <button className={styles.loginBtn}>LOGIN</button>
                </nav>
            </header>
            <div className={styles.hero}>
                <div className={styles.backgroundEllipse1}></div>
                <div className={styles.heroImage}></div>
                <div className={styles.backgroundEllipse2}></div>
                <div className={styles.backgroundEllipse3}></div>
                <div className={styles.heroText}>
                    <h1>Selamat Datang di Portal Pengaduan Jalan Berlubang</h1>
                    <p>Jalan berlubang dapat membahayakan keselamatan kita semua. Sampaikan laporan Anda mengenai kondisi jalan yang perlu diperbaiki.</p>
                    <button className={styles.reportBtn}>Laporkan Sekarang!</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;