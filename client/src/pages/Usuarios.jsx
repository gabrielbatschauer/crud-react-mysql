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
      <div className="w-[100%] sm:w-[80%] lg:w-[60%] justify-items-center space-y-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            {usuarios.map((usuarios) => (
              <tr className="border-b border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {usuarios.nome}
                </th>
                <th className="px-2 py-4">{usuarios.email}</th>
                <th className="px-2 py-4">{usuarios.fone}</th>
                <th className="px-0 py-4">
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
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
