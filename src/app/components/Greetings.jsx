"use client";

import React from "react";

export default function Greetings({greetings_on_homepage}) {
    return (
        <div className="text-sm font-medium text-zinc-400">
            {greetings_on_homepage}
        </div>
    )
}
