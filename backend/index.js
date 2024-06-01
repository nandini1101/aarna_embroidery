const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const checksum_lib = require('./checksum');  // Import the checksum library

const app = express();
app.use(bodyParser.json());

const port = 3001;

app.post('/generateTransactionToken', (req, res) => {
    const { orderId, amount, customerId } = req.body;

    const paytmParams = {};
    paytmParams.body = {
        requestType: "Payment",
        mid: "YOUR_MID_HERE",
        websiteName: "YOUR_WEBSITE_NAME",
        orderId: orderId,
        callbackUrl: "YOUR_CALLBACK_URL",
        txnAmount: {
            value: amount,
            currency: "INR",
        },
        userInfo: {
            custId: customerId,
        },
    };

    checksum_lib.genchecksum(paytmParams.body, "YOUR_MERCHANT_KEY_HERE", (err, checksum) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            paytmParams.head = {
                signature: checksum,
            };

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw.paytm.in',
                port: 443,
                path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=' + orderId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length,
                },
            };

            const post_req = https.request(options, post_res => {
                let response = "";
                post_res.on('data', chunk => {
                    response += chunk;
                });

                post_res.on('end', () => {
                    res.json(JSON.parse(response));
                });
            });

            post_req.write(post_data);
            post_req.end();
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
