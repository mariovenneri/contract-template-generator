import { supabase } from "@/lib/supabaseClient";

export default async function Home() {

  const { data, error } = await supabase.from('packages').select()
  

  return (
    <>
      <div className="bg-white">
        {data.map((d, index) => {

          return (
            <p
            key={index} 
            className="font-bold text-pink-500">{d.name} - ${d.price}</p>
          )
        })}
      </div>
    </>
  )
}