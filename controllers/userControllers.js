import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js"

const registerUser = async (req, res) => {
try{  
   const { email, password } = req.body;

  if ( !email || !password) {
    res.status(400).json({message: "Please Enter all the Feilds"});
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({message: "User already exists"});
  }

  const user = await User.create({
    email,
    password
  });

  if (user) {
    console.log("user created successfully")
    res.status(201).json({
      message: "User created successfully",
    });
  } else {
    res.status(400).json({message: "Something went wrong"});
  }
}catch(err) {
    console.log("something went wrong")
  }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      return res.json({
        message: "User logged in successfully",
        token: generateToken(user._id, email)
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  };

export default { registerUser, authUser };