![https://imflow.me](https://imflow.me/wp-content/uploads/2021/05/big_Artboard-1@3x.png)


# ImFlowMail - a lightweight node.js mailserver for your static pages

We've created this little package for agencies, freelancers and also webmaster who wanted to improve they're page-speed with a static page. One of the most
common problems is the little contact form every page needs. So, here it is. <br /><br />
Your one stop solution for:
1. vue-based page
2. static wordpress page (example view below)

## Installation

We recommened you to use our released Dockerfile to serve your node.js server application, but you can also start the application on webspace which is supporting node.js.

Before starting your server you have to edit the <b>app.js</b> file in the root directory.

1. __Adding an api key__

Open your __app.js__ file and search the following code: <br/>
```javascript
const customers = [
    {
        name: "Imflow Doe",
        apiKey: "4ZEKvjApbYX6P7p6XY7B3",
        recipient: "example@example.com",
    },
]
```

Please change <code>name</code>, <code>apiKey</code> and <code>recipient</code> to your own values. In case that you don't have an idea how to create API-Keys, we added a tiny API-Creator Form on
our repository-page. You can find the generator [here](https://imflow.me/imflowmail).

## Todo

- [ ] Connect to a DB
