import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { sessionContext } from "../context/Session";
import Header from "../src/components/LandingPage/Header";
import Title from "../src/components/LandingPage/Title";
import Main from "../src/components/Main";
import Footer from "../src/components/LandingPage/Footer";

export default function Index() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(session.getUser() || [])
    }, [])
    const router = useRouter()

    if (Object.keys(userData).length > 0) {
        router.push('/geral')
    }

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}