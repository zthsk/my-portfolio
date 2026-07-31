import Link from "next/link";

export default function NotFound() {
    return (
        <main id="main-content" className="flex min-h-screen items-center justify-center px-5 py-16">
            <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-950/75 p-8 text-center shadow-2xl shadow-black/30">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Error 404</p>
                <h1 className="mt-3 font-display text-4xl font-medium text-zinc-50 md:text-5xl">This page is not in the evidence set.</h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-400">
                    The address may have changed, or the page may no longer exist. Return to the portfolio to continue exploring verified work.
                </p>
                <Link
                    href="/"
                    className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                >
                    Return home
                </Link>
            </div>
        </main>
    );
}
