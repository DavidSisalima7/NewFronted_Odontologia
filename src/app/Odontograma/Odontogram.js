import React, { useState } from 'react';
import './Odontogram.css';
import Teeth from './Teeth';

export const Odontogram=()=> {

  // let odontogramState = {
    
  // };
  const [odontogramState, setOdontogramState]=useState({});
  const handleToothUpdate = (id, toothState) => {
    odontogramState[id] = toothState;
  };

  const GuardarEstado = () => {
     for (let i = 12; i < 48; i++) {
      console.log(odontogramState[i]);
      setOdontogramState(odontogramState[i])
     }
  }
  return (
    <div className="Odontogram">
      <svg version="1.1" height="100%" width="100%" >
        <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
        <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />

        <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
        <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />

        <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
        <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />

        <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
        <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} />
      </svg>
      <button onClick={GuardarEstado}>Guardar</button>
      <h1 >{odontogramState} a</h1>
    </div>
  );
}

