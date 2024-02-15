import { createContext, useState } from 'react';
import WorkRegist from '../components/exhibit/WorkRegist';
import ExhibitRegist from '../components/exhibit/ExhibitRegist';
import './ExhibitPage.css'

export const ExhibitRegistContext = createContext();
export default function ExhibitRegistPage() {
  const [works, setWorks] = useState([]);
  const [carouselWorks, setCarouselWorks] = useState([]);

  return (
    <div>
      <ExhibitRegistContext.Provider value={{ works, setWorks, carouselWorks, setCarouselWorks }}>
        <ExhibitRegist/>
        <WorkRegist />
      </ExhibitRegistContext.Provider>
    </div>
  )
}