import React, { useState } from 'react';

interface AkunFormModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
}

const AkunFormModal: React.FC<AkunFormModalProps> = ({ showModal, handleCloseModal }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Edit Akun</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleCloseModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form id="editAccountForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nama</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editProfile" className="form-label">Foto Profil</label>
                                <input type="file" className="form-control" id="editProfile" />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="editPassword"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary toggle-password"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} id="passwordIcon"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AkunFormModal;
