const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client
});

var that = module.exports = {
  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      const getUrl = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink'
      });

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },
  uploadFile: async ({ shared }) => {
    try {
      const createFile = await drive.files.create({
        requestBody: {
          name: 'onepunchman.png',
          mimeType: 'image/png'
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(path.join(__dirname, '/../saitama.png'))
        }
      });

      if(shared) {
        const fileId = createFile.data.id;
        const getUrl = await that.setFilePublic(fileId);
        console.log('Url:', getUrl.data);
      }
      
      console.log(createFile.data);
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      console.log('Delete file:', fileId);
      
      const deleteFileDrive = await drive.files.delete({
        fileId: fileId
      });

      console.log(deleteFileDrive.data, deleteFileDrive.status);
    } catch (error) {
      console.error(error);
    }
  }
}