import React from 'react';
import styles from './Tentang.module.css';

const Tentang = () => {
    return (
        <div className={styles.tentangContainer}>
            <h1 className={styles.title}><b>Apa itu LintasLayak?</b></h1>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img src='./images/about.jpg' alt="Lintas Layak" className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        <b>LintasLayak</b> adalah sebuah platform yang didedikasikan untuk memfasilitasi pengaduan jalan berlubang di Kota Semarang. Kami memahami betapa pentingnya kondisi jalan yang aman dan nyaman bagi semua pengguna jalan. Oleh karena itu, kami hadir untuk membantu Anda melaporkan masalah jalan berlubang dengan mudah dan cepat.
                    </p>
                    <div className={styles.visiMisiContainer}>
                        <div className={styles.visi}>
                            <h2 className={styles.subTitle}><b>Visi</b></h2>
                            <p className={styles.textVisiMisi}>
                                Mewujudkan infrastruktur jalan yang lebih baik dan aman di Kota Semarang melalui partisipasi aktif dari masyarakat mengenai risiko keselamatan jalan.
                            </p>
                        </div>
                        <div className={styles.misi}>
                            <h2 className={styles.subTitle}><b>Misi</b></h2>
                            <ul className={styles.textVisiMisi}>
                                <li>Menyediakan platform pengaduan yang mudah digunakan oleh masyarakat.</li>
                                <li>Menghubungkan laporan dengan pihak berwenang untuk tindakan perbaikan yang cepat dan efisien.</li>
                                <li>Meningkatkan kesadaran masyarakat akan pentingnya kondisi jalan yang baik untuk keselamatan bersama.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tentang;