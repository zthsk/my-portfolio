import Layout from "./Layout";

export default function Content({children}) {
    return (
        <Layout>
            <main id="main-content" className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-5 py-10 leading-relaxed md:gap-20 md:py-16">
                {children}
            </main>
        </Layout>
    );
}
