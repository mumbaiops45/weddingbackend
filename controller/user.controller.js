// const userService = require("../services/user.service");

// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const data = await userService.registerUser({
//             name,
//             email,
//             password,
//         });

//         res.cookie("accessToken", data.accessToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//             maxAge: 15 * 60 * 1000
//         })
//         .cookie("refreshToken", data.refreshToken , {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         })

//         res.status(201).json({
//             success: true,
//              accessToken: data.accessToken,
//              user: data.user
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// exports.login = async(req, res) => {
//     try {
//         const{email , password} = req.body;

//         const data = await userService.loginUser({
//             email,
//             password,
//         });

//         res.cookie("accessToken", data.accessToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//             maxAge: 15 * 60 * 1000
//         })
//         .cookie("refreshToken", data.refreshToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         })

        
//         res.json({
//     success: true,
//     accessToken: data.accessToken,
    
//     refreshToken: data.refreshToken,
//     user: {
//         id: data.user._id,
//         name: data.user.name,
//         email: data.user.email
//     }
// });
//     } catch (error) {
//          res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//     }
// }


// exports.refreshToken = async(req, res) => {
//     try {
//         const {refreshToken} = req.body;
//         const data = await userService.refreshAccessToken(refreshToken);

//         res.cookie("accessToken", data.accessToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//             maxAge: 15 * 60 * 1000
//         })
//         .json({
//             success: true
//         });

//         // res.json({
//         //     success: true,
//         //     accessToken: data.accessToken
//         // });
//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// exports.logout = async(req, res) =>{
//     try {
//       const refreshToken = req.cookies.refreshToken;

//        if(refreshToken){
//         await userService.logoutUser(req.user?.id);
//        }

//        res
//        .clearCookie("accessToken")
//        .clearCookie("refreshToken")
//        .json({
//         success: true,
//         message: "Logged out successfully"
//        });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// }
 

const userService = require("../services/user.service");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await userService.registerUser({ name, email, password });

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ false on localhost
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ false on localhost
            sameSite: "Strict",
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
            secure: process.env.NODE_ENV === "production", // ✅ fixed
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ fixed
            sameSite: "Strict",
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
        const refreshToken = req.cookies.refreshToken; // ✅ fixed: from cookies not body

        const data = await userService.refreshAccessToken(refreshToken);

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ fixed
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        .json({ success: true });

    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // ✅ fixed: `req` + `.cookies`

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