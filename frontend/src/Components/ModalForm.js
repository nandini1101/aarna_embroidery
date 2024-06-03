import React from 'react';
import Modal from 'react-modal';

const ModalForm = ({ modalIsOpen, closeModal, userDetails, handleInputChange, handleFormSubmit }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delivery Details Form"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Product Details</h2>
            <form onSubmit={handleFormSubmit} className="container">
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <select
                            name="color"
                            value={userDetails.color}
                            onChange={handleInputChange('color')}
                            className="form-control"
                            id="floatingColor"
                            required
                        >
                            <option value="">Select Color</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                            <option value="Yellow">Yellow</option>
                            {/* Add more colors as needed */}
                        </select>
                        <label htmlFor="floatingColor">Available Colors</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            name="quantity"
                            value={userDetails.quantity}
                            onChange={handleInputChange('quantity')}
                            className="form-control"
                            id="floatingQuantity"
                            placeholder="Quantity"
                            required
                            min="1"
                        />
                        <label htmlFor="floatingQuantity">Number of Products</label>
                    </div>
                </div>
                <h2>Delivery Details</h2>
                <div className="form-group">
                    <h3>Contact</h3>
                    <p>This is used to send the tracking ID for your order</p>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="whats"
                            value={userDetails.whatsapp}
                            onChange={handleInputChange('whatsapp')}
                            className="form-control"
                            id="floatingWhats"
                            placeholder="WhatsApp"
                            required
                        />
                        <label htmlFor="floatingWhats">WhatsApp number</label>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <h3>Delivery</h3>
                    <div className="form-floating mb-3">
                        <select
                            name="country"
                            value={userDetails.country}
                            onChange={handleInputChange('country')}
                            className="form-control"
                            id="floatingCountry"
                            required
                        >
                            <option value="India">India</option>
                            {/* Add more countries as needed */}
                        </select>
                        <label htmlFor="floatingCountry">Country/Region</label>
                    </div>
                    <div className="col form-floating mb-3">
                        <input
                            type="text"
                            name="firstName"
                            value={userDetails.name}
                            onChange={handleInputChange('name')}
                            className="form-control"
                            id="floatingFirstName"
                            placeholder="First Name"
                            required
                        />
                        <label htmlFor="floatingFirstName">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="address"
                            value={userDetails.hno}
                            onChange={handleInputChange('hno')}
                            className="form-control"
                            id="floatingHno"
                            placeholder="House number"
                            required
                        />
                        <label htmlFor="floatingHno">House number(H.No:)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="apartment"
                            value={userDetails.street}
                            onChange={handleInputChange('street')}
                            className="form-control"
                            id="floatingStreet"
                            placeholder="Street/Land mark"
                            required
                        />
                        <label htmlFor="floatingStreet">Street/Land mark</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="apartment"
                            value={userDetails.village}
                            onChange={handleInputChange('village')}
                            className="form-control"
                            id="floatingVillage"
                            placeholder="Village"
                            required
                        />
                        <label htmlFor="floatingVillage">Village/City/Mandal</label>
                    </div>
                    <div className="row">
                        <div className="col form-floating mb-3">
                            <input
                                type="text"
                                name="city"
                                value={userDetails.district}
                                onChange={handleInputChange('district')}
                                className="form-control"
                                id="floatingDistrict"
                                placeholder="District"
                                required
                            />
                            <label htmlFor="floatingDistrict">District</label>
                        </div>
                        <div className="col form-floating mb-3">
                            <select
                                name="state"
                                value={userDetails.state}
                                onChange={handleInputChange('state')}
                                className="form-control"
                                id="floatingState"
                                required
                            >
                                <option value="Telangana">Telangana</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Karnataka">Karnataka</option>
                            </select>
                            <label htmlFor="floatingState">State</label>
                        </div>
                        <div className="col form-floating mb-3">
                            <input
                                type="text"
                                name="pincode"
                                value={userDetails.pincode}
                                onChange={handleInputChange('pincode')}
                                className="form-control"
                                id="floatingPincode"
                                placeholder="PIN code"
                                required
                            />
                            <label htmlFor="floatingPincode">PIN code</label>
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleInputChange('phone')}
                            className="form-control"
                            id="floatingPhone"
                            placeholder="Phone"
                            required
                        />
                        <label htmlFor="floatingPhone">Phone</label>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">Pay {userDetails.quantity*userDetails.price}</button>
                    <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;
