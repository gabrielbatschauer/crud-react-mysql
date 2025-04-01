import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

function Atualizar() {
  const [usuarioAtt, setUsuarioAtt] = useState([]);
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

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/usuarios/${usuarioId}`
        );
        setUsuarioAtt(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthUser();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!usuario.nome.trim() || !usuario.email.trim() || !usuario.fone.trim()) {
      console.log("Todos os campos precisam ser preenchidos");
      return;
    } else {
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
      {usuarioAtt.map((usuarioAtt) => (
        <div
          className="flex flex-col w-[60%] justify-center items-center text-center bg-slate-400 p-5 py-5 my-4 rounded-lg  text-white"
          key={usuarioAtt.id}
        >
          <p>
            Você está atualizando o usuário{" "}
            <span className="font-bold">{usuarioAtt.nome}</span>
          </p>

          <p>
            Email: <span className="font-bold">{usuarioAtt.email}</span>
          </p>
          <p>
            Telefone: <span className="font-bold">{usuarioAtt.fone}</span>
          </p>
          <div className="flex flex-col py-6 space-y-4 text-black">
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
        </div>
      ))}
      <Button onClick={handleClick}>Atualizar</Button>
    </div>
  );
}

export default Atualizar;
