## Gửi email bằng Nodejs với GoogleApi (Gmail), Nodemailer

### A. Nguồn học liệu:
1. <a href="https://nodemailer.com/">Nodemailer</a>
2. <a href="https://www.youtube.com/watch?v=aqMPRCNzkbg">Video hướng dẫn</a>

### B. Thực hiện:
#### 1. Khởi tạo project và cài đặt packgae
`npm init -y`
`npm i googleapis nodemailer --save`

<hr />

#### 2. Tạo file
`touch send-mail.js`
`touch .env`

Trong file `.env` sẽ cần 4 thông tin: CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN

<hr/>

#### 3. Lấy thông tin oAuth2Client

##### 3.1. Tạo project trên https://cloud.google.com
- Chọn `Console` > Select a project > `New project`
- Nhập tên project, vd: <i>Nodemailer Google API</i> > `Create`
- Chọn project vừa tạo

##### 3.2. OAuth consent screen
- Chọn `APIs & Services`
- Do mặc định đã có => Vào luôn `OAuth consent screen` > Chọn `External` > `Create`
- Điền thông tin
- Save
- Thêm Test users

##### 3.3. Truy cập OAuth2 Playground
 Tìm trên google hoặc truy cập tại https://developers.google.com/oauthplayground/

##### 3.4. Tạo Credentials
  - Trên google cloud > `Credentials` > `Create credentials` > `OAuth client ID`
  - Chọn type `Web application`
  - Ở `Authorized redirect URIs`: điền https://developers.google.com/oauthplayground (chú ý bỏ / ở cuối)
  - `Create`
  - Lấy Client ID và Client secret cho vào file `.env` (REDIRECT_URI thì điền là https://developers.google.com/oauthplayground)

##### 3.5. Lấy token
- Quay lại trang OAuth 2.0 Playground
- Chọn icon setting > Tích chọn `Use your own OAuth credentials` và điền client id, client secret > `Close`
- Điền https://mail.google.com vào ô input > `Authorize APIs`
- Chọn tài khoản google > `Continue` > `Continue`
(Nếu thiếu setting `Use your own OAuth credentials` bên trên thì bước này sẽ gặp lỗi 403)
- Chọn `Exchange authorization code for tokens`
- Lấy refresh token và lưu vào file `.env`

##### 3.6. Code
Xem code tại file `send-mail.js`

<hr />

#### Một số lưu ý
- Có thể gửi tệp đính kèm... (xem thêm trên trang chủ <a href="https://nodemailer.com/">Nodemailer</a>)
- Chỗ `from` khi gửi mail có thể custom tên người gửi
- Địa chỉ email chỗ `from` sẽ bị đè bằng email đã authen (tự động bởi Gmail?)
>Gmail also always sets authenticated username as the From: email address. So if you authenticate as foo@example.com and set bar@example.com as the from: address, then Gmail reverts this and replaces the sender with the authenticated user.