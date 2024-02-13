import { createContext, useState } from 'react';
import WorkRegist from '../components/exhibit/WorkRegist';
import ExhibitRegist from '../components/exhibit/ExhibitRegist';
import './ExhibitPage.css'

export const ExhibitRegistContext = createContext();
export default function ExhibitRegistPage() {
  const [works, setWorks] = useState([]);

  console.log(works)
  return (
    <div>
      <ExhibitRegistContext.Provider value={{ works, setWorks }}>
        <ExhibitRegist/>
        <WorkRegist />
      </ExhibitRegistContext.Provider>
    </div>
  )
}