const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'thienthan.bayvut@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo Test 👻" <thienthan.bayvut@gmail.com>', // sender address
      to: "hieu.pt183535@sis.hust.edu.vn, thienthan.bayvut@gmail.com", // list of receivers
      cc: "hieu.pt183535@gmail.com",
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
      attachments: [
        { // utf-8 string as an attachment
          filename: 'text1.txt',
          content: 'hello world! Xin chào!'
        },
        { // file on disk as an attachment
          filename: 'text2.txt',
          path: './file.txt' // stream this file
        },
        { // filename and content type is derived from path
          path: './file.txt'
        },
        ,
        { // filename and content type is derived from path
          path: './img.png'
        },
      ]
    });

    console.log(info);
  } catch (error) {
    console.error(error);
  }
}

sendMail();