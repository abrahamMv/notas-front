
import axios from "axios";
import React, { useState, useEffect} from "react";
import "./styles.css";
import Swal from "sweetalert2";

function App() {
const email="abraham150586@gmail.com"
  useEffect(() => {
   const user = async () =>{
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/email`,{email})
      setRes(res.data.user)
    
    } catch (error) {
      console.log(error.response)
    }
   }
   user()
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({
    password: "",
    confirm: "",
  });
  const [res, setRes] = useState([])

  const [alert, setAlert] = useState("");

  const { password, confirm } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

     if (password.trim() === "" || confirm.trim() === "") {
      setAlert("Todos los campos son obligatorios");
         return;
     }

     if (password.length < 8) {
      setAlert("la contraseña debe contar por lo menos con 8 caracteres");
     return;
     }

     if (password !== confirm) {
      setAlert("las contraseñas no coinciden");
       return;
     }

     res.password=password

    try {
      const respuesta = await axios.put(`${process.env.REACT_APP_API_URL}/api/user`,res[0])
      console.log(respuesta)
      Swal.fire("Correcto", "La contraseña se cambio Exitosamente", "success");
    } catch (error) {
      console.log(error.response.data.msg);
    }
    }
  return (
    <div className="App">
      <div className="container">
      <div className="content">
        <p className="text">Cambiar contraseña</p>
        <input
          placeholder="Nueva Contraseña"
          className="input"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        ></input>
        <input
          placeholder="Repetir Nueva Contraseña"
          className="input"
          type="password"
          name="confirm"
          value={confirm}
          onChange={handleChange}
        ></input>
       {alert ? <p>{alert}</p> :null}
        <button className="button" type="primary" onClick={handleClick}>
          Recuperar
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;
