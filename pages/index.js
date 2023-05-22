import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { sessionContext } from "../context/Session";

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
        // {Object.keus(userData).}
        <>
            <Link href="/registrar">Registrar</Link>
            <Link href="/entrar">Entrar</Link>
        </>
    )
}