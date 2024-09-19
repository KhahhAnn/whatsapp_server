import { User } from "../models/user.js"

export const newUser = async(req, res) => {
   await User.create({
      username: "khahhann2",
      email: "khanhanbui2003@gmail.com",
      phoneNumber: "0383858655",
      status: "Online",
      passwordHash: "10102003",
      profilePicture: "",
      isActive: true,
   });
   res.status(201).json({message: "User created successfully!"});
}