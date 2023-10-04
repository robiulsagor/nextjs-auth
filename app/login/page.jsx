"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState({
        name: '', email: '', password: '', error: false, loading: false
    })

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        if (!user.email || !user.password) {
            setUser({ ...user, error: "Please fill in all fields." })
            return
        }
        setUser({ ...user, error: false })

        try {
            const res = await signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: false
            })

            if (res.error) {
                setUser({ ...user, error: "Invalid credientials!!" })
                return;
            }

            router.replace('dashboard')
        } catch (error) {

        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center bg-slate-100'>
            <div className='w-[500px] shadow-lg bg-white rounded-md py-4 px-6'>
                <h2 className='text-3xl font-bold text-center text-slate-600 mt-3'>Login</h2>

                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-5 mt-6'>

                    {/* error div */}
                    {user.error && (
                        <p className="bg-red-500 text-white p-2 w-fit rounded text-sm">
                            {user.error}
                        </p>
                    )}

                    <input type="text" placeholder='Enter your email'
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })} />

                    <input type="password" placeholder='Enter your password' value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })} />

                    <button type="submit" className="bg-green-500 text-white font-bold p-2 rounded hover:bg-green-400 transition-all">
                        Submit
                    </button>
                </form>

                <p className="block mt-5 text-slate-600 text-sm text-right">Don't have an account? <Link href='/register' className="underline">Register</Link> now</p>
            </div>
        </div>
    )
}

export default Login