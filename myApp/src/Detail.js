import React, { useState } from 'react';
import img1 from './image/img1.jpeg';
import './product.css';

export default function Detail() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return ( 
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">Chi tiết tác phẩm</h2>

            <div className="row justify-content-center">
                <div className="col-lg-8 bg-white shadow-sm p-4 rounded">
                    <div className="d-flex">
                        <div className="image-container position-relative" onClick={openModal}>
                            <img src={img1} className="img-fluid rounded" alt="Pháo 105mm" />
                            <div className="overlay">
                                <span className="preview-text">Preview</span>
                            </div>
                        </div>

                        <div className="text-container ms-4">
                            <h3 className="text-success mb-3">Pháo 105mm của Đại đội 806</h3>
                            <p>
                                Pháo 105mm của Đại đội 806 Pháo mặt đất 105mm, số hiệu 14683 do Mỹ sản xuất viện trợ cho Pháp.
                                Bộ đội Việt Nam thu được trong trận đánh đồn Nghĩa Lộ, chiến dịch Tây Bắc năm 1952. Đây là một trong
                                những khẩu pháo bắn loạt đầu tiên, đội bão lửa lên đầu giặc Pháp trong trận đánh cứ điểm Him Lam ngày
                                13/3/1954, mở màn Chiến dịch Điện Biên Phủ.
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Modal for large image */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img src={img1} className="modal-img" alt="Large Pháo 105mm" />
                        <button className="close-btn" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}
