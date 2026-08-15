

const NectAgreement = ({ data }) => {
    
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


 





        {/* project overview */}
        <h1>1. Project Overview</h1>
        <p>{data.project_overview}</p>

        {/* what's included */}
        2. What's Included 
I'll design, build, and launch a website for you. This project includes: 
– [List the features of their package here — pull directly from the pricing tier they chose] – Responsive design that works on phones, tablets, and computers 
– Deployment to live hosting via Vercel 
– Basic search engine setup so your site can be found and displayed properly


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