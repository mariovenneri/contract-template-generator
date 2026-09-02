import Header from "@/ui/Header"

type Document = {
    client_name: string,
    client_address: string,
    client_email: string
    total_price: number,
    payment_structure: string | null,
    project_overview: string
    effective_date: string,
    start_date: string,
    timeline: string | null,
    select_add_ons: boolean,
    revision_rounds: number | null
    packages: {
        name: string,
        included_features: string[],
        revision_rounds: number,
        email_support_days: number,
        timeline: string
    } | null,
    add_ons: {
        id: number,
        name: string,
        price: number
    }[] | null
}

const NectAgreement = ({ data }: { data: Document}) => {

const paymentTable = (structure = data.payment_structure) => {
    if (structure == "full") {
        return(
            [
                {
                    label: "Client has requested to pay in full.",
                    price: data?.total_price || "Resubmit form for proper data",
                    when: `Client will pay $${data.total_price} before start date`
                }
            ]
        )  
    } else if (structure == "split_50_50") {
        return (
            [
                {
                    label: "First payment (50%)",
                    price: data?.total_price / 2 || "Resubmit form for proper data",
                    when: "50% will be paid before projects start."
                },
                {
                    label: "Final payment (50%)",
                    price: data?.total_price / 2 || "Resubmit form for proper data",
                    when: "50% will be paid before the end of the project."
                }

            ]
        )  
    } else if (structure == "split_50_25_25") {
        return (
            [
                {
                    label: "First payment (50%)",
                    price: data?.total_price / 2 || "Resubmit form for proper data",
                    when: "Client will pay 50% before the project starts"
                },
                {
                    label: "Second payment (25%)",
                    price: data?.total_price / 4 || "Resubmit form for proper data",
                    when: "Client will pay 25% after first revision"
                },
                {
                    label: "Final payment (25%)",
                    price: data?.total_price / 4 || "Resubmit form for proper data",
                    when: "Client will pay the remaining 25% before the project launch"
                }
            ]
        )
    }
}

const paymentResult = paymentTable(data.payment_structure)

console.log(paymentTable(data.payment_structure))

console.log(paymentTable(data.payment_structure)?.length)




    
  return (
    <div className="bg-[#f0f0f0] text-black pt-6 px-3">

        {/* contract start */}
        <div className="text-center">
            
            {/* header + client's name and website name */}
            <h1 className="text-4xl font-bold uppercase">Web Developer Agreement</h1> 
            <h2>{data.client_name} — {data.client_name}'s Website </h2> 
                <p className="italic text-neutral-600">Built with Nect</p> 

        </div>

        {/* Parties section of contract */}
        <div className="py-12">

            {/* header */}
            <h2 className="uppercase font-bold">Parties</h2>

            {/* table for all parties */}
            <div className="grid grid-cols-2 grid-rows-3 gap-y-3">

                {/* developer info */}
                <h3>Developer</h3>
                <div>
                    <p>Mario Venneri, doing business as Nect</p> 
                    <p>Palmyra, New Jersey</p> 
                    <p>mario@mariovenneri.com</p>
                </div>

                <div className="border-b"></div>
                <div className="border-b"></div>

                {/* client info */}
                <h3>Client</h3>

                <div>
                    <p>{data.client_name}</p> 
                    <p>{data.client_address}</p> 
                    <p>{data.client_email}</p>

                </div>
            </div>
        </div>

        {/* summary of contract info */}
        <div className="pb-12">
            <h3><span className="font-bold">Effective Date:</span> {data.effective_date} </h3>
            <h3><span className="font-bold">Project Start Date:</span> {data.start_date} </h3>
            <h3><span className="font-bold">Package</span> {data.packages?.name}</h3>
            <h3><span className="font-bold">Project Total:</span> ${data.total_price}</h3>
            <h3><span className="font-bold">Governing Law:</span> State of New Jersey, United States of America </h3>
        </div>

    {/* contract numbered points (1-12) */}

        {/* 1. project overview */}
        <Header>1. Project Overview</Header>
        <p className="pb-6">{data.project_overview}</p>


        {/* 2. what's included */}
        <Header>2. What's Included</Header>
        <p className="pb-6">I'll design, build, and launch a website for you. This project includes: </p>

            {/* section of bullets per project package */}
            <ul className="mx-12">
                {data.packages?.included_features.map((item, index) => (
                    <li
                        key={index}
                    >
                        – {item}
                    </li>
                ))}
                <li>– Responsive design that works on phones, tablets, and computers </li>
                <li>– Deployment to live hosting via Vercel </li>
                <li>– Basic search engine setup so your site can be found and displayed properly</li>
                <li>– Privacy policy page + custom 404 page</li>
                <li>– {data.revision_rounds ?? data.packages?.revision_rounds} round(s) of revisions </li>
                <li>– {data.timeline ?? data.packages?.timeline} turnaround</li>
                <li>– {data.packages?.email_support_days} days post launch email support </li>
            </ul>

        <p className="py-6"><span className="font-bold">A note on search engines:</span> I set up the technical foundations so search engines can find and correctly display your  site. I do not guarantee search rankings, which no one can control. </p>



        {/* 3. optional add-ons + whats not included */}
            {data.add_ons ? (

                // if there ARE add-ons included / displayed
                <>
                    <Header>3. {data.select_add_ons ? "Selected" : "Optional"} Add-Ons & What's Not Included</Header>

                    {/* optional add-on half */}
                    <p className="pb-6"><span className="font-bold">{data.select_add_ons ? "Selected Add-Ons" : "Optional Add-Ons"}</span> — {data.select_add_ons ? "included below are the add-ons you selected, price is reflected in total (see Section 5)" : "available if you'd like them, added to your total only if you choose them:"}</p>
                    {/* mapping over all selected add-ons from documents/new */}
                     {data.add_ons?.map((a) => (
                         <div
                             key={a.id}
                             className="flex gap-4"
                         >
                            <ul className="ml-12">
                                <li>– {a.name}: ${a.price}</li>
                            </ul>
                            
                        
                            {/* checkbox container + radio buttons removed if user clicks yes to selected options */}
                            <div className={`pl-2 ${data.select_add_ons && "hidden"}`}>

                                {/* yes checkbox */}
                                <input 
                                    type="radio"
                                    name="checkbox"
                                    id="yes"
                                />
                                <label htmlFor="yes" className="pr-2 pl-1">Yes</label>
                            
                                {/* no checkbox */}
                                <input 
                                    type="radio"
                                    name="checkbox"
                                    id="no"
                                />
                                <label htmlFor="no" className="pl-1">No</label>            
                            </div>
                         </div>
                     ))}

                     {/* whats not included half */}
                     <p className="py-6">The following fall outside this agreement and would be quoted separately:</p>

                     {/* section of bullet points for what's not in project scpoe */}
                    <ul className="mx-12 pb-6">
                        <li>– Logo design, brand identity, photography, or videography </li>
                        <li>– Writing your bio or other written content </li>
                        <li>– New pages or features beyond what's listed above </li>
                        <li>– SEO campaigns, paid advertising, or social media management </li>
                        <li>– Ongoing content updates after launch (see Section 7). Anything requested beyond the scope above will be quoted separately and must be agreed in writing before work  begins. Conversations are great, but a verbal “can you just add…” doesn't change the scope </li>
                        <li>— it has to be in writing so we both have the same understanding. </li>
                    </ul>

                </>
            ) : (

                // If there are NO add on 
                <>
                    <Header>3. What's Not Included</Header>
                    <p className="pb-6">The following fall outside this agreement and would be quoted separately:</p>


                    {/* section of bullet points for what's not in project scpoe */}
                    <ul className="mx-12 pb-6">
                        <li>– Logo design, brand identity, photography, or videography </li>
                        <li>– Writing your bio or other written content </li>
                        <li>– New pages or features beyond what's listed above </li>
                        <li>– SEO campaigns, paid advertising, or social media management </li>
                        <li>– Ongoing content updates after launch (see Section 7). Anything requested beyond the scope above will be quoted separately and must be agreed in writing before work  begins. Conversations are great, but a verbal “can you just add…” doesn't change the scope </li>
                        <li>— it has to be in writing so we both have the same understanding. </li>
                    </ul>
                </>
            )}


        {/* 4. timeline */}
        <Header>4. Timeline</Header>
        <p className="pb-3">Estimated turnaround: <span className="font-bold">{data.timeline ?? data.packages?.timeline} </span> from your Project Start Date. 
</p>

        {/* bullet points in timeline section */}
        <div className="pb-6">
            <p className="pb-6">Two things affect this timeline, and both are worth understanding up front: 
</p>
        
        <ul className="mx-12 pb-6">
            <li>– <span className="font-bold">The clock starts on your start date, not the day you first reached out.</span> I take on a limited number of projects at a time so each one gets real attention.
</li>
            <li>– <span className="font-bold">The clock pauses while I'm waiting on you.</span> If I'm waiting on your bio, photos, music links, or feedback, that time isn't counted against the turnaround. 
</li>
        </ul>

        <p>I'd rather build it well than build it fast. If anything is going to run long, I'll tell you before it does — not after. 
</p>
        </div>
        

        {/* 5. payment */}
        <Header>5. Payment</Header>
            
        {/* table for payment plan */}
        <table className="">
            <thead>
                <tr>
                    <th className="border p-4">Payment</th>
                    <th className="border p-4">Amount</th>
                    <th className="border p-4">When</th>
                </tr>
            </thead>
                
            <tbody>
                {paymentResult?.map((row, index) => (
                    <tr 
                        className="py-6"
                        key={index}
                    >
                            <td className="border p-4">{row.label}</td>
                            <td className="border p-4">${row.price}</td>
                            <td className="border p-4">{row.when}</td>
                    </tr>
                    ))}
            </tbody>
        </table>

        {/* extra context for payment section */}
        <p className="pt-12">For Custom and Bespoke projects, payment is structured 50% / 25% / 25% across agreed milestones. 
</p>
            <p className="py-6">Invoices are sent through Wave and are due within 7 days. Work begins once the first payment is received. Your site stays on a private preview link until final payment clears, at which point it goes live and it's yours. 
</p>


        {/* 6.revisions */}
        <Header>6. Revisions</Header>
        <p>This project includes <span className="font-bold">{data.revision_rounds ?? data.packages?.revision_rounds} round(s) of revisions.</span></p>

        {/* revision explanation section */}
        <p className="py-3">Here's how it works. When your site is substantially complete, I'll send you a private preview link. You'll have 7 days to look it over and send me one consolidated list of everything you'd like changed — all of it together, in one message. I make those changes, and we launch. </p>
        <p className="pb-3">Feedback sent piece by piece over several days counts as multiple rounds, so gather your thoughts and send them at once. If I don't hear from you within 7 days, the site is considered approved.</p>
        <p className="pb-3">Additional revision rounds before launch are <span className="font-bold">$100 each.</span></p>
        <p className="pb-6">Requests that add new features or pages aren't revisions — they're new work, and I'll quote them separately.</p> 


        {/* 7. after your site launches */}
        <Header>7. After Your Site Launches</Header>
        <p className="pb-6"><span className="font-bold">The first {data.packages?.email_support_days} days after launch are covered.</span> If something is broken or you have questions about how anything works,  email me and I'll take care of it. This window covers bugs and questions — not content changes. </p>

        {/* post-site launch details bulleted */}
        <p>After that, you have two options, and there's no pressure either way: </p>

        <ul className="py-3 mx-12">
            <li><span className="font-bold">– Maintenance — $100/month.</span> Unlimited updates to your text, photos, and links (tour dates, bio, new music,  press). Bug fixes. Security and dependency updates. Requests handled within 2–3 business days. Cancel  anytime with 30 days' notice.</li>
            <li><span className="font-bold">– One-off changes — $75 per request.</span> A request can include several small updates submitted together.  Turnaround is 5–7 business days. Requests sent on separate days are billed separately. </li>
        </ul>

        <p className="py-6"><span className="font-bold">The line between the two:</span> changing content that already exists is an update. Building something that doesn't exist yet — a new page, a store, a booking system — is new work, and I'll quote it separately.</p>

        <p className="pb-6">Maintenance is opt-in. I won't start billing you unless you tell me to. </p>


        {/* 8. what I need from you */}
        <Header>8. What I Need From You </Header>
        <p className="pb-3">A website gets built faster when the person it's about is easy to reach. Here's what keeps things moving: </p>
            <ul className="mx-12">
                <li>– Your content — bio, photos, music links, and anything else we discussed — within 3 business days of your start date. <span className="font-bold">Send whatever you have, even if it's not final;</span> having real material to build around from day one keeps everything on track, and we can swap in final versions later. </li>
                <li>– Responses to my questions within 5 business days. </li>
                <li>– Your consolidated feedback on the preview within 7 days. </li>
                <li>– <span className="font-bold">Approvals and change requests in writing, by email.</span>  We can talk through anything on the phone, but if it's not  in an email, it isn't a change. </li>
            </ul>

            <p className="py-6">If I go 30 days without hearing back from you, I'll pause the project. I'd much rather that  never happen — if life gets busy, just tell me and we'll work it out. </p>



        {/* 9. ownership */}
        <Header>9. Ownership </Header>
        <div className="pb-6 flex flex-col gap-2">
            <p><span className="font-bold">Your website.</span> When your final payment clears, the site and everything in it is yours, permanently. Until then, I retain ownership of the code and design.</p>
            <p><span className="font-bold">Your domain.</span>
                You buy and own your domain name (roughly $15/year, paid directly to a registrar). It should be in  your name so it's always yours. I'll handle connecting it to your site. 
            </p>

            <p><span className="font-bold">Your content.</span> Your music, photos, words, and likeness remain yours. You confirm you have the right to use everything you send me. </p>
        </div>


        {/* 10. portfolio & behind-the-scenes */}
        <Header>10. Portfolio & Behind-the-Scenes </Header>
        <div className="pb-6 flex flex-col gap-2">
            <p><span className="font-bold">Portfolio.</span> I may show your finished website in my portfolio, on my site, and in professional materials. If you'd rather I didn't, just say so and I won't. </p>
            <p><span className="font-bold">Behind-the-scenes content.</span> I sometimes share process footage of myself building — no code, no private  information, just the work taking shape. Some artists love the extra exposure; some would rather keep it quiet.  Both are completely fine.</p>
        </div>

        {/* User chooses optional recording content  */}
        <div className="inline-flex">
            <p className="pb-6">Are you comfortable with your project appearing in behind-the-scenes content? 
            </p>

            {/* checkbox container */}
            <div className="pl-2">

                {/* yes checkbox */}
                <input 
                    type="radio"
                    name="checkbox"
                    id="yes"
                />
                <label htmlFor="yes" className="pr-2 pl-1">Yes</label>
            
                {/* no checkbox */}
                <input 
                    type="radio"
                    name="checkbox"
                    id="no"
                />
                <label htmlFor="no" className="pl-1">No</label>            
            </div>
        </div>

        
        {/* 11. if things change */}
        <Header>11. If Things Change</Header> 
        <div className="pb-6 flex flex-col gap-2">
            <p><span className="font-bold">If you cancel.</span> Deposits are non-refundable — they hold your place in the queue and I turn away other work to keep it. Anything you've paid is refunded, minus the work already completed.
            </p>
            <p><span className="font-bold">If I cancel.</span> If for any reason I can't complete the project, I'll refund everything you've paid beyond the work  delivered, and hand over whatever has been built. 
    </p>
            <p><span className="font-bold">Exceptions.</span> These terms are standard for every project. If you need an exception, ask — I'm a musician too and I  understand. Any exception must be agreed in writing before work begins, and is at my discretion. </p>
        </div>

            {/* 12. fine print */}
        <Header>12. The Fine Print</Header>
        <div className="pb-6 flex flex-col gap-2">
            <p>My total liability under this agreement will not exceed the amount you've paid me. I'm not responsible for outages  or failures of third-party services (hosting, email providers, domain registrars), or for losses arising from content you provide.</p>
            <p>This agreement is the whole agreement between us and replaces anything discussed beforehand. Changes must be  in writing and agreed by both of us. It's governed by the laws of the State of New Jersey. </p>
            <p>If a disagreement comes up, let's talk it through first. I'd rather solve a problem over a phone call than anywhere else.</p> 
        </div>

        
        {/* Agreement Signing Section */}
        <div className="py-24">
            <div className="text-center">
                {/* header + subheading */}
                <h1 className="text-4xl font-bold uppercase">Agreement</h1> 
                <h2>By signing below, we both agree to the terms set out in this document.</h2> 
            </div>
            
            {/* grid / developer and client signing section */}
            <div className="grid grid-cols-2 pt-12 mx-12">

                {/* developer side - left */}
                <div>
                    <h3 className="uppercase text-neutral-500 font-bold tracking-tight">Developer</h3>

                    {/* signature dev */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Signature</p>

                    {/* printed name dev */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Printed Name</p>

                    {/* date of signing dev */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Date</p>


                </div>

                {/* client side - right */}
                <div>
                    <h3 className="uppercase text-neutral-500 font-bold tracking-tight">Client</h3>

                    {/* signature client */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Signature</p>

                    {/* printed name client */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Printed Name</p>

                    {/* date of signing client */}
                    <div className="border-b border-neutral-600 mt-24 mr-12"></div>
                    <p className="text-sm text-neutral-500 pt-6">Date</p>
                </div>
            </div>    

            {/* border above footer */}
            <div className="border-b border-neutral-300 mt-36 mx-6"></div>

            {/* footer */}
            <footer className="text-center pt-6">
                <h4 className="font-bold">Mario Venneri</h4>
                <p className="text-neutral-500">Web Development for Musicians · nect.studio · mario@mariovenneri.com</p>

                {/* questions section */}
                <p className="text-neutral-500 italic text-sm pt-6">Questions about anything in here? Just ask. I'd rather over-explain than have you sign something you're unsure about.</p>
            </footer>

        </div>
    

    </div>
  )
}

export default NectAgreement