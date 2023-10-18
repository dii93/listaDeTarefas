import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FireBaseConnection";
import style from "./style.module.css";

export default function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (email !== "" && password !== "") {

            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/admin", { replace: true })
                })
                .catch(() => {
                    console.log("Erro ao fazer o login!")
                })



        } else {
            alert("Preencha todos os campos!");
        }

    }


    return (
        <div className={style.homeContainer}>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil.</span>

            <form className={style.form} onSubmit={handleLogin}>
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

                <button type="submit">Acessar</button>
            </form>

            <Link className={style.buttonLink} to="/register">
                Não possui uma conta? Cadastre-se
            </Link>

        </div>
    );
}

