import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FireBaseConnection";
import style from "./style.module.css";




export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (email !== "" && password !== "") {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/admin", { replace: true });
                })
                .then(() => {
                    console.log("Erro ao cadastrar usuario!")
                })

        } else {
            alert("Preencha todos os campos!");
        }

    }


    return (
        <div className={style.homeContainer}>
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className={style.form} onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="**************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <Link className={style.buttonLink} to="/">
                Já possui uma conta? Faça o login!
            </Link>

        </div>
    );
}

