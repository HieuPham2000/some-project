### App chat đơn giản với Express, Socket.io

Video hướng dẫn: https://www.youtube.com/watch?v=Ab7sqFML-4E

---

#### Khởi tạo

```
yarn init -y
yarn add express socket.io
yarn add --dev nodemon
```

Note: nodemon để tự động build lại app khi có thay đổi (cần thêm scripts start vào package.json)

---

#### Ghi chú

##### 1. Nhúng vào client như thế nào? Tại sao nhúng ```/socket.io/socket.io.js```?

  By default, the Socket.IO server exposes a client bundle at /socket.io/socket.io.js.

io will be registered as a global variable:

```
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

Docs: https://socket.io/docs/v4/client-installation/#standalone-build

##### 2. ```io.emit``` vs ```socket.emit```?

- ```socket.emit``` will send back message to sender only.
- ```io.emit``` will send message to all the client including sender.
- if you want to send message to all but not back to sender then ```socket.broadcast.emit```.

Stackoverflow: https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit

Cheatsheet: https://socket.io/docs/v4/emit-cheatsheet/#server-side