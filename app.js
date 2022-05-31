const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const hostname = "localhost";
const port = "3000";

server = app.listen(port, hostname, () => console.log("Server is running..."));

const io = require("socket.io")(server, {
  cors: {
    origin: `http://${hostname}:${port}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.username = "Anonymous";

  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });

  socket.on("new_message", (data) => {
    io.sockets.emit("add_mess", {
      message: data.message,
      username: socket.username,
      className: data.className,
    });
  });
});
