import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {

    const urlBase = "http://localhost:8080/rh-app/empleados";

    const[empleados, setEmpleados] = useState([]);

    useEffect(()=> {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => { 
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar empleados");
        console.log(resultado.data);
        setEmpleados(resultado.data);

    }
    const handleDelete = async (id) => {
      const isConfirmed = window.confirm("¿Estas seguro que quieres eliminar este trabajador?");
      
      if (isConfirmed) {
        try {
          await fetch(`http://localhost:8080/rh-app/empleados/${id}`, { method: "DELETE" });
          alert("Item deleted successfully.");
          // Aquí puedes actualizar el estado para reflejar el cambio en la UI
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    };
    
    const eliminarEmpleado = async (id) => {
      await axios.delete(`${urlBase}/${id}`);
      cargarEmpleados();
    }

  return (
    <div className="container">
    <div className ="container text-center" style={{margin: "30px"}}>
      <h3>Sistema de Recursos Humanos</h3>
    </div>

    <table className="table table-striped table-hover align-middle">
  <thead className='table-dark'>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Empleado</th>
      <th scope="col">Departamento</th>
      <th scope="col">Sueldo</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
    //Iteramos el arreglo dee empleados
    empleados.map((empleado, indice) => (
        <tr key={indice }>
      <th scope="row">{empleado.idEmpleado}</th>
      <td>{empleado.nombre}</td>
      <td>{empleado.departamento}</td>
      
      <td><NumericFormat value= {empleado.sueldo}
        displayType={'text'}
        thousandSeparator=',' prefix={'$'}
        decimalScale={2} fixedDecimalScale/></td>
        <td className='text-center'>
          <div>
            <Link to = {`/editar/${empleado.idEmpleado}`}
            className='btn btn-warning btn-sm me-3'>Editar</Link>
            <button onClick={()=> eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'>Eliminar</button>
            </div>  </td>
    </tr>
    ))
    }
  </tbody>
</table>
        </div>

  )
}
