"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, FilePlus, FileStack, House, X } from 'lucide-react';
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Document = { 
    id: number,
    client_name: string
}

const Sidebar = ({ data }: { data: Document[] }) => {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [viewAll, setViewAll] = useState(false)

    const handleLogout =  async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log("Error ", error)
            return
        }

        router.push('/login')
    }


  return (
    <div className="w-[30%] bg-white text-black h-screen px-2 pt-2 flex flex-col">
        
            {/* logo / home */}
            <h1 className="text-2xl font-bold tracking-tighter">Contract Generator</h1>

            {/* nav links */}
            <nav className="pt-12 flex flex-col gap-2 hover:cursor-pointer">
                <ul>

                    {/* home menu */}
                    <li className="flex gap-2 hover:bg-neutral-200/90 p-3 rounded-lg">
                        <House />
                        <a href={"/dashboard"}>Home</a>
                    </li>

                    {/* new document */}
                    <li className="flex gap-2 hover:bg-neutral-200/90 p-3 rounded-lg">
                        <FilePlus />
                        <a href={"/documents/new"}>New Document</a>
                    </li>

                    {/* load existing documents */}
                    <li className="flex gap-2 hover:bg-neutral-200/90 p-3 rounded-lg">
                        <FileStack />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Your Documents
                        </button>
                    </li>
                </ul>
            </nav>

                {/* if existing docs button is open */}
                {isOpen && (
                    <div className="pt-3">
                        {data.slice(0, 3).map((d) => (
                            <a 
                                key={d.id}
                                href={`/documents/${d.id}`}
                                className="flex flex-col mx-3 hover:translate-x-2 transition"
                            >
                                {d.client_name}
                                <div className="border-b my-1"></div>
                            </a>
                         ))}

                        {/* button to view all documents */}
                        <button 
                            className="bg-red-500 px-6 py-4 text-white rounded w-full text-left my-6 flex gap-1 items-center hover:cursor-pointer hover:bg-red-500/90 transition"
                            onClick={() => setViewAll(!viewAll)}
                        >
                            View all Documents 
                            <ArrowRight width={18} />
                        </button>

                        {/* modal to view all documents */}
                        {viewAll && (
                            <div className="absolute bg-black/50 inset-0 z-50">
                                <div className="flex justify-center items-center text-[#f0f0f0] h-screen">
                                    <div className="border-2 border-neutral-800 shadow-xl h-1/2 w-1/2 bg-neutral-900">

                                    {/* x button to close out of modal */}
                                        <div className="flex justify-between px-2 pt-2">
                                            <h1 className="text-5xl tracking-tighter font-bold">Documents</h1>
                                            <button
                                                onClick={() => setViewAll(!viewAll)}
                                                className="hover:cursor-pointer"
                                            >
                                                <X size={28} />
                                            </button>
                                        </div>

                                        {/* mapped over all documents */}
                                        <div className="pt-6">
                                            {data.map((d) => (
                                                <a 
                                                    key={d.id}
                                                    href={`/documents/${d.id}`}
                                                    className="flex flex-col mx-3 hover:translate-x-2 transition"
                                                >
                                                    {d.client_name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            {/* log out button */}
            <div className="mt-auto mb-3 mx-3">
                <div className="">
                    <button 
                        className="bg-neutral-200 px-6 py-4 rounded text-sm hover:cursor-pointer hover:bg-neutral-200/80 transition-all mt-auto"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>

    </div>
  )
}

export default Sidebar