import { useEffect, useState } from "react";
import './ExhibitDetail.css'

export default function ExhibitDetail(props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(()=>{
    
  // })
  // const infoElems = document.querySelectorAll('.scrInfoItem');
	// const exhibitElems = document.querySelectorAll('.scrExhibitItem');
	// let currentItem = exhibitElems[0];
	// let ioIndex;

	// const io = new IntersectionObserver((entries, observer) => {
	// 	ioIndex = entries[0].target.dataset.index * 1;
	// });

	// for (let i = 0; i < infoElems.length; i++) {
	// 	io.observe(infoElems[i]);
	// 	infoElems[i].dataset.index = i;
	// 	exhibitElems[i].dataset.index = i;
	// }

	// function activate(action) {
  //   currentItem.classList.add('visible')
	// 	// currentItem.classList.add('visible');
	// 	// if (action) {
	// 	// 	actions[action](true);
	// 	// }
	// }

	// function inactivate(action) {
	// 	currentItem.classList.remove('visible');
	// 	// if (action) {
	// 	// 	actions[action](false);
	// 	// }
	// }

	// window.addEventListener('scroll', () => {
	// 	let info;
	// 	let boundingRect;

	// 	for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
	// 		info = infoElems[i];
	// 		if (!info) continue;
	// 		boundingRect = info.getBoundingClientRect();
			
	// 		if (boundingRect.top > window.innerHeight * 0.1 &&
	// 			boundingRect.top < window.innerHeight * 0.8) {
				
	// 			inactivate(currentItem.dataset.action);
	// 			currentItem = exhibitElems[info.dataset.index];
	// 			activate(currentItem.dataset.action);
	// 		}
	// 	}
	// });

	// window.addEventListener('load', () => {
	// 	// setTimeout(() => scrollTo(0, 0), 100);
	// });

	// // activate();

	console.log(props.exhibit)
	// console.log(props.exhibit.author.name)
	// console.log(props.exhibit.docent)


  return(
    <div>
        {/* <div className="scrExhibitItem"></div>
        <div className="scrExhibitItem"></div> */}

        <div style={{width:"100vw", height:"500px", display:"flex", margin:"40px 0"}}>
          <div id="exhibitDetailBanner">
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"45px", fontWeight:"900"}}>{props.exhibit.name}</div>
              <div style={{fontSize:"25px", fontWeight:"600"}}>{props.exhibit.author?.name}</div>
            </div>
          </div>
          <div style={{width:"30vw"}}>
            {/* // <img className="exhibitImage2" style={{width:375, height:500, margin:"0 25px 0 40px"}} src={"../../"+props.exhibit.image}></img> */}
            <img className={scrollPosition>=50?"exhibitImage2":""} style={{width:375, height:500, margin:"0 25px 0 40px"}} src={props.exhibit.image}></img>
          </div>
          <div style={{width:"35vw", backgroundColor:"gray"}}>
            <div style={{width:"25vw", height:"90%", marginLeft:"20px", display:"flex", alignItems:"flex=end"}}>{props.exhibit.detail}</div>
          </div>
        </div>


      {/* <div id="scrollExhibit">
        <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
        <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
        <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
        <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
        <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
      </div>
      <div id="scrollInfo">
        <div className="scrInfoItem">정보1</div>
        <div className="scrInfoItem">정보2</div>
        <div className="scrInfoItem">정보3</div>
        <div className="scrInfoItem">정보4</div>
        <div className="scrInfoItem">정보5</div>
      </div> */}
    </div>
  )
}