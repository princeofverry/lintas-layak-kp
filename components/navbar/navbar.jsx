import React from 'react';
import styles from '@/components/LandingPage.module.css';

const Navbar = () => {
    return (
        <div className={styles.landingPage}>
            <header className={styles.header}>
                <div className={styles.navbar}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="Lintas Layak" />
                        {/* <span>Lintas Layak</span> */}
                    </div>
                    <nav>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}><a href="#Tentang" className={styles.navLink}>Tentang</a></li>
                            <li className={styles.navItem}><a href="#stats" className={styles.navLink}>Statistika</a></li>
                        </ul>
                    </nav>
                    <div className={styles.login}>
                        <button className={styles.loginBtn}>Login</button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;