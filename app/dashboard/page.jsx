"use client"

import { signOut } from "next-auth/react"

const Dashboard = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[500px] bg-slate-100 text-center p-10">
                <h2 className="text-xl">Hello user!</h2>
                <h3 className="text-3xl">Welcome</h3>

                <button className="bg-red-500 text-white py-1 px-5 mt-5 rounded"
                    onClick={() => signOut()} >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard