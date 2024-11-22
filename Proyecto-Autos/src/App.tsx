import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Swal from 'sweetalert2';

interface Auto {
  id:  string;
  marca: string;
  modelo: string;
  tipo: string;
  cantidadAsientos: string;
}

function App() {

  const [entities, setEntities] = useState<Auto[]>([]);

  const fetchData = async () => {
    try {
        const response = await axios.get("https://localhost:7120/api/Autos");
        setEntities(response.data);
    } catch (err) {
        console.error('Error al obtener las entidades:', err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Borrar entidad
  const deleteEntidad = async (id: string) => {
    try {
        await axios.delete(`https://localhost:7120/api/Autos/${id}`);
        setEntities(entities.filter(entida => entida.id !== id));
        fetchData();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Operación Fallida",
            text: "Error al eliminar el candidato"
        });
    }
  };

    //nuevo Entidad
    const [newEntidad, setNewEntidad] = useState<Auto>({
      id: "0",
      marca: '',
      modelo: '',
      tipo: "",
      cantidadAsientos: ""
  });

  //crear entidad
  const createEntidad = async () => {
    try {
        const response = await axios.post('https://localhost:7120/api/Autos', newEntidad);
        setEntities([...entities, response.data]);
        setNewEntidad({ id: "0", marca: '', modelo: '', tipo: "", cantidadAsientos: ""});
        fetchData(); 
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Candidato Guardado",
            showConfirmButton: false,
            timer: 1200
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Operación Fallida",
            text: "Error al crear el candidato"
        });
    }
};


// Actualizar

const [editingCandidate, setEditingCandidate] = useState<Auto | null>(null);

const updateEntidad = async () => {
    if (editingCandidate) {
        try {
            const response = await axios.put(`https://localhost:7120/api/Autos/${editingCandidate.id}`, { ...newEntidad });
            setEntities(entities.map(entiti => (entiti.id === response.data.id ? response.data : entiti)));
            setEditingCandidate(null); 
            fetchData();
            setNewEntidad({ id: "0", marca: '', modelo: '', tipo: "", cantidadAsientos: "" });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Operación Fallida",
                text: "Error al actualizar el candidato"
            });
        }
    }
};


const ObtenerDatos = async (Entidad: Auto) => {
  try {
      const response = await axios.get(`https://localhost:7120/api/Autos/${Entidad.id}`);
      const fetchedEntidad = response.data;
      setEditingCandidate(fetchedEntidad);
      setNewEntidad({
        id: fetchedEntidad.id,
        marca: fetchedEntidad.marca,
        modelo: fetchedEntidad.modelo,
        tipo: fetchedEntidad.tipo,
        cantidadAsientos: fetchedEntidad.cantidadAsientos,
      });
  } catch (error) {
      Swal.fire({
          icon: "error",
          title: "Operación Fallida",
          text: "Error al obtener los datos del candidato"
      });
  }
};

  return (
    <>
      <div className="content">
       <div className="detalle">
       <h2 className='title'>Registro de Autos</h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr className="table-primary">
                            <th>Id</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Cantidad de Asientos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entities.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.marca}</td>
                                <td>{item.modelo}</td>
                                <td>{item.tipo}</td>
                                <td>{item.cantidadAsientos}</td>
                                    <td style={{textAlign:'center'}}>
                                        <i className="fa-solid fa-square-pen edit"data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={()=>{
                                            ObtenerDatos(item)
                                        }}></i>
                                        <i className="fa-solid fa-trash-can borr" onClick={()=> {
                                            Swal.fire({
                                                title: "¿Desea Eliminar este Registro?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Confirmar"
                                              }).then((result) => {
                                                if (result.isConfirmed) {
                                                  deleteEntidad(item.id)
                                                  Swal.fire({
                                                    title: "Registro Eliminiado",
                                                    icon: "success"
                                                  });
                                                }
                                              });
                                            }}></i>
                                    </td>
                            </tr>
                        ))}
                  </tbody>
                </table>
                    <div style={{textAlign:"end"}}>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Añadir</button>
                    </div>
                    <div  className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Auto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Marca</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.marca}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, marca: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Modelo</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.modelo}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, modelo: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tipo</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.tipo}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, tipo: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cantidad de Asientos</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.cantidadAsientos}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, cantidadAsientos: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> setNewEntidad({  id:"", marca: '', modelo: '', tipo: "", cantidadAsientos: ""})}>Cerrar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                               if (
                                !newEntidad.marca ||
                                !newEntidad.modelo ||
                                !newEntidad.tipo ||
                                !newEntidad.cantidadAsientos
                                ){
                                Swal.fire({
                                    icon: "error",
                                    title: "No se registro",
                                    text: "Completar todos los Campos por favor"
                                  });
                            } else {
                                createEntidad();
                            }
                                }}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div  className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Auto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <table>
                                   <tbody>
                                    <tr>
                                        <td>Marca</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.marca}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, marca: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Modelo</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.modelo}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, modelo: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tipo</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.tipo}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, tipo: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Cantidad de Asientos</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={newEntidad.cantidadAsientos}
                                                onChange={(e) => setNewEntidad({ ...newEntidad, cantidadAsientos: e.target.value })}
                                                required
                                                className='form-control'
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> setNewEntidad({ id:"", marca: '', modelo: '', tipo: "", cantidadAsientos: ""})}>Cerrar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                                updateEntidad()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Candidato Actualizado",
                                    showConfirmButton: false,
                                    timer: 1200
                                });
                                }}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        

       </div>
    </div>
    </>
  )
}

export default App
