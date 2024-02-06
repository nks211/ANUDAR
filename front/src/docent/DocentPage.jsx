import { useLocation } from 'react-router-dom';

export default function DocentPage(){
  const docentId = useLocation().pathname.split('/').pop();
  return(
    <div>
      도슨트 {docentId}..
    </div>
  )
}