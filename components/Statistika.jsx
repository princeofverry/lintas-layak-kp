import React from 'react';
import styles from './Statistika.module.css';
// import image from '/mnt/data/image.png'; // Adjust the path if necessary

const Statistika = () => {
    return (
        <div className={`${styles.statistikaContainer} ${styles.statistikaBackground}`}>
            <div className={styles.content}>
                <h2 className={styles.title}>Jejak LintasLayak dalam Angka</h2>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <h3>402</h3>
                        <p>Laporan Diterima</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>372</h3>
                        <p>Jalan Diperbaiki</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>90%</h3>
                        <p>Tingkat Kepuasan Masyarakat</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>8</h3>
                        <p>Instansi Kemitraan</p>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <p>
                    Website ini dikelola oleh Dinas Kominfo Kota Semarang.
                    Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132.
                </p>
                <p>
                    © 2024 Dinas Kominfo Kota Semarang. All Right Reserved 
                </p>
            </footer>
        </div>
    );
};

export default Statistika;