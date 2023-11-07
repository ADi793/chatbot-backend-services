const { JOIN, CHAT_QUESTIONS } = require("../utils/constants");
const chatQuestionHandler = require("./handlers/chatQuestionHandler");

module.exports = function (io) {
  return (socket) => {
    socket.on(JOIN, (channel) => {
      socket.join(channel);
    });

    socket.on(CHAT_QUESTIONS, (request) => chatQuestionHandler(request, io));
  };
};
