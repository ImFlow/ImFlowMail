![https://imflow.me](https://imflow.me/wp-content/uploads/2021/05/big_Artboard-1@3x.png)


# ImFlowMail - a lightweight node.js mailserver for your static pages

We've created this little package for agencies, freelancers and also webmaster who wanted to improve they're page-speed with a static page. One of the most
common problems is the little contact form every page needs. So, here it is. <br /><br />
Your one stop solution for:
1. vue-based page
2. static wordpress page (example view below)

## Server Installation

We recommened you to use our Dockerfile to serve your node.js server application, but you can also start the application manually using plain old node.

Before starting your server you have to edit the __customers.js__ file in the root directory.

### Adding an customers and api key

Open your __customers.js__ file and search the following code:
```javascript
const customers = [
    {
        name: "Imflow Doe",
        apiKey: "4ZEKvjApbYX6P7p6XY7B3",
        recipient: "example@example.com",
    },
]
```

Please change `name`, `apiKey` and `recipient` to your own values.
The only value that identifies a customer is the API Key.
The three values required are:
Key | Value
---- | ---- |
Name | name of the customer
apiKey | a random api key. Please use a sufficiently long random string. This is the only identifier for a customer.
recipient | email of the recipient of the email

In case that you don't have an idea how to create API-Keys, we added a tiny API-Creator Form on our generator page [here](https://imflow.me/imflowmail).


### Start the server
Start the server either by running:
```bash
docker-compose build && docker-compose up -d
```

## Usage on the client

### Plain requests
The most simple example for an API call to send an email is the following curl command:
```bash
curl --location --request POST 'https://your-server:4300' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "foo@bar.com",
    "msg": "My super awesome test message",
    "apiKey": "HJ6kk2rZ2fYmvw9wju",
    "subject": "Hey nice to see you!"
}'
```
### Vue / Javascript
Please install axios using `npm i axios`.
A very basic version of the contact form logic looks like this:
```javascript
import axios from "axios";
export default {
    setup() {
      const submitForm = () => {
      this.submitting = true;
      this.error = false;
      try {
        await axios.post("https://YOURSERVER.com/", {
          name: this.name,
          email: this.email,
          msg: this.msg,
          apiKey: "HJ6kk2rZ2fYmvw9wju",
          subject: "New contact form",
        });
        this.submitting = false;
        this.isSubmitted = true;
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        this.submitting = false;
        this.error = true;
        console.error(e);
      }
    }
    return {
       submitForm,
    }
  }
}
```

A full example can be found in the `vue/imflow_mail_example` directory
### Wordpress


We provide a Wordpress plugin to use on your site. This works great with the [Simply Static](https://de.wordpress.org/plugins/simply-static/#description) plugin. The wordpress plugin lives in the `wp` subdirectory.
#### Installation
1. Please change the URL of your server near the end of the `imflowMail.js` file in `wp/js` directory.
2. Zip the entire `wp` directory and upload it to your wordpress site
3. Insert the shortcode of the contact form on any site. The customer is identified by the API key you have set on the server.
```php
[contactform apikey="HJ6kk2rZ2fYmvw9wju" privacy_uri="https://example.com/privacy"]
```
4. __(Optional)__ Use the [Simply Static](https://de.wordpress.org/plugins/simply-static/#description) plugin to generate a static site from your wordpress site.


## Todo

- [ ] Connect to a DB
