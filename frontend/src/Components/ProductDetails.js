import React from 'react';

const ProductDetails = ({ currentImageIndex, openModal, shareProduct }) => (
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
);

export default ProductDetails;
