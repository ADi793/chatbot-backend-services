module.exports = function () {
  if (!process.env.DB) throw new Error("FATAL ERROR: DB is not defined.");
  if (!process.env.PORT) throw new Error("FATAL ERROR: PORT is not defined.");
  if (!process.env.OPENAI_API_KEY)
    throw new Error("FATAL ERROR: OPENAI_API_KEY is not defined.");
};
