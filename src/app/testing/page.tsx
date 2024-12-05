"use client";

import MorningQuotes from "@/components/widgets/Morning Quotes/Morning Quotes";
export default function TestingPage() {
    return (
        <>
            <main>
                <div className="text-center space-y-3 pt-10">
                    <h1 className="font-bold text-[30px]">This is the testing page for Weejets.</h1>
                    <p>Just import your created widget here for testing.</p>
                </div>
                <MorningQuotes />
            </main>
        </>
    )
}
