
import React, { useState, useEffect, useRef } from 'react';
import { ingresarCadena,automaton,acceptedValues,stateCadena } from './util/index.js';
//import * as d3 from 'd3';
import './App.css'

function App() {
  const [cadena, setCadena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const canvasRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    
    ingresarCadena(cadena); 
    visualizeAcceptedValues(canvas, acceptedValues);

    // Actualiza el mensaje en función de stateCadena
    if (stateCadena) {
      setMensaje("accepted data");
    } else {
      setMensaje("data not accepted");
    }
  }

  function visualizeAcceptedValues(canvas, values) {
    if (stateCadena) {
      canvas.width = window.innerWidth
      const ctx = canvas.getContext('2d');
      
      // Define constantes para posicionamiento
      const q0X = 100;
      const q0Y = 100;
      const circleRadius = 20;
      const circleSpacing = 100;

      ctx.beginPath();
      ctx.arc(25, q0Y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightgreen';
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("q0", 25, q0Y + 5); // Ajusta la posición vertical según sea necesario
      ctx.closePath();
      ctx.beginPath();
        ctx.moveTo(q0X, q0Y);
        ctx.lineTo(25, q0Y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    
      values.forEach((d, i) => {
        const circleX = i * circleSpacing + q0X;

        
        // Dibuja una línea desde q0 al círculo
        ctx.beginPath();
        ctx.moveTo(q0X, q0Y);
        ctx.lineTo(circleX, q0Y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
        
        // Dibuja el círculo
        ctx.beginPath();
        ctx.arc(circleX, q0Y, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'lightgreen';
        ctx.fill();
        ctx.closePath();
    
        // Agrega texto dentro del círculo para currentState
        ctx.fillStyle = 'black';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.currentState, circleX, q0Y + 5); // Ajusta la posición vertical según sea necesario
    
        // Agrega etiquetas para símbolos
        ctx.fillStyle = 'black';
        ctx.fillText(d.symbol, circleX, q0Y - 25); // Ajusta la posición vertical según sea necesario
      });
    }
  }
  
  
  return (
    <>
      <form id="Automata" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Proyect 1</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">PVA-000-A | RDZ-999-Z</p>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="cadena" className="block text-sm font-medium leading-6 text-gray-900">Enter the Data</label>
                <div className="mt-2 flex justify-center items-center">
                <input type="text" id="cadena" value={cadena} placeholder="Write Me" onChange={(event) => setCadena(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:w-80 text-center placeholder-center" 
                />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" value="Enviar" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </form>
      <p className="mt-1 text-sm leading-6 text-blue-500">{mensaje}</p>
      <canvas ref={canvasRef} width="100%" height="500"></canvas> 
    </>
  )
}

export default App
