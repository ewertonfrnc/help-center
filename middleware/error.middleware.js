exports.errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode || 500;
  const errorMessage = error.message;

  response.status(statusCode).json({
    status: "fail",
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
