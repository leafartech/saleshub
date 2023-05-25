import { useContext } from "react";
import Account from "../src/components/Account";
import Form from "../src/components/Form";

export default function Entrar() {
    return (
        <Account>
            <Form type="login"/>
        </Account>
    )
}