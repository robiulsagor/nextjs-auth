import { connectDB } from "@/lib/dbconfig";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()
        const { email } = await req.json()
        const user = await User.findOne({ email }).select("_id")

        return NextResponse.json({ user })
    } catch (error) {
        return NextResponse.json({ msg: "error" })
    }
}