"use client"

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data, error} = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log("Error: ", error)
            return
        } 

        setEmail("")
        setPassword("")
    }

    return (
        <div className="bg-white h-screen text-black flex items-center justify-center">
            <div className="border w-1/2 h-1/2">
                <div className="pt-12">
                    <h2 className="text-center text-5xl font-bold tracking-tight">Signup</h2>

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
                            Create an account
                        </button>
                    </form>


                
                </div>
            </div>
        </div>
    )
}