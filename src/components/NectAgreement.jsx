

const NectAgreement = ({ data }) => {

const paymentTable = (structure) => {
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
    <div>
        {/* title */}
        <h1>WEB DEVELOPMENT AGREEMENT</h1> 
        <h2>{data.client_name} — [PROJECT NAME] </h2> 
            <p>Built with Nect</p> 

            {/* parties */}
            <h2>PARTIES</h2>
            <div className="grid grid-cols-2 grid-rows-2">
                <h3>Developer</h3>
                <p>Mario Venneri, doing business as Nect 
Palmyra, New Jersey 
mario@mariovenneri.com</p>
<h3>Client</h3>
<p>{data.client_name} {data.client_address} {data.client_email}</p>

            </div>

<h3>Effective Date: {data.effective_date} </h3>
<h3>Project Start Date: {data.start_date} </h3>
<h3>Package: {data.packages?.name}</h3>
<h3>Project Total: ${data.total_price} </h3>
<h3>Governing Law: State of New Jersey, United States of America </h3>

{/* contract numbered points */}

        {/* project overview */}
        <h1>1. Project Overview</h1>
        <p>{data.project_overview}</p>

        {/* what's included */}
        <h1>2. What's Included </h1>
        <p>I'll design, build, and launch a website for you. This project includes: </p>
        <ul>
            <li>– Responsive design that works on phones, tablets, and computers </li>
            <li>– Deployment to live hosting via Vercel </li>
            <li>– Basic search engine setup so your site can be found and displayed properly</li>
        </ul>
        <p>A note on search engines: I set up the technical foundations so search engines can find and correctly display your  site. I do not guarantee search rankings, which no one can control. </p>

        {/* whats not included */}
        <h1>3. What's Not Included</h1>
        <p>The following fall outside this agreement and would be quoted separately:</p>
        <ul>
            <li>– Logo design, brand identity, photography, or videography 
</li>
            <li>– Writing your bio or other written content 
</li>
            <li>– New pages or features beyond what's listed above </li>
            <li>– SEO campaigns, paid advertising, or social media management 
</li>
            <li>– Ongoing content updates after launch (see Section 7)
Anything requested beyond the scope above will be quoted separately and must be agreed in writing before work  begins. Conversations are great, but a verbal “can you just add…” doesn't change the scope 
</li>
            <li>— it has to be in writing so we both have the same understanding. 
</li>
        </ul>

        {/* timeline */}\
        <h1>4. Timeline</h1>
        <p>Estimated turnaround: [X–X weeks] from your Project Start Date. 
</p>
        <p>Two things affect this timeline, and both are worth understanding up front: 
</p>
        <ul>
            <li>– The clock starts on your start date, not the day you first reached out. I take on a limited number of projects at  a time so each one gets real attention. Your deposit reserves your place in the queue. 
</li>
            <li>– The clock pauses while I'm waiting on you. If I'm waiting on your bio, photos, music links, or feedback, that  time isn't counted against the turnaround. 
</li>
        </ul>
        <p>I'd rather build it well than build it fast. If anything is going to run long, I'll tell you before it does — not after. 
</p>

            {/* payment */}
            <h1>5. Payment</h1>
            <table>
                <thead>
                    <tr>
                        <th>Label:</th>
                        <th>Price:</th>
                        <th>When:</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    {paymentResult?.map((row, index) => (
                        <tr 
                            className="py-6"
                            key={index}
                        >
                                <td>{row.label}</td>
                                <td>${row.price}</td>
                                <td>{row.when}</td>
                            
                        </tr>
                    ))}
                
                </tbody>
            </table>
            
            


            <p>For Custom and Bespoke projects, payment is structured 50% / 25% / 25% across agreed milestones. 
</p>
            <p>Invoices are sent through Wave and are due within 7 days. Work begins once the first payment is received. Your site stays on a private preview link until final payment clears, at which point it goes live and it's yours. 
</p>



        {/* revisions */}
        <h1>6. Revisions</h1>
        <p>This project includes {data.packages?.revision_rounds} round of revisions.</p>
        <p>Here's how it works. When your site is substantially complete, I'll send you a private preview link. You'll have 7 days to look it over and send me one consolidated list of everything you'd like changed — all of it together, in one message. I make those changes, and we launch. </p>
        <p>Feedback sent piece by piece over several days counts as multiple rounds, so gather your thoughts and send them at once. If I don't hear from you within 7 days, the site is considered approved.</p>
        <p>Additional revision rounds before launch are $100 each. </p>
        <p>Requests that add new features or pages aren't revisions — they're new work, and I'll quote them separately.</p> 


        {/* After your Site Launches */}
        <h1>7. After Your Site Launches</h1>
        <p>
        The first {data.packages?.email_support_days} days after launch are covered. If something is broken or you have questions about how anything works,  email me and I'll take care of it. This window covers bugs and questions — not content changes. 
        </p>
        <p>After that, you have two options, and there's no pressure either way: </p>
        <p>
        – Maintenance — $100/month. Unlimited updates to your text, photos, and links (tour dates, bio, new music,  press). Bug fixes. Security and dependency updates. Requests handled within 2–3 business days. Cancel  anytime with 30 days' notice. 

        </p>
        <p>
        – One-off changes — $75 per request. A request can include several small updates submitted together.  Turnaround is 5–7 business days. Requests sent on separate days are billed separately. 

        </p>
        <p>
The line between the two: changing content that already exists is an update. Building something that doesn't exist yet — a new page, a store, a booking system — is new work, and I'll quote it separately. 

        </p>
        <p>

Maintenance is opt-in. I won't start billing you unless you tell me to. 
        </p>

        {/* what I need from you */}
            <h1>8. What I Need From You </h1>
            <p>A website gets built faster when the person it's about is easy to reach. Here's what keeps things moving: </p>
            <ul>
                <li>– Your content — bio, photos, music links, and anything else we discussed — within 3 business days of your start date. Send whatever you have, even if it's not final; having real material to build around from day one keeps everything on track, and we can swap in final versions later. </li>
                <li>– Responses to my questions within 5 business days. </li>
                <li>– Your consolidated feedback on the preview within 7 days. </li>
                <li>– Approvals and change requests in writing, by email. We can talk through anything on the phone, but if it's not  in an email, it isn't a change. </li>
            </ul>
            <p>If I go 30 days without hearing back from you, I'll pause the project and your deposit is forfeit. I'd much rather that  never happen — if life gets busy, just tell me and we'll work it out. </p>



        {/* ownership */}
        <h1>9. Ownership </h1>
        <p>
Your website. When your final payment clears, the site and everything in it is yours, permanently. Until then, I retain ownership of the code and design. 
            
        </p>
        <p>
            Your domain. You buy and own your domain name (roughly $15/year, paid directly to a registrar). It should be in  your name so it's always yours. I'll handle connecting it to your site. 
        </p>

        <p>Your content. Your music, photos, words, and likeness remain yours. You confirm you have the right to use everything you send me. </p>




        {/* portfolio & behind-the-scenes */}
        <h1>10. Portfolio & Behind-the-Scenes </h1>
        <p>
            <span className="font-bold">Portfolio.</span> I may show your finished website in my portfolio, on my site, and in professional materials. If you'd rather I didn't, just say so and I won't. 
        </p>
        <p>
            <span className="font-bold">Behind-the-scenes content.</span> I sometimes share process footage of myself building — no code, no private  information, just the work taking shape. Some artists love the extra exposure; some would rather keep it quiet.  Both are completely fine.
        </p>
        Are you comfortable with your project appearing in behind-the-scenes content? ☐ Yes ☐ No

        {/* if things change */}
        <h1>11. If Things Change</h1> 
        <p>
            If you cancel. Deposits are non-refundable — they hold your place in the queue and I turn away other work to keep it. Anything you've paid beyond the deposit is refunded, minus the work already completed.
        </p>
        <p>If I cancel. If for any reason I can't complete the project, I'll refund everything you've paid beyond the work  delivered, and hand over whatever has been built. 
</p>
        <p>Exceptions. These terms are standard for every project. If you need an exception, ask — I'm a musician too and I  understand. Any exception must be agreed in writing before work begins, and is at my discretion. </p>
 

            {/* fine print */}
        <h1>12. The Fine Print</h1>
        <p>My total liability under this agreement will not exceed the amount you've paid me. I'm not responsible for outages  or failures of third-party services (hosting, email providers, domain registrars), or for losses arising from content  you provide. 
This agreement is the whole agreement between us and replaces anything discussed beforehand. Changes must be  in writing and agreed by both of us. It's governed by the laws of the State of New Jersey. 
If a disagreement comes up, let's talk it through first. I'd rather solve a problem over a phone call than anywhere else.</p>
    </div>
  )
}

export default NectAgreement