const validateEnv = require("./validateEnv");

module.exports = function () {
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error.message);
    process.exit(1); // Exit the application with an error code
  });

  // validate Env
  validateEnv();
};
