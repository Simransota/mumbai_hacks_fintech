import { Database } from '../../../types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies as getCookies } from 'next/headers';

// Define the CookieStore type for type safety
type CookieStore = {
    get(name: string): { value: string } | undefined;
    set(options: { name: string; value: string; path?: string; expires?: Date; maxAge?: number; secure?: boolean; httpOnly?: boolean; sameSite?: 'lax' | 'strict' | 'none' }): void;
};

// Create the Supabase client with cookie handling
export async function createClient() {
    const cookieStore: CookieStore = await getCookies() as unknown as CookieStore; // Await the cookies() function

    // Create and return the Supabase client
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Asynchronous get function
                async get(name: string) {
                    const cookie = cookieStore.get(name);
                    return cookie ? cookie.value : undefined; // Handle undefined
                },
                // Asynchronous set function
                async set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        console.error('Failed to set cookie:', error);
                    }
                },
                // Asynchronous remove function
                async remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        console.error('Failed to remove cookie:', error);
                    }
                },
            },
        }
    );
}
