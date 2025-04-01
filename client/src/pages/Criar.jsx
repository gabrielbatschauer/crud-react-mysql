import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";
import PhoneInput from "../functions/PhoneInput";

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
    e.preventDefault();
    const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      usuario.email
    );
    if (!usuario.nome.trim() || !usuario.email.trim() || !usuario.fone.trim()) {
      console.log("Todos os campos precisam ser preenchidos");
    } else if (!emailValido) {
      console.log("Email invalido");
    } else if (usuario.fone.length < 14 || usuario.fone.length > 15) {
      console.log("O numero deve conter entre 10 e 11 digitos");
    } else {
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
        <PhoneInput value={usuario.fone} onChange={handleChange} />
      </div>

      <Button onClick={handleClick}>Adicionar</Button>
    </div>
  );
}

export default Criar;
