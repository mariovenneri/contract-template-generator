import NectAgreement from "@/components/NectAgreement";
import { createClient } from "@/lib/supabaseServer";

export default async function DynamicIDDocument({ params }) {
    const { id } = await params;
    const supabase = await createClient()
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
            {/* 
            
            <h1>Client Name: {data.client_name}</h1>
            <h1>Client Email: {data.client_email}</h1>
            <h1>Client Address: {data.client_address}</h1>
            <h1>Effective Date: {data.effective_date}</h1>
            <h1>Start Date{data.start_date}</h1>
            <h1>Project Overview: {data.project_overview}</h1>
            <h1>Total price: ${data.total_price}</h1>
            <h1>{data.packages?.name}</h1>
            <h1>{data.payment_structure}</h1>
            
            */}
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