const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const { GPT_MODEL, GPT_ROLE, CHAT_ANSWER } = require("../../utils/constants");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatQuestionHandler = async (request, io) => {
  try {
    const { email } = jwt.verify(
      request.auth_token,
      process.env.JWT_PRIVATE_KEY
    );
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: GPT_ROLE, content: request.data.question }],
      model: GPT_MODEL,
    });

    io.to(`user_${email}`).emit(CHAT_ANSWER, {
      question: request.data.question,
      answer: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = chatQuestionHandler;
