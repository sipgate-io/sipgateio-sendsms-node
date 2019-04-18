<img src="https://www.sipgatedesign.com/wp-content/uploads/wort-bildmarke_positiv_2x.jpg" alt="sipgate logo" title="sipgate" align="right" height="112" width="200"/>

# sipgate.io Node.js send sms example

To demonstrate how to send an SMS, we queried the `/sessions/sms` endpoint of the sipgate REST API.

For further information regarding the sipgate REST API please visit https://api.sipgate.com/v2/doc

### Prerequisites

- Node.js >= 10.15.3

### How To Use

Navigate to the project's root directory.

Install dependencies:

```bash
npm install
```

In order to run the code you have to set the following variables in [index.js](./index.js):

```javascript
const username = 'YOUR_SIPGATE_EMAIL';
const password = 'YOUR_SIPGATE_PASSWORD';
const recipient = 'RECIPIENT_PHONE_NUMBER';
const message = 'YOUR_MESSAGE';

const smsId = 'YOUR_SIPGATE_SMS_EXTENSION';
```

The `smsId` uniquely identifies the extension from which you wish to send your message. Further explanation is given in the section [Web SMS Extensions](#web-sms-extensions).

> **Optional:**
> In order to send a delayed message uncomment the following line and set the desired date and time in the future (up to one month):
>
> ```javascript
> const timestamp = new Date('YYYY-MM-DD hh:mm:ss');
> const sendAt = (timestamp.getTime() / 1000).toString();
> ```
>
> Additionally, in the `data` object uncomment the `sendAt` property.
>
> ```javascript
> const data = {
> 	smsId,
> 	recipient,
> 	message,
> 	sendAt,
> };
> ```
>
> **Note:** The `data` object is written in javascript Object Property Value Shorthand.
>
> **Note:** The `sendAt` property in the `data` object is a [Unix timestamp](https://www.unixtimestamp.com/).

Run the application:

```bash
npm run start
```

##### How It Works

The sipgate REST API is available under the following base URL:

```javascript
const baseURL = 'https://api.sipgate.com/v2';
```

The API expects request data in JSON format. Thus the `Content-Type` header needs to be set accordingly.

```javascript
headers: {
	'Content-Type': 'application/json',
}
```

The `data` object contains the `smsId`, `recipient` and `message` specified above.

```javascript
const data = {
	smsId,
	recipient,
	message,
};
```

We use the axios package for request execution. The
`requestOptions` object contains the parameters `method`, `headers`, `auth`, `baseURL` and `data` (previously referred) which will be used by axios in order to send the desired http post request. The `auth` property takes a username and password and generates an HTTP Basic Auth header (for more information on Basic Auth see our [code example](https://github.com/sipgate/sipgateio-basicauth-node)).

```javascript
const requestOptions = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	auth: {
		username,
		password,
	},
	data,
};
```

The `axios` instance takes the request URL and `requestOptions` as arguments and process the desired http request. The request URL consists of the base URL defined above and the endpoint `/sessions/sms`.

```javascript
axios(`${baseURL}/sessions/sms`, requestOptions);
```

#### Send SMS with custom sender number

By default 'sipgate' will be used as the sender. It is only possible to change the sender to a mobile phone number by verifying ownership of said number. In order to accomplish this, proceed as follows:

1. Log into your [sipgate account](https://app.sipgate.com/connections/sms)
2. Use the sidebar to navigate to the **Connections** (_Anschlüsse_) tab
3. Click **SMS** (if this option is not displayed you might need to book the **Web SMS** feature from the Feature Store)
4. Click the gear icon on the right side of the **Caller ID** box and enter the desired sender number.

### Web SMS Extensions

A Web SMS extension consists of the letter 's' followed by a number (e.g. 's0'). The sipgate API uses the concept of Web SMS extensions to identify devices within your account that are enabled to send SMS. In this context the term 'device' does not necessarily refer to a hardware phone but rather a virtual connection.

You can find out what your extension is as follows:

1. Log into your [sipgate account](https://app.sipgate.com/connections/sms)
2. Use the sidebar to navigate to the **Connections** (_Anschlüsse_) tab
3. Click **SMS** (if this option is not displayed you might need to book the **Web SMS** feature from the Feature Store)
4. The URL of the page should have the form `https://app.sipgate.com/{...}/connections/sms/{smsId}` where `{smsId}` is your Web SMS extension.

### Common Issues

#### SMS sent successfully but no message received

Possible reasons are:

- incorrect or mistyped phone number
- recipient phone is not connected to network
- long message text - delivery can take a little longer

#### HTTP Errors

| reason                                                                                                                                                | errorcode |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: |
| bad request (e.g. request body fields are empty or only contain spaces, timestamp is invalid etc.)                                                    |    400    |
| username and/or password are wrong                                                                                                                    |    401    |
| insufficient account balance                                                                                                                  |    402    |
| no permission to use specified SMS extension (e.g. SMS feature not booked or user password must be reset in [web app](https://app.sipgate.com/login)) |    403    |
| wrong REST API endpoint                                                                                                                               |    404    |
| wrong request method                                                                                                                                  |    405    |
| wrong or missing `Content-Type` header with `application/json`                                                                                        |    415    |
| internal server error or unhandled bad request (e.g. `smsId` not set)                                                                                 |    500    |

### Related

- [axios](https://github.com/axios/axios)
- [sipgate team FAQ (DE)](https://teamhelp.sipgate.de/hc/de)
- [sipgate basic FAQ (DE)](https://basicsupport.sipgate.de/hc/de)

### Contact Us

Please let us know how we can improve this example.
If you have a specific feature request or found a bug, please use **Issues** or fork this repository and send a **pull request** with your improvements.

### License

This project is licensed under **The Unlicense** (see [LICENSE file](./LICENSE)).

### External Libraries

This code uses the following external libraries

- axios:
  Licensed under the [MIT License](https://opensource.org/licenses/MIT)
  Website: https://github.com/axios/axios

---

[sipgate.io](https://www.sipgate.io) | [@sipgateio](https://twitter.com/sipgateio) | [API-doc](https://api.sipgate.com/v2/doc)
