import dynamic from 'next/dynamic';

const Maps = dynamic(() => import('@/components/elements/maps/maps'), { ssr: false });
import styles from "@/styles/baligo.module.scss";
import { baligoType } from "@/types/baligo.type";
const BaligoView = ({ data }: { data: baligoType }) => {
    return (
        <section className="p-3">
            <header className={`${styles.header} d-flex justify-content-between`}>
                <h3 className={styles.header__h3}>Baligo</h3>
            </header>
            <div className="row px-1 gap-4 justify-content-center mb-3">
                <div className={`${styles.largeCard} col-xl-2 col-12 card`}>
                    <div
                        className={`${styles.largeCard__content} d-flex align-items-center justify-content-center`}
                    >
                        <div className={`${styles.largeCard__content__leftSection} text-center`}>
                            <h2 className={`${styles.largeCard__content__leftSection__number}`}>{data.user_count}</h2>
                        </div>
                        <div className={`${styles.largeCard__content__rightSection} text-center`}>
                            <i className="fas fa-user icon"></i>
                        </div>
                    </div>
                    <p className={`${styles.largeCard__description} text-center`}>Total Pelanggan</p>
                </div>
                <div className={`${styles.largeCard} col-xl-2 col-12 card`}>
                    <div
                        className={`${styles.largeCard__content} d-flex align-items-center justify-content-center`}
                    >
                        <div className={`${styles.largeCard__content__leftSection} text-center`}>
                            <h2 className={`${styles.largeCard__content__leftSection__number}`}>{data.kurir_count}</h2>
                        </div>
                        <div className={`${styles.largeCard__content__rightSection} text-center`}>
                            <i className="fas fa-person-walking icon"></i>
                        </div>
                    </div>
                    <p className={`${styles.largeCard__description} text-center`}>Total Kurir</p>
                </div>
                <div className={`${styles.largeCard} col-xl-2 col-12 card`}>
                    <div
                        className={`${styles.largeCard__content} d-flex align-items-center justify-content-center`}
                    >
                        <div className={`${styles.largeCard__content__leftSection} text-center`}>
                            <h2 className={`${styles.largeCard__content__leftSection__number}`}>{data.kendaraan_count}</h2>
                        </div>
                        <div className={`${styles.largeCard__content__rightSection} text-center`}>
                            <i className="fas fa-shipping-fast icon"></i>
                        </div>
                    </div>
                    <p className={`${styles.largeCard__description} text-center`}>Total Kendaraan</p>
                </div>
                <div className={`${styles.largeCard} col-xl-2 col-12 card`}>
                    <div
                        className={`${styles.largeCard__content} d-flex align-items-center justify-content-center`}
                    >
                        <div className={`${styles.largeCard__content__leftSection} text-center`}>
                            <h2 className={`${styles.largeCard__content__leftSection__number}`}>{data.pengiriman_count}</h2>
                        </div>
                        <div className={`${styles.largeCard__content__rightSection} text-center`}>
                            <i className="fas fa-dolly-flatbed icon"></i>
                        </div>
                    </div>
                    <p className={`${styles.largeCard__description} text-center`}>Total Proses Pengiriman</p>
                </div>
                <div className={`${styles.largeCard} col-xl-2 col-12 card`}>
                    <div
                        className={`${styles.largeCard__content} d-flex align-items-center justify-content-center`}
                    >
                        <div className={`${styles.largeCard__content__leftSection} text-center`}>
                            <h2 className={`${styles.largeCard__content__leftSection__number}`}>{data.pengiriman_selesai_count}</h2>
                        </div>
                        <div className={`${styles.largeCard__content__rightSection} text-center`}>
                            <i className="fas fa-box-open icon"></i>
                        </div>
                    </div>
                    <p className={`${styles.largeCard__description} text-center`}>Total Pengiriman Selesai</p>
                </div>
            </div>
            <div className="card px-1 gap-4 justify-content-center mb-3">
                <Maps />
            </div>
        </section>
    )
};

export default BaligoView;