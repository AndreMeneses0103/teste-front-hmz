import React, { useState } from "react";
import "@/styles/Users.css";
import Tabela from "../components/table";

function Users() {

    return (
        <div className="Users">
            <div className="container_users">
                <div className="header">
                    <div className="show_opt">
                        <p>Supply Chain</p>
                        <button className="menu_btn"><img src="/menu-hamburguer.png" alt="menu"/></button>
                    </div>
                    <div className="user_info">
                    <button className="ring_btn"><img src="/sino.png" alt="menu"/></button>
                        <button className="user_btn">
                            <img
                                className="user_photo"
                                src="/default_user_hmz.png"
                                alt="User"
                            />
                        </button>
                    </div>
                </div>
                <div className="content">
                    <div className="options">
                        <button className="opt_btn">Usuários</button>
                    </div>
                    <div className="all_data">
                        <div className="table_infos">
                            <p className="user_text">Usuários</p>
                            <button>Novo</button>
                        </div>
                        <Tabela />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Users };
