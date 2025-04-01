import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Usuarios from "./pages/Usuarios.jsx";
import Criar from "./pages/Criar.jsx";
import Atualizar from "./pages/Atualizar.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Usuarios />,
  },
  {
    path: "/atualizar/:id",
    element: <Atualizar />,
  },
  {
    path: "/criar",
    element: <Criar />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
