import puppeteer from "puppeteer";

export async function GET(req) {
    // launches headless browser instance
    const browser = await puppeteer.launch()

    // opens a new tab/page
    const page = await browser.newPage()

    //search params to get dynamic url for contracts using id of document
    const id = new URL(req.url).searchParams.get('id')

    // navigate to target url (dynamically)
    const url = `http://localhost:3000/documents/${id}`
    await page.goto(url, { waitUntil: 'networkidle0' })

    //set pdf information
    const exportedPDF = await page.pdf({ format: 'A4', printBackground: true })

    // close the browser process
    await browser.close()


    // headers - metadata about response (request/response model)
    // 'Content-Type' - these are bytes for a pdf, shows reponse that content will be displayed as a pdf
    // 'Content-Disposition' - browser downloads the file instead of displaying it inline
    return new Response(exportedPDF, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="contract.pdf"'
        }       
    })
    
    //Next.js can only have request as parameter and can only return a new Response. Both request and response have headers

    // Request (req) - what comes in from the browser, its the URL (/api/pdf?id=15), headers, and body (if one). only request has as a URL
    //Response - what you send back (in return statement), its body (PDF bytes), its headers (Content-Type & Content-Disposition), its status code (GET 200, etc)
}