const AuthService = require("@/services/database/AuthService");
const authValidation = require("@/validations/auth");

exports.register = async (req, res, next) => {
  try {
    authValidation.validateRegisterPayload(req.body);

    const authServices = new AuthService();
    const user = await authServices.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user
      }
    })
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    authValidation.validateLoginPayload(req.body);

    const authServices = new AuthService();
    const accessToken = await authServices.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login success",
      data: {
        accessToken
      }
    })
  } catch (error) {
    next(error);
  }
}
