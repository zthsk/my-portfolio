import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}) {
    return (
        <div className="min-h-screen w-full">
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
