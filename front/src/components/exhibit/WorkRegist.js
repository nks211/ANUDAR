import { useState, useRef, useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './WorkRegist.css'
import { uploadWorkImg } from '../../API';
import { mainstate } from '../../StateManagement';
import { ExhibitRegistContext } from '../../exhibit/ExhibitRegistPage';

export default function WorkRegist() {
  const { works, setWorks } = useContext(ExhibitRegistContext);
  const [carouselWorks, setCarouselWorks] = useState([]);
  
  // const [workId, setWorkId] = useState(0);
  const [title, setTitle] = useState();
  const [detail, setDetail] = useState("");
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
  
  const logintoken = mainstate((state) => (state.logintoken))
  // console.log(logintoken)
  // console.log(localStorage.getItem("token"))

  const upload = async (event) => {
    const file = event.target.files[0];
    if (!file) { return; }

    const imageurl = await uploadWorkImg(file, logintoken);
    setFileName(file.name)
    
    if (imageurl != "") {
      // console.log(String(imageurl))
      setPreview(<img style={{width:300, height:300, objectFit: "cover"}} src={String(imageurl)} />)
      setWorkImg(String(imageurl))
    } else {
      alert('이미지를 찾을 수 없습니다.')
    }
  }

  // 캐러셀
  const setting = {
    dots: false,
    dotsClass: "slidedots",
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2500,
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
              <textarea value={detail} placeholder="최대 글자수 500자" maxLength="500" onChange={(event)=>{setDetail(event.target.value)}} required/>
            </div>
            <div style={{textAlign:'right', fontSize:"12px", marginBottom:"8px"}}>{detail.length}/500</div>
            <div className="workInput">
              <div className="item1"><span>*</span> 이미지 등록</div>
              <div className="item2">
                <span><div>{fileName&&fileName.length>17?fileName.slice(0, 20)+"...":fileName}</div>{fileName?<img src='../asset/delete_button.png' onClick={()=>{setPreview(defaultPreview); setFileName(); setWorkImg()}}></img>:""}</span>
                <label className="uploadBtn" for="workImg">선택</label>
                <input type="file" id="workImg" accept="image/*" onChange={event => {upload(event); event.target.value = '';}} style={{ display: "none" }} required/>
              </div>
            </div>
            <div className="workInput" style={{marginBottom:"18px"}}>
              <div className="item1"><span>*</span> 최소 경매가</div>
              <input value={price} min={10} max={100} type="number" placeholder="최소 10만원, 최대 100만원까지 입력 가능합니다" 
                style={{flex:"2.2"}}
                onChange={(event)=>{setPrice(event.target.value)}} required/>
              <div style={{flex:"0.3", textAlign:"right"}}>만원</div>
            </div>
            <div style={{display:"flex", justifyContent: "center"}}>
              <button id="workRegistBtn" type="submit" onClick={(event)=>{
                event.preventDefault()
                if (!title || !detail || !fileName || !price) {
                  alert('모든 정보를 입력해주세요.')
                  return
                }

                if (price < 10 || price > 100) {
                  alert('경매가는 최소 10만원, 최대 100만원까지 입력 가능합니다.')
                  return
                }

                if (works.length === 20) {
                  alert('작품은 최대 20개까지 등록 가능합니다.')
                  return
                }
                // const newWork = {"id":workId, "title":title, "description":description, "img":workImg, "price":price, "preview":preview}
                // const newWork = {"id":workId, "title":title, "image":workImg, "detail":detail, "price":price, "bid":0, "author":{loginUser}}
                // const newWork = {"id":workId, "title":title, "image":workImg, "detail":detail, "price":price*10000}
                
                const newWork = {"title":title, "image":workImg, "detail":detail, "price":price*10000}
                const newWorks = [...works, newWork]

                setWorks(newWorks)
                // setWorkId(workId+1); setTitle(""); setDetail(""); setWorkImg(); setPrice(""); setPreview(defaultPreview); setFileName("");
                setTitle(""); setDetail(""); setWorkImg(); setPrice(""); setPreview(defaultPreview); setFileName("");
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
                <div style={{position:"relative"}}>
                  <img style={{width:"750px"}} src="../asset/exhibit_carousel2.png"/><img/>
                  <div className="carousels"><img className="carouselImg" style={{width:"240px", height:"240px"}} src={work.image}/></div>
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
              <img id="workPreview" src={work.image}/>
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