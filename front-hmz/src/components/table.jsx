import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Tabela() {
    const [showPopup, setShowPopup] = useState(false);
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pagina, setPagina] = useState(1);
    const [totalInfo, settotalInfo] = useState(null);
    const [linhasPorPagina, setLinhasPorPagina] = useState(2);

    const handleNovoButtonClick = (id) => {
        if (getUserbyId(id)) {
            setShowPopup(true);
        } else {
            errorToast("Um erro ocorreu no sistema.")
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setUserData(null);
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    const handleUpdate = (user) => {
        if (updateUser(user.id)) {
            successToast("Usuário atualizado com sucesso! (SIMULAÇÃO, CONSULTAR REQUISIÇÃO)");
            setShowPopup(true);
        } else {
            errorToast("Erro ao atualizar usuario.");
        }
        setShowPopup(false);
        setUserData(null);
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    const handleDelete = (user) => {
        if (deleteUser(user.id)) {
            successToast("Usuario deletado com sucesso! (SIMULAÇÃO, CONSULTAR REQUISIÇÃO)");
            setShowPopup(true);
        } else {
            successToast("Erro ao atualizar usuario.");
        }
        setShowPopup(false);
        setUserData(null);
        setFirstName("");
        setLastName("");
        setEmail("");
    };

    async function getUsers() {
        try {
            const req = await axios.get(
                `https://reqres.in/api/users?page=${pagina}&per_page=${linhasPorPagina}`
            );
            setUsers(req.data.data);
            settotalInfo(req.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getUserbyId(userId) {
        try {
            const req = await axios.get(
                `https://reqres.in/api/users/${userId}`
            );
            if (req) {
                setUserData(req.data.data);
                setFirstName(req.data.data.first_name);
                setLastName(req.data.data.last_name);
                setEmail(req.data.data.email);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function updateUser(userId) {
        try {
            const req = await axios.put(
                `https://reqres.in/api/users/${userId}`,
                {
                    fisrtName: firstName,
                    lastName: lastName,
                    email: email,
                }
            );
            if (req) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteUser(userId) {
        try {
            const req = await axios.delete(
                `https://reqres.in/api/users/${userId}`
            );
            if (req) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
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

    useEffect(() => {
        getUsers();
    }, [pagina]);

    useEffect(() => {
        setPagina(1);
    }, []);

    useEffect(()=>{
        setPagina(1);
    }, [linhasPorPagina])
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.slice(0, linhasPorPagina).map((user) => (
                        <tr key={user.id}>
                            <td>
                                <button
                                    className="table_btn"
                                    onClick={() =>
                                        handleNovoButtonClick(user.id)
                                    }
                                >
                                    <img
                                        className="pen_img"
                                        src="/pen.png"
                                        alt="Pen"
                                    />
                                </button>
                            </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="table_pages">
                <div className="table_comp">
                    Linhas por página:{" "}
                    <select
                        className="num_select"
                        onChange={(e) =>{
                            const newLinhasPorPagina = parseInt(e.target.value);
                            setLinhasPorPagina(newLinhasPorPagina);
                            }
                        }
                    >
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <span>
                        {totalInfo
                            ? `${totalInfo.data[0].id} - ${totalInfo.data[totalInfo.data.length - 1].id} de ${totalInfo.total}`
                            : "Loading..."}
                    </span>
                    <div className="page_btn">
                        <button
                            onClick={() => {
                                if (pagina > 1) {
                                    setPagina(pagina - 1);
                                    getUsers();
                                }
                            }}
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={() => {
                                if (pagina < totalInfo.total_pages) {
                                    setPagina(pagina + 1);
                                    getUsers();
                                }
                            }}
                        >
                            {">"}
                        </button>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Update User</h2>
                        {userData && (
                            <div className="att_infos">
                                <div className="att_inputs">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <img
                                    className="user_avatar"
                                    src={userData.avatar}
                                    alt={`${userData.first_name} ${userData.last_name}`}
                                />
                            </div>
                        )}
                        <div className="att_btns">
                            <button onClick={() => handleDelete(userData)}>
                                Excluir
                            </button>
                            <button onClick={handleClosePopup}>Cancelar</button>
                            <button onClick={() => handleUpdate(userData)}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Tabela;
