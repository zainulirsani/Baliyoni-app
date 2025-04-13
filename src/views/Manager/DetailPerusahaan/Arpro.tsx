import React, { useEffect } from "react";
import $ from "jquery";
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net'; // Perbaikan di sini
import styles from "@/styles/Arpro.module.scss";
import LineChart from "@/components/elements/Chart/LineChart";
import { ArproType } from "@/type/arpro.type"; // Mengimpor tipe data ArproType
// Definisi tipe data untuk props menggunakan ArproType
interface ArproViewProps {
  data: ArproType[];
}

const ArproView: React.FC<ArproViewProps> = ({ data }) => {
  // Mengolah data untuk grafik
  const dataForChart = {
    labels: data.map((item) => item.tanggal), // Label tanggal dari API (menggunakan tanggal)
    datasets: [
      {
        label: "Jumlah Pre Sale",
        data: data.map((item) => item.jumlah_presale), // Mengambil jumlah pre-sale
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(34, 82, 0)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Menginisialisasi DataTables setelah data dimuat
    $('#dataTable').DataTable();
    
    // Cleanup function untuk menghentikan DataTables ketika komponen dibersihkan
    return () => {
      $('#dataTable').DataTable().destroy(true);
    };
  }, [data]); // Pastikan efek dijalankan setiap kali data berubah

  return (
    <section className="p-3">
      <header className={`${styles.header} d-flex justify-content-between`}>
        <h3 className={`${styles.header__h3}`}>ArPro</h3>
      </header>

      {/* Bagian Grafik */}
      <div className="card shadow-sm border-0">
        <div
          className={`${styles.chart} card-header d-flex justify-content-between align-items-center text-white`}
        >
          <h6 className="mb-0">Grafik Pre Sale</h6>
          <button
            className={`${styles.chart__toggleCard} btn btn-sm btn-outline-light`}
            data-bs-toggle="collapse"
            data-bs-target="#grafikPresaleCollapse"
            aria-expanded="true"
            aria-controls="grafikPresaleCollapse"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>
        <div className="card-body collapse show" id="grafikPresaleCollapse">
          <div className="chart-container" style={{ height: "300px" }}>
          <LineChart chartData={dataForChart} />
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Data Pre Sale</h5>
        </div>
        <div className="card-body">
          <table id="dataTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jumlah Pre Sale</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.tanggal}</td>
                  <td>{item.jumlah_presale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ArproView;