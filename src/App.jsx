import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

function App () {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [duracion, setDuracion] = useState('')
  const [filtroDuracion, setFiltroDuracion] = useState('')

  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      }
      setTareas([...tareas, nuevaTareaObj])
      setNuevaTarea('')
      setDuracion('')
    }
  }

  const tiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0)
  }, [tareas])

  const tareasFiltradas = useMemo(() => {
    if (!filtroDuracion) return tareas
    return tareas.filter(t => t.duracion === parseInt(filtroDuracion))
  }, [tareas, filtroDuracion])

  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`
  }, [tiempoTotal])

  return (
    <div className='container mt-5'>
      <div className='card shadow bg-warning-transparent'>
        <div className='card-body'>
          <h1 className='card-title text-center mb-4'>Contador de Tareas</h1>
          <form className='row g-2 mb-3' onSubmit={e => { e.preventDefault(); agregarTarea() }}>
            <div className='col-md-5'>
              <input
                type='text'
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                placeholder='Nombre de la tarea'
                className='form-control'
              />
            </div>
            <div className='col-md-5'>
              <input
                type='number'
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                placeholder='Duración en minutos'
                className='form-control'
              />
            </div>
            <div className='col-md-2 d-grid'>
              <button type='submit' className='btn btn-primary'>Agregar tarea</button>
            </div>
          </form>

          <form className='row g-2 align-items-center mb-4' onSubmit={e => e.preventDefault()}>
            <div className='col-md-6'>
              <input
                type='number'
                value={filtroDuracion}
                onChange={e => setFiltroDuracion(e.target.value)}
                placeholder='Filtrar por duración'
                className='form-control'
              />
            </div>
            <div className='col-md-3 d-grid'>
              <button type='button' className='btn btn-secondary' onClick={() => setFiltroDuracion('')}>Quitar filtro</button>
            </div>
          </form>

          <h2 className='h5 mb-3'>Tareas</h2>
          <ul className='list-group mb-3'>
            {tareasFiltradas.map((tarea2, index) => (
              <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
                <span>{tarea2.nombre}</span>
                <span className='badge bg-primary rounded-pill'>{tarea2.duracion} min</span>
              </li>
            ))}
            {tareasFiltradas.length === 0 && (
              <li className='list-group-item text-center text-muted'>No hay tareas para mostrar</li>
            )}
          </ul>

          <h3 className='text-end text-success'>Total de tiempo: {tiempoTotal} minutos</h3>
        </div>
      </div>
    </div>
  )
}

export default App
