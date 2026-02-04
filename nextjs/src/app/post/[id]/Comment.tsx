import { ReactNode } from "react";

// because this is being called from a 'use client' component, it can only be another 'use client' component, so it does not need to be specified, it is a client boundary

export default function Comment ({body} : {body : ReactNode}) {
    return (
        <p className="p" style={{ color: "var(--text)" }}>
            {body}
        </p>
    )
}