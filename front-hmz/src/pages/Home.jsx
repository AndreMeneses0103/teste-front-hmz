import React, { useState } from "react";
import "@/styles/Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    async function tryLogin() {
        try {
            const req = await axios.post(
                `https://reqres.in/api/login`,
                {
                    email: user,
                    password: pass
                }
            );
            successToast("Login realizado com Sucesso!");
            setTimeout(()=>{
                navigate('/users');
            },3000)
        } catch (err) {
            if (err.response && err.response.status === 400) {
                errorToast("Usuário ou senha inválidos.");
            } else {
                errorToast("Erro ao realizar login. Por favor, tente novamente mais tarde.");
                console.error(err);
            }
        }
    }
    

    const errorToast = (message) =>{
		toast.error(message,{
			autoClose: 5000
		});
	}

	const successToast = (message) =>{
		toast.success(message,{
			autoClose: 1500
		});
	}

    return (
        <div className="Home">
            <div className="container">
                <div className="welcome">
                    <h1>Simplificamos juntos</h1>
                    <p>Supply | Industrial | Systems</p>
                </div>
                <div className="card">
                    <div className="login">
                        <img
                            src="/hmz_logo.png"
                            alt="Logo"
                            className="logo"
                        />
                        <div className="log_inputs">
                            <p id="login_title">Login <button id="quest" onClick={()=> alert("USUARIO: eve.holt@reqres.in, SENHA: cityslicka\nLogin utilizado na API reqres.in")}>?</button></p>
                            <input type="text" placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)}/>
                            <input type="password" placeholder="Senha" value={pass} onChange={(e) => setPass(e.target.value)}/>
                            <button onClick={()=> tryLogin()}>Logar</button>
                        </div>
                        <div className="login_config">
                            <a id="forget_a">Esqueci minha senha</a>
                            <a id="register_a">Cadastre-se</a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export {Home};
