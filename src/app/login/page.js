"use client"

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data, error} = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            console.log("Error: ", error)
            return
        } 

        console.log(data.session)
        alert(`You have logged into your account at ${email}`)

        setEmail("")
        setPassword("")

        router.push('/dashboard')
    }

    return (
        <div className="bg-white h-screen text-black flex items-center justify-center">
            <div className="border w-1/2 h-1/2">
                <div className="pt-12">
                    <h2 className="text-center text-5xl font-bold tracking-tight">Login</h2>

                    {/* input field */}
                    <form 
                        className="pt-12 mx-6"
                        onSubmit={handleSubmit}
                    >

                        {/* email field */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email Address:</label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                className="bg-neutral-200 border"
                            />
                        </div>

                        {/* password input */}
                        <div className="flex flex-col gap-1 pt-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                className="bg-neutral-200 border"
                            />
                        </div>

                        {/* submit btn */}
                        <button 
                            type="submit"
                            className="flex justify-center items-center mx-auto mt-12 bg-blue-400 px-8 py-6 text-white font-bold tracking-tighter text-xl rounded-lg hover:cursor-pointer"
                        >
                            Log in to your account
                        </button>
                    </form>


                
                </div>
            </div>
        </div>
    )
}