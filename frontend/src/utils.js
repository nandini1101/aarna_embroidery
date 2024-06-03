export const initiatePayment = async (userDetails, amountToCollect) => {
    const orderId = "ORDER" + new Date().getTime();
    const amount = amountToCollect.toString();
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
            // Save userDetails upon successful payment
            saveUserDetails(userDetails);
        }).catch(function onError(error) {
            console.error("Error => ", error);
        });
    } else {
        console.error("Failed to get transaction token");
    }
};

const saveUserDetails = async (userDetails) => {
    // Assuming you have a function to save userDetails in your database
    try {
        // Your database saving logic here
        console.log("User details saved:", userDetails);
    } catch (error) {
        console.error("Failed to save user details:", error);
    }
};

export const shareProduct = (currentImageIndex) => {
    const productImages = [
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702660/mcwnfg5nsa7ec0hurmro.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702661/vd0vpkajisrvwvnd3b1y.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702662/ark07p3yp9mtfxaazpdx.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702660/nexgfptpnlc8e2ekozqg.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702663/x2v9gucf6cpz4sbqjrak.jpg",
        "https://res.cloudinary.com/dyiua1ub9/image/upload/v1716702658/qisfwnafzwt3gfe55m8u.jpg"
    ];

    const productName = "Product 1";
    const productDescription = "Check out this amazing product from Aarna Embroidery Studio!";
    const productImage = productImages[currentImageIndex];
    const websiteLink = "https://aarna-test.netlify.app/";

    const shareText = `${productName}\n${productDescription}\nPrice: 650rs\nLength: 1 meter\nColors Available: Red, Blue, Green`;

    // Share via WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%0A${encodeURIComponent(websiteLink)}`;
    window.open(whatsappUrl, '_blank');
};
