import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../styles.css';
import loadingGif from '../loading.gif';

Modal.setAppElement('#root'); // For accessibility

const AarnaEmbroideryStudio = () => {
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        mobile: '',
        whatsapp: '',
        street: '',
        village: '',
        mandal: '',
        district: '',
        pincode: '',
        color: '',
        quantity: 1
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

    const initiatePayment = async () => {
        const orderId = "ORDER" + new Date().getTime();
        const amount = "650";
        const customerId = "CUSTOMER_ID"; // Replace with actual customer ID

        const response = await fetch('http://localhost:3001/generateTransactionToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, amount, customerId }),
        });

        const data = await response.json();

        if (data.body.resultInfo.resultStatus === "S") {
            const config = {
                root: "",
                flow: "DEFAULT",
                data: {
                    orderId: orderId,
                    token: data.body.txnToken,
                    tokenType: "TXN_TOKEN",
                    amount: amount,
                },
                handler: {
                    notifyMerchant: function(eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };

            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.error("Error => ", error);
            });
        } else {
            console.error("Failed to get transaction token");
        }
    };

    const shareProduct = () => {
        const productName = "Product 1";
        const productDescription = "Check out this amazing product from Aarna Embroidery Studio!";
        const productImage = productImages[currentImageIndex];
        const websiteLink = "https://aarna-test.netlify.app/";
        
        const shareText = `${productName}\n${productDescription}\nPrice: 650rs\nLength: 1 meter\nColors Available: Red, Blue, Green`;

        // Share via WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%0A${encodeURIComponent(websiteLink)}`;
        window.open(whatsappUrl, '_blank');
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        initiatePayment();
    };

    return (
        <>
            {loading ? (
                <div id="loading">
                    <img src={loadingGif} alt="Loading..." />
                </div>
            ) : (
                <div id="content">
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid d-flex justify-content-center">
                            <a className="navbar-brand d-flex align-items-center" href="#">
                                <img src="https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702657/ujoitmeyzrmwsaiw45md.png" alt="Be Bold" width="30" height="30" className="d-inline-block align-text-top me-2" />
                                <span className="h5 mb-0">Aarna Embroidery Studio</span>
                            </a>
                        </div>
                    </nav>

                    <div className="container my-4">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center">
                                <div className="main-image-container">
                                    <div className="main-image">
                                        <img src={productImages[currentImageIndex]} id="mainProductImage" alt="Main Product Image" />
                                    </div>
                                </div>
                                <div className="product-images-container">
                                    <div className="product-images">
                                        {productImages.map((src, index) => (
                                            <img
                                                key={index}
                                                src={src}
                                                alt={`Product Image ${index + 1}`}
                                                data-large={src}
                                                className={index === currentImageIndex ? 'active' : ''}
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h2>Product 1</h2>
                                <p><strong>Price:</strong> &#8377;650</p>
                                <p><strong>Length:</strong> 1 meter</p>
                                <p><strong>Colors Available:</strong> Red, Blue, Green</p>
                                <div className="d-flex justify-content-between mt-4">
                                    <button className="btn btn-primary" onClick={openModal}>Buy Now</button>
                                </div>
                                <div className="my-4">
                                    <a href="https://wa.me/+919676393594" className="btn btn-success" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-whatsapp"></i> Enquiry
                                    </a>
                                </div>
                                <div className="d-flex align-items-center">
                                    <a href="https://instagram.com/aarna_embroidery_studio" target="_blank" rel="noopener noreferrer" className="me-3">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                    <a href="https://www.youtube.com/@amanigeela" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube fa-2x"></i>
                                    </a>
                                </div>
                                <div className="my-4">
                                    <button className="btn btn-info me-3" onClick={shareProduct}>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delivery Details Form"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Delivery Details</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-block">
                        <h3>Personal Information</h3>
                        <label>
                            Name:
                            <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            Mobile Number:
                            <input type="text" name="mobile" value={userDetails.mobile} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            WhatsApp Number:
                            <input type="text" name="whatsapp" value={userDetails.whatsapp} onChange={handleInputChange} required />
                        </label>
                    </div>
                    <div className="form-block">
                        <h3>Shipping Address</h3>
                        <label>
                            Street:
                            <input type="text" name="street" value={userDetails.street} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            Village:
                            <input type="text" name="village" value={userDetails.village} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            Mandal:
                            <input type="text" name="mandal" value={userDetails.mandal} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            District:
                            <input type="text" name="district" value={userDetails.district} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            Pincode:
                            <input type="text" name="pincode" value={userDetails.pincode} onChange={handleInputChange} required />
                        </label>
                    </div>
                    <div className="form-block">
                        <h3>Product Information</h3>
                        <label>
                            Color:
                            <input type="text" name="color" value={userDetails.color} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label>
                            Quantity:
                            <input type="number" name="quantity" value={userDetails.quantity} onChange={handleInputChange} min="1" required />
                        </label>
                    </div>
                    <div className="form-block">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AarnaEmbroideryStudio;
