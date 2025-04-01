import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ForwardIcon, Trash2Icon } from "lucide-react";
import Button from "../components/Button";
import Title from "../components/Title";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fecthAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllUsers();
  }, []);

  const navigate = useNavigate();
  function novoUsuario() {
    navigate("/criar");
  }
  function atualizarUsuario(usuarios) {
    navigate(`/atualizar/${usuarios.id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/usuarios/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen h-screen justify-items-center px-6 py-6">
      <Title>Usuários do sistema</Title>
      <div className="w-[100%] sm:w-[80%] lg:w-[60%] pt-6">
        <Button onClick={novoUsuario}>Novo Usuário</Button>
      </div>
      <div className="w-full justify-items-center space-y-2">
        {usuarios.map((usuarios) => (
          <div
            className="flex flex-col md:flex-row space-y-2 bg-slate-400 p-5 w-[100%] sm:w-[80%] lg:w-[60%] justify-between rounded-lg py-3 text-white"
            key={usuarios.id}
          >
            <div className="flex flex-col w-[75%] xl:flex-row">
              <p className="w-[30%]">{usuarios.nome}</p>
              <p className="w-[60%]">{usuarios.email}</p>
              <p className="w-[10%]">{usuarios.fone}</p>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  handleDelete(usuarios.id);
                }}
                title="Deletar"
              >
                <Trash2Icon className="p-[2px] hover:p-[1px] transition-all" />
              </button>
              <button
                onClick={() => {
                  atualizarUsuario(usuarios);
                }}
                title="Editar"
              >
                <ForwardIcon className="p-[2px] hover:p-[0px] transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;
