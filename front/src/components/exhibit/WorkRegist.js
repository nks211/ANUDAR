import { useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './WorkRegist.css'

export default function WorkRegist() {
  const [workId, setWorkId] = useState(0);
  const [works, setWorks] = useState([]);

  const [carouselWorks, setCarouselWorks] = useState([]);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();

  const defaultPreview = <div className="previewImg"></div>;
  const defaultCarousel = 
  <div style={{position:"relative"}}>
    <img style={{width:"750px", margin:"0 25px"}} src="../asset/exhibit_carousel2.png"/>
    <div id="carouselGuide">선택된 작품 이미지가<br/>해당 화면에 나타납니다.</div>
  </div>;

  const [preview, setPreview] = useState(defaultPreview);
  const [workImg, setWorkImg] = useState();
  const [fileName, setFileName] = useState();

  const selectxy = useRef(null);
  const registxy = useRef(null);


  const upload = (event) => {
    const file = event.target.files[0];
    if (!file) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    setFileName(file.name)

    return new Promise((resolve) => {
      reader.onload = () => {
          setPreview(<img style={{width:300, height:300, objectFit: "cover"}} src={(reader.result || null)} />)
          setWorkImg(reader.result || null);
          resolve();
      };
    });
  }


  // 캐러셀
  const setting = {
    dots: true,
    dotsClass: "slidedots",
    infinite: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}


  return (
    <div className="workRegist">
      <div className="workRegistHeader">
        <h2 ref={registxy}>작품 등록</h2>
        <button onClick={()=>{
          window.scrollTo({top: selectxy.current.offsetTop, behavior: "smooth"});}}>대표작품 선택
        </button>
      </div>

      <div id="workRegistArea">
        {preview}
        <div id="registArea">
          <form>
            <div className="workInput">
              <div className="item1"><span>*</span> 작품 이름</div>
              <input value={title} placeholder="최대 글자수 100자" maxLength="100" onChange={(event)=>{setTitle(event.target.value)}} required/>
            </div>
            <div className="workInput" style={{marginBottom:"2px"}}>
              <div className="item1"><span>*</span> 작품 설명</div>
              <textarea value={description} placeholder="최대 글자수 500자" maxLength="500" onChange={(event)=>{setDescription(event.target.value)}} required/>
            </div>
            <div style={{textAlign:'right', fontSize:"12px", marginBottom:"8px"}}>{description.length}/500</div>
            <div className="workInput">
              <div className="item1"><span>*</span> 이미지 등록</div>
              <div className="item2" style={{display:"flex"}}>
                <span>{fileName}{fileName?<img src='../asset/delete_button.png' onClick={()=>{setPreview(defaultPreview); setFileName(); setWorkImg()}}></img>:""}</span>
                <label className="uploadBtn" for="workImg">선택</label>
                <input type="file" id="workImg" accept="image/*" onChange={event => upload(event)} style={{ display: "none" }} required/>
              </div>
            </div>
            <div className="workInput" style={{marginBottom:"18px"}}>
              <div className="item1"><span>*</span> 최소 경매가</div>
              {/* *수정* 단위 만원 */}
              <input value={price} min={10} max={100} type="number" placeholder="최소 10만원, 최대 100만원까지 입력 가능합니다" onChange={(event)=>{setPrice(event.target.value)}} required/>
              {/* 버튼 .. 리셋 -> 0 1 5 10 50 100 */}
            </div>
            <div style={{display:"flex", justifyContent: "center"}}>
              <button id="workRegistBtn" type="submit" onClick={(event)=>{
                event.preventDefault()
                // if (!title || !description || !fileName || !price) {
                //   alert('모든 정보를 입력해주세요.')
                //   return
                // }

                if (works.length === 20) {
                  alert('작품은 최대 20개까지 등록 가능합니다.')
                  return
                }
                const newWork = {"id":workId, "title":title, "description":description, "img":workImg, "price":price, "preview":preview}
                const newWorks = [...works, newWork]

                setWorks(newWorks)
                setWorkId(workId+1); setTitle(""); setDescription(""); setWorkImg(); setPrice(""); setPreview(defaultPreview); setFileName("");
                // console.log(works)
                }}>작품 등록
              </button>
            </div>
          </form>

        </div>
      </div>

      <div style={{margin:"40px 0", height:"510px"}}>
        {carouselWorks.length?
        <div style={{ transform: "translateX(2.5%)" }} className="exhibitContainer">
          <Slider {...setting}>
            {Object.values(carouselWorks).map((work) => { 
              return (
                // <div><img style={{width:"250px", height:"250px"}} src={work.img}/></div>
                <div style={{position:"relative"}}>
                  <img style={{width:"750px"}} src="../asset/exhibit_carousel2.png"/><img/>
                  <div className="carousels"><img className="carouselImg" style={{width:"240px", height:"240px"}} src={work.img}/></div>
                  {/* <img className="carouselImg" style={{width:"240px", height:"240px"}} src={work.img}/> */}
                </div>
              )
              
            })}
          </Slider>
        </div>:defaultCarousel}
      </div>

      <div className="workRegistHeader">
        <h2 ref={selectxy}>작품 선택</h2>
        <button onClick={()=>{
          window.scrollTo({top: registxy.current.offsetTop, behavior: "smooth"});}}>작품 추가하기
        </button>
      </div>
      <div style={{color:"#5F5F5F", fontSize:"16px"}}>전시회 입장 페이지 상단에 보여질 작품을 선택해주세요. 최소 5개, 최대 10개 선택 가능합니다.</div>

      <div style={{display:"flex", width: "800px", flexWrap: "wrap", margin:"15px 0"}}>
        {works.map(work=>(
          <div>
            <div style={{textAlign: "right", margin:"7px 5px 2px", fontSize:"12px", color:"#5F5F5F", cursor:"pointer"}} onClick={()=>{
              const newWorks = works.filter(w => w.id !== work.id)
              setWorks(newWorks)

              if (carouselWorks.some(w=> w.id === work.id)) {
                const newCarousels = carouselWorks.filter(wk => wk.id !== work.id)
                setCarouselWorks(newCarousels)
              }}}>삭제
            </div>
            <div id="imgArea"  onClick={()=>{
              if (carouselWorks.some(w=> w.id === work.id)) {
                const newCarousels = carouselWorks.filter(wk => wk.id !== work.id)
                setCarouselWorks(newCarousels)
              } else {
                if (carouselWorks.length === 10) {
                  alert('최대 10개까지 등록 가능합니다.')
                  return
                }
                const newCarousels = [...carouselWorks, work]
                setCarouselWorks(newCarousels)
              }
            }}>
              <img id="workPreview" src={work.img}/>
              <div className={(carouselWorks.some(w=> w.id === work.id))?"selectWork":"unselectWork"}></div>
            </div>
          </div>
        ))}
      </div>
      <hr style={{width:"100%", border:"1px solid #EEE3CB", margin:"20px 0"}}/>

      <div id="topBtn" onClick={()=>{
        window.scrollTo({top: 0, behavior: "smooth"})}}
        >맨 위로
      </div>
    
    
    <div style={{height:"700px"}}></div>
    
    </div>
  )
}