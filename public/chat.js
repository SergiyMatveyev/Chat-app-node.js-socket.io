$(function () {
  let socket = io("http://localhost:3000");

  let message = $("#message");
  let username = $("#username");
  let send_message = $("#send_message");
  let send_username = $("#send_username");
  let chatroom = $("#chatroom");
  let feedback = $("#feedback");

  send_username.click(() => {
    socket.emit("change_username", { username: username.val() });
  });

  send_message.click(() => {
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass,
    });
  });

  let min = 1;
  let max = 6;
  let random = Math.floor(Math.random() * (max - min)) + min;

  let alertClass;
  switch (random) {
    case 1:
      alertClass = "secondary";
      break;
    case 2:
      alertClass = "danger";
      break;
    case 3:
      alertClass = "success";
      break;
    case 4:
      alertClass = "warning";
      break;
    case 5:
      alertClass = "info";
      break;
    case 6:
      alertClass = "light";
      break;
  }

  socket.on("add_mess", (data) => {
    feedback.html("");
    message.val("");
    chatroom.append(
      "<div class='alert alert-" +
        data.className +
        "'<b>" +
        data.username +
        "</b>: " +
        data.message +
        "</div>"
    );
  });

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", (data) => {
    feedback.html(
      "<p><i>" + data.username + " печатает сообщение..." + "</i></p>"
    );
  });
});
