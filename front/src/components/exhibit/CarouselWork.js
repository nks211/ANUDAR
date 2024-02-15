import { useContext, useState } from "react"
import { ExhibitRegistContext } from "../../exhibit/ExhibitRegistPage";

export default function CarouselWork(props) {
  const { works, setWorks, carouselWorks, setCarouselWorks } = useContext(ExhibitRegistContext);
  const work = props.work
  const [select, setSelect] = useState(work.is_carousel)

    return(
      <>
        <div>
          <div style={{textAlign: "right", margin:"7px 5px 2px", fontSize:"12px", color:"#5F5F5F", cursor:"pointer"}} onClick={()=>{
            const newWorks = works.filter(w => w.id !== work.id)
            setWorks(newWorks)}}
            >삭제
          </div>

          <div id="imgArea"  onClick={()=>{
            const clickWork = works.find((w)=>{return w.id===work.id})
              if (carouselWorks.length == 10) {alert('최대 10개까지 등록 가능합니다.'); return}

            clickWork.is_carousel = !clickWork.is_carousel 
            setSelect(clickWork.is_carousel)
            setCarouselWorks(works.filter(w => (w.is_carousel === true)))

          }}>
            <img id="workPreview" src={work.image}/>
            <div className={select?"selectWork":"unselectWork"}></div>
          </div>
        </div>
      </>
    )
}