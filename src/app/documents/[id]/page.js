import NectAgreement from "@/components/NectAgreement";
import { supabase } from "@/lib/supabaseClient";


export default async function DynamicIDDocument({ params }) {
    const { id } = await params;
    const {data, error} = await supabase
        .from('documents')
        .select('*, packages(*)')
        .eq('id', id)
        .single()

    console.log(id);


    return (
        <>
            <h1>Client Name: {data.client_name}</h1>
            <h1>Client Email: {data.client_email}</h1>
            <h1>Client Address: {data.client_address}</h1>
            <h1>Effective Date: {data.effective_date}</h1>
            <h1>Start Date{data.start_date}</h1>
            <h1>Project Overview: {data.project_overview}</h1>
            <h1>Total price: ${data.total_price}</h1>
            <h1>{data.packages?.name}</h1>
            <h1>{data.payment_structure}</h1>

            <h1 className="text-6xl pt-24">Contract:</h1>
            <NectAgreement data={data}/>
        </>
    )
}