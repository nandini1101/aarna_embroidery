import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import ProductImages from './ProductImages';
import ProductDetails from './ProductDetails';
import ModalForm from './ModalForm';
import '../styles.css';
import loadingGif from '../loading.gif';
import { initiatePayment, shareProduct } from '../utils';

Modal.setAppElement('#root'); // For accessibility

const AarnaEmbroideryStudio = () => {
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        hno:'',
        street: '',
        village: '',
        district: '',
        state:'',
        pincode: '',
        country: '',
        color: '',
        quantity: 1,
        price: 650
    });
    
    const productImages = [
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702660/mcwnfg5nsa7ec0hurmro.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702661/vd0vpkajisrvwvnd3b1y.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702662/ark07p3yp9mtfxaazpdx.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702660/nexgfptpnlc8e2ekozqg.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702663/x2v9gucf6cpz4sbqjrak.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702658/qisfwnafzwt3gfe55m8u.jpg"
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1300);
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleInputChange = (property) => {
        return (e) => {
            setUserDetails(prevUserDetails => ({
                ...prevUserDetails,
                [property]: e.target.value
            }));
        };
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        initiatePayment(userDetails, userDetails.quantity*userDetails.price);
    };

    return (
        <>
            {loading ? (
                <div id="loading">
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : (
                <div id="content">
                    <Navbar />
                    <div className="container my-4">
                        <div className="row align-items-center">
                            <ProductImages 
                                productImages={productImages} 
                                currentImageIndex={currentImageIndex} 
                                setCurrentImageIndex={setCurrentImageIndex} 
                            />
                            <ProductDetails 
                                currentImageIndex={currentImageIndex} 
                                openModal={openModal} 
                                shareProduct={shareProduct} 
                            />
                        </div>
                    </div>
                </div>
            )}

            <ModalForm 
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal} 
                userDetails={userDetails} 
                handleInputChange={handleInputChange} 
                handleFormSubmit={handleFormSubmit} 
            />
        </>
    );
};

export default AarnaEmbroideryStudio;
