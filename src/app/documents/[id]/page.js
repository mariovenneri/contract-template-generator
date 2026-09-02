import NectAgreement from "@/components/NectAgreement";
import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function DynamicIDDocument({ params }) {
    const { id } = await params;
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const {data, error} = await supabase
        .from('documents')
        .select('*, packages(*)')
        .eq('id', id)
        .single()


    console.log(id);

    if (!data) {
        return <p>Document not found</p>
    }

    return (
        <>
            <div className="flex justify-center items-center print:hidden">
                <a
                    className="bg-blue-500 py-12 w-full font-bold text-4xl hover:cursor-pointer text-center tracking-tight"
                    href={`/api/pdf?id=${id}`}
                >
                    Download PDF
                </a>
            </div>
            <NectAgreement data={data}/>
        </>
    )
}