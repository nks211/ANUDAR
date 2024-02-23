import { useEffect, useState } from "react";
import './ExhibitDetail.css'

export default function ExhibitDetail(props) {
	const exhibit = props.exhibit

	const images = [
		<img style={{width:"375px", height:"500px", objectFit:"cover"}} src={exhibit.image} />,
		<img style={{width:"375px", height:"375px", objectFit:"cover"}} src={exhibit.author?.image} />,
		<div style={{display:"flex", flexDirection:"column"}}>
			<img style={{width:"375px", height:"375px", objectFit:"cover"}} src={exhibit.workList?.[0].image}/>
		</div>,
		<div style={{display:"flex", flexDirection:"column"}}>
			{/* <img style={{width:"375px", height:"375px", objectFit:"cover"}} src={exhibit.workList?.[3].image}/> */}
			<img style={{width:"375px", height:"375px", objectFit:"cover"}} src={exhibit.workList?.[1].image}/>
		</div>
	]

	let imageNames;
	const steps = () => {
		return (
			images.map(image => {
				return <div className="step">{image}</div>
			})
		)
	}

	useEffect(() => {
		imageNames = steps()

		const stepElems = document.querySelectorAll('.step');
		const graphicElems = document.querySelectorAll('.graphicItem');
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
		<div className="exhibitDetailScroll">
			<div className="beforeScroll"></div>
			<section>
				<div className="scrollGraphic">
					<div className="graphicItem">
						<div style={{ backgroundColor: "#967E76", display:"flex" }}>
							<div style={{width:"25%"}}></div>
							<div style={{padding:"25px 35px", marginLeft:"15px", borderRadius:"10px", backgroundColor:"white", width:"40%", height:"50%"}}>
								<img width={80} src={"../../asset/detail_1.gif"} />
								<div>
									<h1>{exhibit.name}</h1>
									<div>{exhibit.detail}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="graphicItem">
						<div style={{ backgroundColor: "#D7C0AE", display:"flex", flexWrap:"wrap" }}>
							<div style={{width:"25%"}}></div>
							<div style={{padding:"25px 35px", marginLeft:"15px", borderRadius:"10px", backgroundColor:"white", width:"40%", height:"50%"}}>
								<img width={80} src={"../../asset/detail_2.gif"} />
								<div>
									<h1>{exhibit.author?.name}</h1>
									<div>{exhibit.author?.email}</div>
									<div>{exhibit.author?.phone}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="graphicItem">
						<div style={{ backgroundColor: "#EEE3CB", display:"flex" }}>
							<div style={{width:"25%"}}></div>
							<div style={{padding:"25px 35px", marginLeft:"15px", borderRadius:"10px", backgroundColor:"white", width:"40%", height:"50%"}}>
								<img width={80} src={"../../asset/detail_3.gif"} />
								<div>
									<h3>전시기간</h3>
									<div>{exhibit.start_time?.split("T")[0] + " ~ " + exhibit.end_time?.split("T")[0]}</div>
									<div>경매는 마지막 주 토요일에 진행됩니다.</div>
								</div>
							</div>
						</div>
					</div>
					<div className="graphicItem">
						<div style={{ backgroundColor: "#F9EFDB", display:"flex" }}>
							<div style={{width:"25%"}}></div>
								<div style={{padding:"25px 35px", marginLeft:"15px", borderRadius:"10px", backgroundColor:"white", width:"40%", height:"50%"}}>
								<img width={80} src={"../../asset/detail_4.gif"} />
								<div>
									<h3>온라인 도슨트</h3>
									<div>{exhibit.docent?.start_time.split("T")[0]}</div>
									<div>{exhibit.docent?.start_time.split("T")[1]}</div>
									<div>실시간으로 진행됩니다.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="scrollText globalWidth">
					{steps()}
				</div>
			</section>
			<div className="afterScroll"></div>
		</div>
	)
}