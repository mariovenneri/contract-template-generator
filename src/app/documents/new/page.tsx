"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoveLeft } from "lucide-react"


type Package = {
    id: number,
    name: string,
    price: number
}

type AddOn = {
    id: number,
    name: string,
    price: number
}

export default function NewDocumentPage() {

    const router = useRouter()

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
    const [packages, setPackages] = useState<Package[]>([])
    const [packageId, setPackageId] = useState('')
    const [paymentStructure, setPaymentStructure] = useState('')
    const [revisionRounds, setRevisionRounds] = useState('');
    const [timeline, setTimeline] = useState('')
    const [addOns, setAddOns] = useState<AddOn[]>([])
    const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])
    const [toggleAddOnCheckbox, setToggleAddOnCheckbox] = useState(false)


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        // nested destructuring -> grabbing user_id from auth.user_id
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log('There is no user')
            return
        }

        const { data, error } = await supabase.from('documents').insert({
            client_name: clientName,
            client_email: email,
            client_address: filteredAddress,
            effective_date: effectiveDate,
            start_date: startDate,
            project_overview: projectOverview,
            total_price: totalPrice,
            package_id: packageId,
            payment_structure: paymentStructure,
            user_id: user.id,
            timeline: timeline || null,
            revision_rounds: revisionRounds || null, 
            add_ons: selectedAddOns || null,
            select_add_ons: toggleAddOnCheckbox
        })
        .select()
        .single()

        // if there is an error, log it and stop the run so info doesn't immediately clear
        if (error) {
            console.log("Error", error)
            return    
        } 

            setFirstName("")
            setLastName("")
            setEmail("")
            setStreetAddress("")
            setCity("")
            setState("")
            setZipCode("")
            setEffectiveDate("")
            setStartDate("")
            setProjectOverview("")
            setTotalPrice("")
            setPackageId("")
            setPaymentStructure("")
            setTimeline("")
            setRevisionRounds("")
            setSelectedAddOns([])
            setToggleAddOnCheckbox(false)

            router.push(`/documents/${data.id}`)
    
    }

    // get packages useEffect
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


    // get add-ons useEffect
    useEffect(() => {
        const getAddOns = async () => {
            const { data: addOns, error } = await supabase.from('add_ons').select('*')
            if (error) {
                console.log(error)
            } else {
                setAddOns(addOns)
            }
        }
        getAddOns()
    }, [])

    // check users if logged in useEffect
    useEffect(() => {
        const checkUsers = async () => {
            const { data: {  user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
            }
        }
        checkUsers()
    }, [])

    const clientName = `${firstName} ${lastName}`
    
    const filteredAddress = [streetAddress, city, state, zipCode].filter(item => Boolean(item)).join(', ')

    const handleAddOns = (checked: boolean, item: AddOn) => {
        if (checked) {
            setSelectedAddOns([...selectedAddOns, item])
        } else {
            setSelectedAddOns(selectedAddOns.filter((a) => a.id != item.id))
        }
    }


    return (
        <div className="min-h-screen text-black m-4">
            <form 
                onSubmit={handleSubmit}
            >
                <div className="flex justify-between">
                    <h1 className="text-4xl tracking-tighter">Start with your information</h1>
                    <Button
                        onClick={() => router.back()}
                        className="hover:cursor-pointer"
                    >
                        <MoveLeft/> Back
                    </Button>
                </div>

                    <div className="flex justify-center gap-6 mt-12 mb-6">
                        <div className="w-full">
                            {/* first name */}
                            <Label htmlFor="first-name">First Name</Label>
                            <Input 
                                type="text" 
                                value={firstName} 
                                id="first-name"
                                onChange={(e) => setFirstName(e.target.value)}
                                className=""
                                placeholder=""
                            />
                        </div>

                        <div className="w-full">
                            {/* last name */}
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input 
                                type="text" 
                                value={lastName} 
                                id="last-name"
                                onChange={(e) => setLastName(e.target.value)}

                            />
                        </div>
                    </div>
                    
                    

                {/* email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        type="email"
                        id="email"
                        value={email}      
                        onChange={(e) => setEmail(e.target.value)}             
                    />
                </div>

                {/* user address */}
                <div className="flex flex-col my-5">
                    <h1 className="text-xl pb-4">Address:</h1>
                    <Label htmlFor="street-address">Street</Label>
                    <Input
                        id="street-address"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)} 
                    />
                    <Label htmlFor="city" className="pt-4">City</Label>
                    <Input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <Label htmlFor="state" className="pt-4">State</Label>
                    <Input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)} 
                    />
                    <Label htmlFor="zipcode" className="pt-4">Zip Code</Label>
                    <Input
                        id="zipcode"
                        type="number"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)} 
                    />
                </div>

                {/* effective date */}
                <div>
                    <Label htmlFor="effective-date">Effective Date</Label>
                    <Input 
                        type="date"
                        id="effective-date"
                        value={effectiveDate}      
                        onChange={(e) => setEffectiveDate(e.target.value)}             
                    />
                </div>

                {/* start date */}
                <div>
                    <Label htmlFor="start-date" className="pt-4">Start Date</Label>
                    <Input 
                        type="date"
                        id="start-date"
                        value={startDate}      
                        onChange={(e) => setStartDate(e.target.value)}             
                    />
                </div>

                {/* project overview */}
                <div className="flex flex-col mt-10">
                    <Label htmlFor="project-overview">Project Overview</Label>
                    <Textarea
                        id="project-overview"
                        cols={30}
                        value={projectOverview}
                        onChange={(e) => setProjectOverview(e.target.value)}
                    >
                    </Textarea>
                </div>

                {/* total price */}
                <Label htmlFor="total-price" className="pt-6">Total Price</Label>
                    <Input 
                        type="number"
                        id="total-price"
                        value={totalPrice}      
                        onChange={(e) => setTotalPrice(e.target.value)}             
                    />

                {/* packages */}
                <Label className="pt-6">Choose Your Package</Label>
                <Select value={packageId} onValueChange={(value) => setPaymentStructure(value ?? "")}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose a package" />
                </SelectTrigger>
                <SelectContent>
                    {packages.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                        {p.name} - {p.price}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                        
                {/* payment structure */}
                <Label className="pt-6">Choose Your Payment Structure</Label>
                    <Select value={paymentStructure} onValueChange={(value) => setPaymentStructure(value ?? "")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose your payment structure" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full">Paid In Full</SelectItem>
                            <SelectItem value="split_50_50">50/50</SelectItem>
                            <SelectItem value="split_50_25_25">50/25/25</SelectItem>
                        </SelectContent>
                    </Select>


                {/* timeline (primarily for bespoke projects) */}
                <div className="pt-8">
                    <Label htmlFor="timeline">Timeline (if client needs custom timeline) in weeks (number - weeks)</Label>
                        <Input
                            id="timeline"
                            type="text"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)} 
                        />
                </div>

                {/* revision rounds (primarily for bespoke projects) */}
                <div className="pt-8">
                    <Label htmlFor="revision-rounds">Rounds of Revision (for bespoke projects)</Label>
                        <Input
                            id="revision-rounds"
                            type="number"
                            value={revisionRounds}
                            onChange={(e) => setRevisionRounds(e.target.value)} 
                        />
                </div>

                {/* select add-ons for projects */}
                <div className="pt-8">
                    <h2>Choose your Add-ons:</h2>
                    {addOns.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center gap-2"
                        >
                            <label htmlFor={String(item.id)}>{item.name} - ${item.price}</label>
                            <Checkbox
                                id={String(item.id)}
                                checked={selectedAddOns.some((a) => a.id === item.id)}
                                onCheckedChange={(checked: boolean) => handleAddOns(checked, item)} 
                                />
                        </div>
                    ))}
                </div>

                {/* did user select preferred add-ons */}
                <div className="pt-8">
                    <h2>Did Client already select their preferred optional add-ons?</h2>
                    <Button
                        type="button"
                        onClick={() => setToggleAddOnCheckbox(!toggleAddOnCheckbox)}
                        className={`px-6 py-4 ${toggleAddOnCheckbox ? "bg-green-500 hover:bg-green-500/80" : "bg-red-500 hover:bg-red-500/80"} text-white font-bold rounded hover:cursor-pointer`}
                    >
                        {toggleAddOnCheckbox ? "Yes": "No"}
                    </Button>
                </div>


                {/* submit button */}
                <div className="flex items-center justify-center mt-15">
                    <Button
                        type="submit"
                        className="px-10 py-6 bg-black text-white rounded-xl font-bold hover:opacity-75 hover:cursor-pointer"
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </div>
    )
}