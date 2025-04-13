import styles from "./users.module.scss";
import { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import { UserType } from '@/type/User.type';
import Users from "@/components/elements/Form/Users";
import Swal from "sweetalert2";
import { PerusahaanType } from "@/type/Perusahaan.type";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const UserView = ({ users, devisis }: { users: UserType[], devisis: PerusahaanType[] }) => {
    useEffect(() => {
        const $table = $('#dataTable');
    
        // @ts-ignore
        if ($.fn.DataTable.isDataTable($table)) {
            $table.DataTable().clear().destroy();
        }
    
        $table.DataTable();
    
        return () => {
            // @ts-ignore
            if ($.fn.DataTable.isDataTable($table)) {
                $table.DataTable().destroy();
            }
        };
    }, [users]);
    

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

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
                    const response = await fetch(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        Swal.fire("Terhapus!", "Data telah berhasil dihapus.", "success");
                        router.reload();
                    } else {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
                    }
                } catch (error) {
                    Swal.fire("Gagal!", "Terjadi kesalahan pada jaringan.", "error");
                }
            }
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: any) => {
        event.preventDefault();
        const formDataToSend = new FormData();
    
        // Looping untuk menambahkan data ke FormData
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
    
        // Tentukan apakah ini update atau create
        const isUpdate = !!selectedUser;
        const apiUrl = isUpdate
            ? `http://127.0.0.1:8000/api/user/update/${selectedUser.id}`
            : "http://127.0.0.1:8000/api/user/create";
    
        if (isUpdate) {
            formDataToSend.append("_method", "PUT");
        }
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST", // Tetap gunakan POST karena ada FormData
                body: formDataToSend,
            });
    
            const responseData = await response.json();
            console.log('🔹 Status Response:', response.status);
            console.log('🔹 Response dari API:', responseData);
    
            if (response.ok) {
                Swal.fire({
                    title: "Berhasil!",
                    text: isUpdate ? "Data berhasil diperbarui." : "Data berhasil disimpan.",
                    icon: "success",
                    confirmButtonText: "Oke",
                }).then(() => {
                    window.location.reload(); // Gunakan window.location.reload() untuk semua proyek
                });
    
                handleCloseModal();
            } else {
                Swal.fire({
                    title: "Gagal!",
                    text: responseData.message || "Terjadi kesalahan saat menyimpan data.",
                    icon: "error",
                    confirmButtonText: "Oke",
                });
            }
        } catch (error) {
            console.error('🔴 Error:', error);
            Swal.fire("Gagal!", "Terjadi kesalahan pada jaringan.", "error");
        }
    };
    



    const handleOpenModal = (user: UserType | null = null) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    return (
        <section className="p-3">
            <div className="row align-items-end">
                <header className={`${styles.header} d-flex align-items-center justify-content-between`}>
                    <h3 className={`${styles.header__h3} text-center flex-grow-1`}>Daftar User</h3>
                    <button type="button" className="btn btn-success btn-sm" onClick={() => handleOpenModal()}>
                        <i className="fas fa-plus me-1"></i> Tambah User
                    </button>
                </header>

                {showModal && (
                    <Users
                        showModal={true}
                        selectedUser={selectedUser}
                        handleCloseModal={handleCloseModal}
                        handleSubmit={handleSubmit} // ✅ Tambahkan ini
                        devisis={devisis}
                    />
                )}

                <div className="card">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <table id="dataTable" className="display" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user: UserType, index: number) => (
                                            <tr key={user.id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{user.name || 'Tidak tersedia'}</td>
                                                <td>{user.email || 'Tidak tersedia'}</td>
                                                <td>{user.role || 'Tidak tersedia'}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-sm me-1"
                                                        onClick={() => handleOpenModal(user)}>
                                                        <FontAwesomeIcon icon={faPen} className="me-1" /> Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <i className="fas fa-trash-alt me-2"></i> Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center">
                                                Tidak ada data pengguna.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserView;
