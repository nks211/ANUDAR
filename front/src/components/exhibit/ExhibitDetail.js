import { useEffect, useState } from "react";
import './ExhibitDetail.css'

export default function ExhibitDetail(props) {
	const colors = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE"]
	let colorNames;
	const steps = () => {
		return (
			colors.map(color => {
				return <div className="step"><p>{color}</p></div>
			})
		)
	}

	useEffect(() => {
		colorNames = steps()

		const stepElems = document.querySelectorAll('.step');
		const graphicElems = document.querySelectorAll('.graphic-item');
		let currentItem = graphicElems[0];
		let ioIndex;

		const io = new IntersectionObserver((entries, observer) => {
			ioIndex = entries[0].target.dataset.index * 1;
		});

		console.log(io)

		for (let i = 0; i < stepElems.length; i++) {
			io.observe(stepElems[i]);
			stepElems[i].dataset.index = i;
			graphicElems[i].dataset.index = i;
		}

		function activate(action) {
			if (currentItem) { currentItem.classList.add('visible'); }
			currentItem.classList.add('visible');
		}

		function inactivate(action) {
			if (currentItem) { currentItem.classList.remove('visible'); }
			currentItem.classList.remove('visible');
		}

		const scrollEvent = () => {
			let step;
			let boundingRect;

			for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
				step = stepElems[i];
				if (!step) continue;
				boundingRect = step.getBoundingClientRect();

				if (boundingRect.top > window.innerHeight * 0.1 &&
					boundingRect.top < window.innerHeight * 0.8) {

					inactivate(currentItem.dataset.action);
					currentItem = graphicElems[step.dataset.index];
					activate(currentItem.dataset.action);
				}
			}
		}

		window.addEventListener('scroll', scrollEvent);

		activate();

	}, []);


	return (
		<>
			<header className="header">
				<div className="global-width">
					<h1 className="page-title">코로나19 시대, 제주 사는 개발자의 하루</h1>
					<p>
						이 페이지는 BBC 비주얼저널리즘 팀에서 제작한 <a href="https://www.bbc.com/korean/resources/idt-48d3c9a7-4063-4289-9726-611b5ea9d7b5" target="_blank">'재택근무의 일상화'... 코로나19가 바꿀 사무실의 미래</a> 페이지를 비슷하게 구현해 본 개발 예제입니다. 시각적 기능만 비슷하게 만들어 본 것이므로, 개발 방식은 전혀 다를 수도 있습니다.<br />아래의 내용은 제주 바닷가에 사는 개발자인 저의 실제 일상이기도 하지만, 강의영상 예제로 만든 페이지이므로 내용에 큰 의미를 두고 보실 필요는 없습니다 ㅎㅎ<br />밑으로 스크롤 해봅시다.
					</p>
				</div>
			</header>
			<section className="scroll-content">
				<div className="scroll-graphic">
					<div className="graphic-item"><div style={{ backgroundColor: "red" }}></div></div>
					<div className="graphic-item"><div style={{ backgroundColor: "orange" }}></div></div>
					<div className="graphic-item"><div style={{ backgroundColor: "yellow" }}></div></div>
					<div className="graphic-item"><div style={{ backgroundColor: "green" }}></div></div>
					<div className="graphic-item"><div style={{ backgroundColor: "blue" }}></div></div>

					{/* <div className="graphic-item"><img className="scene-img" src="./images/00.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/01.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/02.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/bird.gif" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/03.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/04.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/05.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/06.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/07.png" alt=""/></div>
          <div className="graphic-item"><img className="scene-img" src="./images/08.png" alt=""/></div> */}
				</div>
				<div className="scroll-text global-width">
					{/* <>{steps()}</> */}
					{steps()}
				</div>
			</section>
			<section className="normal-content global-width">
				<h2>도시를 떠나는 사람들</h2>
				<p>원격근무 하시는 개발자 디자이너분들, 제주로 오세요. 진짜 좋아요. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam culpa ab, laborum repellat ut quae deleniti nostrum sapiente illum!</p>
				<h2>언택트 시대가 온다</h2>
				<p>언택트(Untact)'란 '콘택트(contact: 접촉하다)'에서 부정의 의미인 '언(un-)을 합성한 말로, 기술의 발전을 통해 비대면으로 이루어지는 활동 경향을 의미한다. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam provident voluptatum numquam dolorum, quod odio.</p>
				<h2>내일은 어떤 모습일까</h2>
				<p>똑같겠지 다를게 있나 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui impedit numquam atque quidem quos facere obcaecati deleniti labore culpa esse nostrum dicta earum rem ducimus, voluptates eligendi voluptate exercitationem dolorem!</p>
			</section>
		</>
	)

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

	// console.log(props.exhibit)


	// console.log(props.exhibit.author.name)
	// console.log(props.exhibit.docent)


	// return(
	//   <div>
	//       {/* <div className="scrExhibitItem"></div>
	//       <div className="scrExhibitItem"></div> */}

	//       {/* <div style={{width:"100vw", height:"500px", display:"flex", margin:"40px 0"}}>
	//         <div id="exhibitDetailBanner">
	//           <div style={{textAlign:"right"}}>
	//             <div style={{fontSize:"45px", fontWeight:"900"}}>{props.exhibit.name}</div>
	//             <div style={{fontSize:"25px", fontWeight:"600"}}>{props.exhibit.author?.name}</div>
	//           </div>
	//         </div>
	//         <div style={{width:"30vw"}}>
	//           // <img className="exhibitImage2" style={{width:375, height:500, margin:"0 25px 0 40px"}} src={"../../"+props.exhibit.image}></img>
	//           <img className={scrollPosition>=50?"exhibitImage2":""} style={{width:375, height:500, margin:"0 25px 0 40px", objectFit:"cover"}} src={props.exhibit.image}></img>
	//         </div>
	//         <div style={{width:"35vw", backgroundColor:"gray"}}>
	//           <div style={{width:"25vw", height:"90%", marginLeft:"20px", display:"flex", alignItems:"flex=end"}}>{props.exhibit.detail}</div>
	//         </div>
	//       </div> */}


	//     {/* <div id="scrollExhibit">
	//       <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
	//       <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
	//       <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
	//       <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
	//       <div className="scrExhibitItem"><img src={"../../"+props.exhibit.image}></img></div>
	//     </div>
	//     <div id="scrollInfo">
	//       <div className="scrInfoItem">정보1</div>
	//       <div className="scrInfoItem">정보2</div>
	//       <div className="scrInfoItem">정보3</div>
	//       <div className="scrInfoItem">정보4</div>
	//       <div className="scrInfoItem">정보5</div>
	//     </div> */}
	//   </div>
	// )
}