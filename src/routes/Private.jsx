import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../FireBaseConnection";


export default function Private({ children }) {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);


    useEffect(() => {

        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {

                if (user) {
                    // Se tem user logado!
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);


                } else {
                    // Não possui user logado!
                    console.log("Voçê não está logado!");
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();

    }, [])

    if (loading) {
        return (
            <div></div>
        )
    }

    if (!signed) {
        return (
            <Navigate to="/" />
        )
    }

    return children;
}