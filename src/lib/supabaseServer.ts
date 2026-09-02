import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


export async function createClient() {
    const cookieStore = await cookies()
    if (!url || !anonKey) {
        throw new Error('Throw a new error if keys are not defined.')    
    }
    return createServerClient(url, anonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options) 
                    )
                } catch {
                    // Server components can't set cookies. Middleware handles refresh. 
                }
            } 
        }
    })
}

// Cookies - small piece of data the server asks the browser to store, it'll hold one value the server set and the browser carries it back on each request

// getAll() <- reads cookies
// setAll() <- writes cookies

//try/catch is there because server components can only READ cookies, not write them

// ------------------------------------------------------------------

/* 
NEXTJS implementation of Supabase Server.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function createClient() {
    const cookieStore = await cookies()
    return createServerClient(url, anonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options) 
                    )
                } catch {
                    // Server components can't set cookies. Middleware handles refresh. 
                }
            } 
        }
    })
} */