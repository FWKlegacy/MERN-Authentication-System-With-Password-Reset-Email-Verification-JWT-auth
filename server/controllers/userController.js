import userModel from "../models/userModel.js";

const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    return res.json({
      success: true,
      userData: {
        name: user.name,
        IsAccountVerified: user.IsAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default getUserData;
