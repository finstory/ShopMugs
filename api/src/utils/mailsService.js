const { transporter } = require("../transporter/transporter");


async function sendRegistrationEmail(email, subject, body) {
   
    try {

        await transporter.sendMail({
            from: '"MoonBox" <facu995electro@hotmail.com>',
            to: `${email}`,
            subject: `${subject}`,
            html: `${body}`
        })

    } catch (error) {

        throw error;

    }
}

module.exports = {
    sendRegistrationEmail
}
