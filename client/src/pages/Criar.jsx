import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

function Criar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    fone: "",
  });

  const handleChange = (e) => {
    setUsuario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    if (!usuario.nome || !usuario.email || !usuario.fone) {
      console.log("Todos os campos precisam ser preenchidos");
    } else {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8800/usuarios", usuario);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="w-screen h-screen justify-items-center px-10 py-6 flex flex-col items-center">
      <Title>Adicionar novo usuário</Title>
      <div className="flex flex-col py-6 space-y-4">
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
      </div>

      <Button onClick={handleClick}>Adicionar</Button>
    </div>
  );
}

export default Criar;
