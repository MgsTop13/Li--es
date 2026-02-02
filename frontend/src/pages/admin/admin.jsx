import "./admin.scss"
import "../../scss/global.scss";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "../../axios.js"
import Cabecalho2 from "../../components/headerPages";

export default function Admin(){
    return(
        <main className="admin">
            <Cabecalho2 
                nomePage={"Admin"}
            />
            Welcome Admin!
        </main>
    )
}