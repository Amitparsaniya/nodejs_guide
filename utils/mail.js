const nodemailer =require('nodemailer')

exports.generateMailtranspoter =()=>
nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d41293005f4033",
          pass: "0669f6c84c9ddd"
        }
      })
