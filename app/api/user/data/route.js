import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        console.log("Starting GET /app/user/data"); // Log start of request

        const { userId } = getAuth(request);
        console.log("User ID from Clerk:", userId); // Log the user ID

        console.log("Connecting to database...");
        await connectDB();
        console.log("Database connected."); // Log successful connection

        console.log("Fetching user from database...");
        const user = await User.findById(userId);
        console.log("User fetched:", user); // Log the fetched user

        if (!user) {
            console.log("User not found."); // Log user not found
            return NextResponse.json({ success: false, message: "User Not Found" });
        }

        console.log("User data found:", user); // Log user data found
        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error("Error in GET /app/user/data:", error); // Log the error
        return NextResponse.json({ success: false, message: error.message });
    }
}