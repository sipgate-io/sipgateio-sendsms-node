const axios = require('axios');

const baseURL = 'https://api.sipgate.com/v2';

const tokenId = 'YOUR_SIPGATE_TOKEN_ID';
const token = 'YOUR_SIPGATE_TOKEN';
const recipient = 'RECIPIENT_PHONE_NUMBER';
const message = 'YOUR_MESSAGE';

const smsId = 'YOUR_SIPGATE_SMS_EXTENSION';

// Only needed when sending a scheduled sms

// const timestamp = new Date('YYYY-MM-DD hh:mm:ss');
// const sendAt = (timestamp.getTime() / 1000).toString();

const data = {
	smsId,
	recipient,
	message,
	// sendAt,
};

const requestOptions = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	auth: {
		username: tokenId,
		password: token,
	},
	data,
};

axios(`${baseURL}/sessions/sms`, requestOptions)
	.then(response => {
		console.log(`Status: ${response.status}`);
		console.log(`Body: ${JSON.stringify(response.data)}`);
	})
	.catch(error => console.error('Error: ', error.message));
