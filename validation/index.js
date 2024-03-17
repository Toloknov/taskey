import { check } from "express-validator";
const cleanedPhoneNumber = "+38 (093) 421-20-44".replace(/\D/g, "");
export const validationRegistration = [
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom((value) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("Please include a valid email address");
      }
      return true;
    }),
  check(
    "password",
    "minimum length 6 characters and must contain a capital letter and a number"
  ).isStrongPassword({
    minLength: 6,
    minSymbols: 0,
  }),
  check("telephone", "wrong number").isLength({ min: 19, max: 19 }),

  check("name", "minimum length 3 characters ").isLength({ min: 3, max: 32 }),
  check("checkbox", "agreement must be confirmed").custom((value, { req }) => {
    if (!value) {
      throw new Error("Agreement must be confirmed");
    }
    return true;
  }),
];
export const validationLogin = [
  check("email", "Email is not correct").isEmail(),
  check("password", "Password is not correct").isStrongPassword({
    minLength: 6,
    minSymbols: 0,
  }),
  check("checkbox", "agreement must be confirmed").custom((value, { req }) => {
    if (!value) {
      throw new Error("Agreement must be confirmed");
    }
    return true;
  }),
];
export const validationDepartment = [
  check("cityOrVillage", "City is not correct").notEmpty(),
  check("department", "Department is not correct").notEmpty(),
  check("name", "name is not correct").notEmpty(),
  check("email", "email is not correct").isEmail(),
  check("phone", "phone is not correct").isLength({ min: 19, max: 19 }),
];
export const validationNv = [
  check("cityOrVillage", "cityOrVillage is not correct").notEmpty(),
  check("street", "street is not correct").notEmpty(),
  check("house", "house is not correct").notEmpty(),
  check("apartment", "apartment is not correct").notEmpty(),
  check("floor", "floor is not correct").notEmpty(),
  check("lift", "lift is not correct").notEmpty(),
  check("date", "date is not correct").notEmpty(),
  check("time", "time is not correct").notEmpty(),
  check("name", "name is not correct").notEmpty(),
  check("email", "email is not correct").isEmail(),
  check("phone", "phone is not correct").isLength({ min: 19, max: 19 }),
];
export const validationReview = [
  check("text", "text is not correct").notEmpty(),
  check("rating", "rating is not correct").notEmpty(),
  
];
