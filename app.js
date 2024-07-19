//We're using the express framework and the mailgun.js wrapper (mailgun-js is now depracated)

var express = require("express")
var Mailgun = require("mailgun.js")

//init express
var app = express()

const formData = require("form-data")
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
  debug: true,
})

//Tell express to fetch files from the /js directory
app.use(express.static(__dirname + "/js"))

//We're using the Jade templating language because it's fast and neat
// Jade had been renamed pug in the meantime
app.set("view engine", "pug")

//Do something when you're landing on the first page
app.get("/", function (req, res) {
  //render the index.jade file - input forms for humans
  res.render("index", function (err, html) {
    if (err) {
      // log any error to the console for debug
      console.log(err)
    } else {
      //no error, so send the html to the browser
      res.send(html)
    }
  })
})

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// So test with entering this into the URL bar of the browser, and then fix the button.
// The index redirects here
app.get("/submit/:mail", function (req, res) {
  // console.log(req.params.mail)
  // res.send(req.params.mail)

  //Invokes the method to send emails given the above data with the helper library
  mg.messages
    .create("CHANGE_THIS", {
      from: "Excited User <mailgun@CHANGE_THIS>",
      to: req.params.mail,
      subject: "Hello world",
      text: "; Morning's at seven",
      html: "All's right with the world",
    })
    .then((msg) => {
      console.log(msg)
      res.send(`success!  Email sent to ${req.params.mail}`)
    }) // logs response data
    .catch((err) => {
      console.log(err)
      res.send(`Error!  Here is the error status: ${err.status}, and error message: ${err.details}`)
    }) // logs any error
})

app.listen(3030, () => {
  console.log(`Server is running on http://localhost:3030`)
})
