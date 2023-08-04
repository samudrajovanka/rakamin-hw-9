const UserService = require("@/services/database/UserService");
const { getPaginationStatus } = require("@/utils/pagination");
const userValidation = require("@/validations/user");

exports.getUsers = async (req, res, next) => {
  try {
    const userService = new UserService();

    const { page = 1, limit = 10 } = req.query;

    const { originalTotal, users } = await userService.getUsers({
      page: parseInt(page),
      limit: parseInt(limit)
    });

    return res.status(200).json({
      success: true,
      message: "Get users success",
      data: {
        pagination: getPaginationStatus(parseInt(page), parseInt(limit), originalTotal),
        users
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userService = new UserService();

    const user = await userService.getUserById(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Get user success",
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    userValidation.validateUpdatePayload(req.body);

    const userService = new UserService();

    const user = await userService.updateUserById(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update user success",
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    const userService = new UserService();

    await userService.deleteUserById(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Delete user success"
    });
  } catch (error) {
    next(error);
  }
};
