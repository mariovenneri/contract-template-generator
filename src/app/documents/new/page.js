"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function NewDocumentPage() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [effectiveDate, setEffectiveDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [projectOverview, setProjectOverview] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [packages, setPackages] = useState([])
    const [packageId, setPackageId] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.from('documents').insert({
            client_name: clientName,
            client_email: email,
            client_address: clientAddress,
            effective_date: effectiveDate,
            start_date: startDate,
            project_overview: projectOverview,
            total_price: totalPrice,
            package_id: packageId
        })
        console.log(error)

    }

    useEffect(() => {
        const getPackages = async () => {
            const { data: packages, error } = await supabase.from('packages').select('*')
            if (error) {
                console.log(error)
            } else {
                setPackages(packages)
            }
        }
        getPackages()
    }, [])

    const clientName = `${firstName} ${lastName}`
    const clientAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`


    return (
        <div className="bg-blue-200 min-h-screen text-black">
            <form 
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl">Start with your information</h1>
                <div className="flex justify-evenly">

                    {/* first name */}
                    <label htmlFor="first-name">First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        id="first-name"
                        onChange={(e) => setFirstName(e.target.value)}

                    />

                    {/* last name */}
                    <label htmlFor="last-name">Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        id="last-name"
                        onChange={(e) => setLastName(e.target.value)}

                    />
                </div>

                {/* email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        value={email}      
                        onChange={(e) => setEmail(e.target.value)}             
                    />
                </div>

                {/* user address */}
                <div className="flex flex-col my-5">
                    <h1>Address</h1>
                    <label htmlFor="street-address">Street</label>
                    <input
                        id="street-address"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)} 
                    />
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)} 
                    />
                    <label htmlFor="zipcode">Zip Code</label>
                    <input
                        id="zipcode"
                        type="number"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)} 
                    />
                </div>

                {/* effective date */}
                <div>
                    <label htmlFor="effective-date">Effective Date</label>
                    <input 
                        type="date"
                        id="effective-date"
                        value={effectiveDate}      
                        onChange={(e) => setEffectiveDate(e.target.value)}             
                    />
                </div>

                {/* start date */}
                <div>
                    <label htmlFor="start-date">Start Date</label>
                    <input 
                        type="date"
                        id="start-date"
                        value={startDate}      
                        onChange={(e) => setStartDate(e.target.value)}             
                    />
                </div>

                {/* project overview */}
                <div className="flex flex-col mt-10">
                    <label htmlFor="project-overview">Project Overview</label>
                    <textarea
                        id="project-overview"
                        cols={30}
                        value={projectOverview}
                        onChange={(e) => setProjectOverview(e.target.value)}
                    >
                    </textarea>
                </div>

                {/* total price */}
                <label htmlFor="total-price">Total Price</label>
                    <input 
                        type="number"
                        id="total-price"
                        value={totalPrice}      
                        onChange={(e) => setTotalPrice(e.target.value)}             
                    />

                {/* packages */}
                <div>
                    <select
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                    >
                        <option value="">Choose a package:</option>
                        {packages.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name} - ${p.price}
                            </option>
                        ))}
                    </select>   

                </div>

                {/* submit button */}
                <div className="flex items-center justify-center mt-15">
                    <button
                        type="submit"
                        className="px-10 py-6 bg-black text-white rounded-xl font-bold hover:opacity-75 hover:cursor-pointer"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}