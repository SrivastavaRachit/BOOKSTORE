import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        // CHECK IF USER IS ALREADY PRESENT
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // HASING PASSWORD
        const hashPassword = await bcryptjs.hash(password, 10);

        // IF NOT THEN MAKE HIM REGISTER
        const createUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword
        })
        await createUser.save()
        res.status(201).json({
            message: "User Created Successfully", user: {
                _id: createUser._id,
                fullname: createUser.fullname,
                email: createUser.email,
            }
        })
    }
    catch (error) {
        console.log("Error:" + error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // CHECK IF USER IS ALREADY PRESENT
        const user = await User.findOne({ email });
        // MATCH THE PASSWORD  (USER.PASSWORD IS DATABASE PASSWORD )
        const isMatch = await bcryptjs.compare(password, user.password)

        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }
        else {
            res.status(200).json({
                message: "Login Successfull",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            })
        }
    }
    catch (error) {
        console.log("Error:" + error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}