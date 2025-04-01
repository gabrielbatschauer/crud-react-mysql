import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

function Atualizar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    fone: "",
  });

  const handleChange = (e) => {
    setUsuario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const location = useLocation();
  const usuarioId = location.pathname.split("/")[2];

  const handleClick = async (e) => {
    if (!usuario.nome || !usuario.email || !usuario.fone) {
      console.log("Todos os campos precisam ser preenchidos");
    } else {
      e.preventDefault();
      try {
        await axios.put("http://localhost:8800/usuarios/" + usuarioId, usuario);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="w-screen h-screen justify-items-center px-10 py-6 flex flex-col items-center">
      <Title>Atualizar usuário</Title>
      <div className="py-6 flex flex-col">
        <Input
          type="text"
          placeholder="Nome"
          onChange={handleChange}
          name="nome"
        />
        <Input
          type="text"
          placeholder="E-mail"
          onChange={handleChange}
          name="email"
        />
        <Input
          type="text"
          placeholder="Telefone"
          onChange={handleChange}
          name="fone"
        />
        <Button onClick={handleClick}>Atualizar</Button>
      </div>
    </div>
  );
}

export default Atualizar;
