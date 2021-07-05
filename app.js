require('dotenv').config()
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer")
const validator = require("validator")
const xssFilters = require("xss-filters")
const rateLimit = require("express-rate-limit");

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
});


const customers = require('./customers')

// API endpoint for health checks
app.get('/', (req, res) => {
    return res.status(200).send("Alive")
})

// API endpoint for sending mail
app.post('/', limiter, (req, res) => {
    const attributes = ['name', 'email', 'msg', 'apiKey', 'subject']

    console.log(`req.body: ${JSON.stringify(req.body)}`)
    const sanitizedAttributes = attributes.map(n => cleanRecivedData(n, req.body[n]))

    const someInvalid = sanitizedAttributes.some(r => !r)
    if (someInvalid) {
        return res.status(422).json({'error': 'invalid args'})
    }
    var myAttributes = req.body
    const customer = customers.find((c) => {

        return c.apiKey === myAttributes.apiKey
    })
    if (!customer) {
        return res.status(422).json({'error': "unknown customer"})
    }

    myAttributes.recipient = customer.recipient

    sendMail(myAttributes)
    res.status(200).json({ 'message': "Send mail" })

})


const cleanRecivedData = (key, value) => {

    const checkerFunctions = {
        name: v => v.length < 4,
        email: v => !validator.isEmail(v),
        msg: v => v.length < 5,
        apiKey: v => v.length < 10,
        subject: v => v.length < 4,
    }

    return checkerFunctions.hasOwnProperty(key) && !checkerFunctions[key](value) && xssFilters.inHTMLData(value)
}

const sendMail = (customer) => {
    let SMTPSSL = false
    if (process.env.SMTP_SSL == 'true') {
        SMTPSSL = true
    }
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: SMTPSSL,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    transporter.sendMail({
        from: customer.email,
        to: customer.recipient,
        subject: customer.subject,
        text: `
        Nachricht von ${customer.name}:


        ${customer.msg}
        `
    })
}

app.listen(3000, () => {
    console.log("running on http://localhost:3000")
})

