import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./dashboard.module.scss";
import { PerusahaanType } from "@/types/Perusahaan.type";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import PerusahaanFormModal from "@/components/elements/Form/Perusahaan";
import Image from 'next/image';

const Bootstrap = dynamic(() => import("bootstrap/dist/js/bootstrap.bundle.min.js"), { ssr: false });

const Dashboard = ({ perusahaans }: { perusahaans: PerusahaanType[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPerusahaan, setSelectedPerusahaan] = useState<PerusahaanType | null>(null);
  const [perusahaanList, setPerusahaanList] = useState<PerusahaanType[]>(perusahaans);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/perusahaan/delete/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            setPerusahaanList((prev) => prev.filter((p) => p.id !== id));
            Swal.fire("Terhapus!", "Data telah berhasil dihapus.", "success");
          } else {
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          }
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan pada jaringan.", "error");
        }
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      let url = "http://127.0.0.1:8000/api/perusahaan/create";
      let method = "POST";

      if (selectedPerusahaan) {
        url = `http://127.0.0.1:8000/api/perusahaan/update/${selectedPerusahaan.id}`;
        formData.append("_method", "PUT"); // Laravel membutuhkan ini untuk update
      }

      const response = await fetch(url, {
        method: "POST", // Tetap pakai POST karena ada file dalam FormData
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setPerusahaanList((prev) => 
          selectedPerusahaan 
            ? prev.map((p) => (p.id === selectedPerusahaan.id ? result : p)) 
            : [...prev, result]
        );
        Swal.fire("Berhasil!", "Data perusahaan berhasil disimpan.", "success");
        handleCloseModal();
        router.reload();
      } else {
        console.error("Error Response:", result);
        Swal.fire("Gagal!", result.message || "Terjadi kesalahan saat menyimpan data.", "error");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan pada jaringan.", "error");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (perusahaan: PerusahaanType) => {
    setSelectedPerusahaan(perusahaan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPerusahaan(null);
    setShowModal(false);
  };

  const filteredPerusahaans = perusahaanList.filter(
    (perusahaan) =>
      perusahaan.nama_perusahaan &&
      perusahaan.nama_perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-3">
      <div className="row px-1 mb-2 gap-4 justify-content-end ms-4">
        <input
          type="text"
          placeholder="Cari perusahaan"
          className={`${styles.search} form-control mx-2`}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <header className={`${styles.header} d-flex align-items-center justify-content-between`}>
        <h3 className={`${styles.header__h3} text-center flex-grow-1`}>Daftar Anak Perusahaan</h3>
        <button type="button" className="btn btn-success btn-sm" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-1"></i> Tambah Perusahaan
        </button>
      </header>

      {showModal && (
        <PerusahaanFormModal
          showModal={showModal}
          selectedPerusahaan={selectedPerusahaan}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="row px-1 mb-2 gap-4 justify-content-start ms-4">
        {filteredPerusahaans.map((perusahaan) => (
          <div key={perusahaan.id} className={`${styles.card} col-xl-2 col-12`}>
            <div className={styles.card__header}>
              <button className="btn btn-link p-0 text-secondary border-0" type="button" data-bs-toggle="dropdown">
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className={`${styles.card__menu} dropdown-menu dropdown-menu-end`}>
                <li>
                  <button className="dropdown-item text-primary" onClick={() => handleOpenModal(perusahaan)}>
                    <i className="fas fa-edit me-2"></i>Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={() => handleDelete(perusahaan.id)}>
                    <i className="fas fa-trash-alt me-2"></i>Delete
                  </button>
                </li>
              </ul>
            </div>
            <h2 className={styles.card__title}>{perusahaan.nama_perusahaan}</h2>
            <Image
              src={`http://127.0.0.1:8000/uploads/${perusahaan.logo}`}
              alt={`Logo ${perusahaan.nama_perusahaan}`}
              className={styles.card__img}
              width={300}
              height={300}
            />
             <a href="#" className={`${styles.card__btn} text-center`}>
              Detail
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;

// Menggunakan Server-Side Rendering (SSR)
export async function getServerSideProps() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/perusahaan");
    const perusahaans = await response.json();

    return {
      props: { perusahaans },
    };
  } catch (error) {
    console.error("Error fetching perusahaan:", error);
    return { props: { perusahaans: [] } };
  }
}
