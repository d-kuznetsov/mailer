const nodemailer = require('nodemailer')

// eslint-disable-next-line
exports.handler = async (event) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body)
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '31e990d1f69827',
        pass: 'ccd2d6c63a8805',
      },
    })

    const info = await transport.sendMail({
      from: 'Sender Name <sender@example.com>',
      to: `${email}, sender@example.com`,
      subject: `${subject} ${new Date().toLocaleString()}`,
      html: `
        <div>
          <p>${name}</p>
          <p>${message}</p>
        </div>
      `,
    })

    return {
      statusCode: 200,
      body: info.messageId,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
