import { createClient } from "@/lib/supabaseServer"
import Sidebar from "./Sidebar"
import { redirect } from "next/navigation"

export default async function Dashboard () {

    const supabase = await createClient()
    const { data: { user }} = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
    
    const {data, error} = await supabase
        .from('documents')
        .select('*, packages(*)')


    return (
        <div className="flex">
            <Sidebar data={data}/>

            <div className="w-[70%]">
                
            </div>
        </div>
    )
}