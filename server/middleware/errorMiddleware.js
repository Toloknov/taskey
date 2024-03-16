import ApiError from "../exception/errorException.js";

export default (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors,status:err.status });
  }
  return res.status(500).json({ message: "Ошибка сервера попробуйте позже" });
};