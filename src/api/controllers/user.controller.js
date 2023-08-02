const UserService = require("@/services/database/UserService");
const { getPaginationStatus } = require("@/utils/pagination");

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
