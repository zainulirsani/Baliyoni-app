import React, { useEffect } from "react";
import $ from "jquery";
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import styles from "@/styles/Approval.module.scss";
import LineChart from "@/components/elements/Chart/LineChart";

const ApprovalView = ({ data }: { data: any }) => {

    useEffect(() => {
        if ($.fn.dataTable.isDataTable("#dataTable")) {
          $("#dataTable").DataTable().destroy();
        }
      
        $("#dataTable").DataTable({
          scrollX: true,
          scrollCollapse: true,
          autoWidth: true,
          createdRow: function (row) {
            $(row).css("font-size", "12px");
          }
        });
      }, [data]);
      

    const dataForChart = data.total_harga.map((item: any, index: number) => ({
        date_approval: item.date_approval, // Tanggal approval untuk setiap item
        total_harga: item.total_harga, // Total harga
        total_nego: data.total_nego[index]?.total_nego || 0, // Total nego dari array lain
    }));


    return (
        <section className="p-3">
            <header className={`${styles.header} d-flex justify-content-between`}>
                <h3 className={`${styles.header__h3}  flex-grow-1`}>Approval</h3>
            </header>
            <div className="row px-1 mb-3 gap-4 justify-content-center">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <div className={`${styles.customCard} col-xl-3 col-12 card bg-success`}>
                        <p className={`${styles.customCard__title}`}>Approved</p>
                        <h2 className={`${styles.customCard__value}`}>{data.approved}</h2>
                    </div>
                    <div className={`${styles.customCard} col-xl-3 col-12 card bg-warning`}>
                        <p className={`${styles.customCard__title}`}>Pending</p>
                        <h2 className={`${styles.customCard__value}`}>{data.pending}</h2>
                    </div>
                    <div className={`${styles.customCard} col-xl-3 col-12 card bg-danger`}>
                        <p className={`${styles.customCard__title}`}>Ditolak</p>
                        <h2 className={`${styles.customCard__value}`}>{data.ditolak}</h2>
                    </div>
                    <div className={`${styles.customCard} col-xl-3 col-12 card bg-secondary`}>
                        <p className={`${styles.customCard__title}`}>Belum diapprove</p>
                        <h2 className={`${styles.customCard__value}`}>{data.belum_diapprove}</h2>
                    </div>
                </div>
            </div>
            <div className="row px-1 mb-3 gap-4 justify-content-center">
                <div className="d-flex flex-wrap gap-3">
                    <div className={`${styles.statCard} card`}>
                        <div className={`${styles.statCard__header}`}>
                            <h5 className={`${styles.statCard__header__title}`}>Statistik</h5>
                        </div>
                        <div className="card-body">
                            <div className="row px-1 mb-2 gap-3 justify-content-center">
                                <div className={`${styles.statChard__chartContainer}`}>
                                    <LineChart chartData={{
                                        labels: dataForChart.map((item: { date_approval: string }) => item.date_approval),
                                        datasets: [{
                                            label: "Total Harga",
                                            data: dataForChart.map((item: { total_harga: number }) => item.total_harga),
                                            borderColor: "rgb(75, 192, 192)",
                                            backgroundColor: "rgba(75, 192, 192, 0.2)"
                                        }]
                                    }} titleX="Tanggal Approval" titleY="Total Harga" />
                                </div>
                                <div className={`${styles.statCard__statistic} col-xl-4 col-12 bg-success`}>
                                    <p>Total Keseluruhan SO:</p>
                                    <h3>
                                        {data.total_so?.total_so
                                            ? new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(data.total_so.total_so)
                                            : "Data tidak tersedia"}
                                    </h3>
                                </div>
                                <div className={`${styles.statCard__statistic} col-xl-4 col-12 bg-warning`}>
                                    <p>Total Nego Keseluruhan SO:</p>
                                    <h3>{data.total_so?.total_so
                                        ? new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(data.total_nego_so?.total_so || 0)
                                        : "Data tidak tersedia"}</h3>
                                </div>
                                <div className={`${styles.statCard__statistic} col-xl-4 col-12 bg-secondary`}>
                                    <p>Total Selisih Keseluruhan SO:</p>
                                    <h3>
                                        {data.total_so?.total_so
                                            ? new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(data.selisih || 0)
                                            : "Data tidak tersedia"}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.statCard} card mt-3`}>
                        <div className={`${styles.statCard__header}`}>
                            <h5 className={`${styles.statCard__header__title}`}>Data Approval</h5>
                        </div>
                        <div className="card-body">
                            <div className="row px-1 mb-2 justify-content-center">
                                <div className="table-responsive-wrapper">
                                    <table id="dataTable" className="display">
                                        <thead>
                                            <tr>
                                                <th>NO.SQ</th>
                                                <th>Total Harga</th>
                                                <th>User</th>
                                                <th>Instansi</th>
                                                <th>Keterangan SQ</th>
                                                <th>Keterangan Approval</th>
                                                <th>Status</th>
                                                <th>Last Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.data_approval?.map((item: any, index: number) => (
                                                <tr key={index}>
                                                    <td>{item.no_sq}</td>
                                                    <td>
                                                        {new Intl.NumberFormat("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }).format(item.total_harga)}
                                                    </td>
                                                    <td>{item.user}</td>
                                                    <td>{item.instansi}</td>
                                                    <td>{item.keterangan_sq}</td>
                                                    <td>{item.keterangan_approval}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.last_update}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApprovalView;
