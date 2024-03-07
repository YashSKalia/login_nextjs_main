'use client'
import { SessionProvider } from "next-auth/react"

export default function Provider({ children, session }) {
    console.log(children); // Log the children prop to debug
    console.log(session); // Log the session prop to debug

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider> 
    );
}
