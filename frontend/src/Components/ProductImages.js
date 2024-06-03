import React from 'react';

const ProductImages = ({ productImages, currentImageIndex, setCurrentImageIndex }) => (
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
);

export default ProductImages;
