import { Request, Response } from "express";
import User from "../models/user";


const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const currentUser = await User.findOne({ _id: req.userId });
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(currentUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
};

const createCurrentUser = async (req: Request, res:Response) => {
    
    try{
        // 1. Check if user exists
        const { auth0Id } = req.body;
        const existinguser = await User.findOne({ auth0Id });
        
        if(existinguser){
            return res.status(200).send()
        }
        
        //2. Create the user if it doesn't exist
        const newUser = new User(req.body);
        await newUser.save();
        
        //3. return the user object with auth0Id
        res.status(201).json(newUser.toObject());
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
    
}

const updateCurrentUser = async (req: Request, res:Response) => {
    try{
        const { name, addressLine1, country, city } = req.body;

        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        
        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        
        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    }catch(error) {
        console.log(error)
        res.status(500).json({ message: "Error updating user" });
    }
}

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
}