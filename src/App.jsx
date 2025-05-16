import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
function App () {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [duracion, setDuracion] = useState('')

  // Función para agregar una nueva tarea
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

  // Cálculo de tiempo total optimizado con useMemo
  const tiempoTotal = useMemo(() => {
    console.log('Calculando tiempo total...')
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0)
  }, [tareas]) // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`
  }, [tiempoTotal])  // Se ejecuta cada vez que el tiempo total cambia

  return (
    <div>
      <h1>Contador de Tareas</h1>
      <div>
        <input
          type='text'
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder='Nombre de la tarea'
        />
        <input
          type='number'
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder='Duración en minutos'
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <h2>Tareas</h2>
      <ul>
        {tareas.map((tarea2, index) => (
          <li key={index}>{tarea2.nombre}: {tarea2.duracion} minutos</li>
        ))}
      </ul>

      <h3>Total de tiempo: {tiempoTotal} minutos</h3>
    </div>
  )
}

export default App
