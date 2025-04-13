import { useEffect, useState } from 'react';
import styles from "./navbar.module.css";
import Image from 'next/image';

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      setUserName(user.name || '');
    }
  }, []);

  if (userName === null) {
    return null; // Tidak render sebelum data tersedia
  }

  return (
    <nav className="navbar navbar-expand-lg my-2" style={{ backgroundColor: '#f8f9fc' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Tombol Sidebar (desktop & mobile) */}
        <button
          type="button"
          className="btn p-0 border-0"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars fs-5"></i>
        </button>


        {/* Profil User */}
        <div className={`d-flex align-items-center gap-4 ${styles.userProfile}`}>
          <span className={styles.userName}>{userName}</span>
          <a href="/kelola_akun">
            <Image
              src="/images/user.png"
              alt="Photo Profile"
              className={styles.avatar}
              width={40}
              height={40}
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
