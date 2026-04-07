const userService = require("../services/user.service");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await userService.registerUser({ name, email, password });

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            .status(201).json({
                success: true,
                accessToken: data.accessToken,
                user: data.user
            });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await userService.loginUser({ email, password });

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            .json({
                success: true,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                user: {
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email
                }
            });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; 

        const data = await userService.refreshAccessToken(refreshToken);

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "None"
                : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            .json({ success: true });

    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; 

        if (refreshToken) {
            await userService.logoutUser(req.user?.id);
        }

        res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.deleteAdmins = async (req, res) => {
    try {
        const result = await userService.deleteAllAdmins();

        res.json({
            success: true,
            message: "All admin users deleted",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}