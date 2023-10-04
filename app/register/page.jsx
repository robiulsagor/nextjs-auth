"use client"

import Loading from "@/components/Loading"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {
    const router = useRouter()

    const [user, setUser] = useState({
        name: '', email: '', password: '', dob: '', sex: '', error: false, loading: false
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if (!user.name || !user.email || !user.password || !user.dob || !user.sex) {
            setUser({ ...user, error: "Please fill in all fields.", loading: false })
            return
        }
        setUser({ ...user, error: false, loading: true })
        try {
            const res = await axios.post('/api/register', user)

            setUser({ ...user, loading: false })
            console.log(res.data);
            if (res.data.msg === "User created!") {
                router.push("/")
            }
        } catch (error) {
            console.log("Err", error);
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center bg-slate-100'>
            <div className='w-[500px] shadow-lg bg-white rounded-md py-4 px-6'>
                <h2 className='text-3xl font-bold text-center text-slate-600 my-3'>Register</h2>

                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-5 mt-6'
                    encType="multipart/form-data">

                    {/* error div */}
                    {user.error && (
                        <p className="bg-red-500 text-white p-2 w-fit rounded text-sm">
                            {user.error}
                        </p>
                    )}

                    <input type="text" placeholder='Enter your name'
                        value={user.name}
                        onChange={e => setUser({ ...user, name: e.target.value })} />

                    <input type="text" placeholder='Enter your email'
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })} />

                    <input type="password" placeholder='Enter your password' value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })} />

                    <div className="flex items-center justify-center bg-slate-100 px-2 text-slate-400 pl-4">
                        <div className="w-32   py-3">Date of Birth:</div>
                        <input type="date" value={user.dob} onChange={e => setUser({ ...user, dob: e.target.value })}
                            className=" flex-grow" />
                    </div>

                    <div className="flex items-center justify-center bg-slate-100 px-2 text-slate-400 pl-4 py-3">
                        <div className="w-32">Sex:</div>
                        <select name="" id="" className="flex-grow bg-slate-100 outline-none" defaultValue={'none'}
                            onChange={e => setUser({ ...user, sex: e.target.value })}>
                            <option value="none" disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>


                    <button type="submit" className="bg-green-500 text-white font-bold p-2 rounded hover:bg-green-400 transition-all block text-center">
                        {user.loading ? <Loading /> : "Submit"}
                    </button>
                </form>
                <p className="block mt-5 text-slate-600 text-sm text-right">Already have a account? <Link href='/login' className="underline">Login</Link> now</p>
            </div>
        </div>
    )
}

export default Register