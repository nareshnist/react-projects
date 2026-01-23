import styles from './Sidebar.module.css'
import Logo from './Logo';
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom';

function SideBar() {
    return (
        <nav className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    Copyright {new Date().getFullYear()}  by WorldWise inc.
                </p>
            </footer>
        </nav>
    )
}

export default SideBar
