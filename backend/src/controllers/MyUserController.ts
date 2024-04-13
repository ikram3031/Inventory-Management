import { Request, Response } from "express";
import User from "../modals/user";

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

export default {
    createCurrentUser
}