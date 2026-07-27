import { supabase } from "@/lib/supabaseClient";

export default async function Home() {

  const { data, error } = await supabase.from('documents').select('*, packages(*)');
  console.log(data[0].packages)
  

  return (
    <div>
      <div className="bg-white">
        {data.map((d, index) => {

          return (
            <p
            key={index} 
            className="font-bold text-pink-500">{d.client_name} - {d.packages?.created_at}
            </p>
          )
        })}
      </div>
    </div>
  )
}