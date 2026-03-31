const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

const registerUser = async({name, email, password}) => {
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

      const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};


const loginUser = async({email, password}) => {
    // const user = await User.findOne({email});
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};







const refreshAccessToken =  async(refreshToken) => {
    if(!refreshToken) {
        throw new Error("No refresh token provided");
    }

    let decoded;
    try{
        decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    } catch(error){
         throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Unauthorized");
    }

    const newAccessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
}

const logoutUser = async(userId) => {
    const user = await User.findById(userId);
    if(user){
        user.refreshToken = null;
        await user.save();
    }
};
 
module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};