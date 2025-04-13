import { useState } from 'react';
import styles from './akun.module.scss';
import Image from 'next/image';
import AkunFormModal from '@/components/elements/Form/Akun';

const AkunViews = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    return (
        <section className={`p-4 ${styles.akunContainer}`}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className={`card shadow-sm ${styles.cardCustom}`}>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <Image
                                    src="/images/avatar.jpg"
                                    width={120}
                                    height={120}
                                    className={`${styles.profilePic} rounded-circle`}
                                    alt="Foto Profil"
                                />
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item ${styles.listItem}`}>
                                    <strong>Nama</strong> <span>: John Doe</span>
                                </li>
                                <li className={`list-group-item ${styles.listItem}`}>
                                    <strong>Username</strong> <span>: johndoe</span>
                                </li>
                                <li className={`list-group-item ${styles.listItem}`}>
                                    <strong>Password</strong> <span>: ********</span>
                                </li>
                            </ul>

                            <div className="d-grid mt-4">
                                <button
                                    className={`btn btn-primary ${styles.btnCustom}`}
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit Akun
                                </button>
                            </div>
                        </div>
                    </div>
                    {showModal && (
                                    <AkunFormModal
                                        showModal={showModal}
                                        handleCloseModal={handleCloseModal}
                                    />
                                )}
                </div>
            </div>
        </section>
    )
}

export default AkunViews;
