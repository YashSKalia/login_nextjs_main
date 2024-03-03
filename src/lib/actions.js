"use server"

import { connectToDB } from "./connectToDB";
import {  User } from "./models";
// import { signIn, signOut } from "../lib/auth"
import bcrypt from "bcryptjs";

export const registerAction = async (formData) => {
    const {username, email, password, role} = Object.fromEntries(formData);

    // console.log(formData);

    // if( password !== confirmPassword) {
    //     // throw new Error("Passwords do not match");
    //     console.log("Passwords do not match")
    //     return {error: "passwords do not match"};
    // }

    try {
        connectToDB();
    
        const user = await User.findOne({username});

        if(user) {
            return  {error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
// Store hash in your password DB.

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
        })

        // console.log(newUser);

        await newUser.save();
        console.log("User registered successfully");
        //success is boolean because if success is true we can redirect user to home/login page
        // return {success: true};

    }
    catch(err) {
        console.error(err);
        // throw new Error("failed registering using user creds");
        console.log("failed registering using user creds");
        // return { error: "failed registering using user creds"}
    }

}
