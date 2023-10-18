import { signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../FireBaseConnection";
import style from "./style.module.css";

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState("");
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});


    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const tarefasRef = collection(db, "tarefas")
                const q = query(tarefasRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {

                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })
                    setTarefas(lista);

                })

            }
        }
        loadTarefas();
    }, [])


    async function handleRegister(e) {
        e.preventDefault();

        if (tarefaInput === "") {
            alert("Digite sua tarefa!");
            return;
        }

        if (edit?.id) {
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log("Tarefa Registrada ")
                setTarefaInput("")
            })
            .catch((error) => {
                console.log("Erro ao Registrar" + error)
            })

    }


    async function handleLogout() {
        await signOut(auth)
            .then(() => {
                console.log("Usuario Deslogado!");
            })
            .catch(() => {
                console.log("Falha ao Deslogar Usuario!");
            })
    }


    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function editTarefa(item) {
        setTarefaInput(item.tarefa);
        setEdit(item);
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
            .then(() => {
                console.log("Tarefa Atualizada!")
                setTarefaInput("")
                setEdit({})
            })
            .catch(() => {
                console.log("Erro ao Atualizar!")
                setTarefaInput("")
                setEdit({})
            })
    }

    return (
        <div className={style.adminContainer}>
            <h1>Minhas Tarefas</h1>

            <form className={style.form} onSubmit={handleRegister}>
                <textarea
                    placeholder="Digite sua tarefa..."
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />
                {Object.keys(edit).length > 0 ? (
                    <button
                        style={{ backgroundColor: '#6add39' }}
                        className={style.btnRegister}
                        type="submit"
                    >
                        Atualizar Tarefa
                    </button>
                ) : (
                    <button
                        className={style.btnRegister}
                        type="submit"
                    >
                        Registrar Tarefa
                    </button>
                )}
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className={style.list}>
                    <p>{item.tarefa}</p>

                    <div>
                        <button
                            onClick={() => editTarefa(item)}>
                            Editar
                        </button>

                        <button
                            onClick={() => deleteTarefa(item.id)}
                            className={style.btnDelete}>
                            Concluir
                        </button>
                    </div>

                </article>
            ))}

            <button
                className={style.btnLogout}
                onClick={handleLogout}
            >
                Sair
            </button>
        </div>
    );
}