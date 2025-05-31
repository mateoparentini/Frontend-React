import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route exact path="/" element={<ListadoEmpleados/>}></Route>
        <Route exact path="/agregar" element={<AgregarEmpleado/>}></Route>
        <Route exact path="/editar/:id" element={<EditarEmpleado/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
