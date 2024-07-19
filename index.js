const formData = require("form-data")
const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
})

mg.messages
  .create("sandbox9bbf6d0dbdd14a1aac25af6db05fc464.mailgun.org", {
    from: "Excited User <mailgun@sandbox9bbf6d0dbdd14a1aac25af6db05fc464.mailgun.org>",
    to: ["CHANGE_THIS"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Shall I compare thee to a summer's day</h1>",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)) // logs any error
