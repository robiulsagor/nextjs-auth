import { connectDB } from "@/lib/dbconfig"
import User from "@/models/User"
import { NextResponse } from "next/server"


export async function POST(req, res) {

    try {
        const userData = await req.json()
        await connectDB()

        const user = await User.create(userData)
        if (user) {
            return NextResponse.json({ msg: "User created!", user })
        }
        return NextResponse.json({ msg: "User creating failed!" })
    } catch (error) {
        return NextResponse.json({ msg: "failed" })
    }
}