import { connectDB } from "@/lib/dbconfig";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credientials: {},

            async authorize(credientials) {
                const { email, password } = credientials

                try {
                    await connectDB()
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null
                    }

                    // if you hashed your pass with bcrypt, 
                    // you need to compare bcrypt from here.
                    // i didn't hashed, so nothing to compare

                    // const passMatch = await bcrypt.compare(password, user.password)

                    // if (!passMatch) {
                    //     return null
                    // }

                    if (password === user.password) {
                        return user
                    } else {
                        return null
                    }

                } catch (error) {
                    console.log("error ", error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }