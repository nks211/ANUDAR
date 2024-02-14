import { React, useState, useEffect } from "react";
import Work from "../components/work/Work";
import Search from "../components/search/Search";
import '../index.css'
import { getWorks } from "../API";
import Loading from "../components/loading/Loading";


export default function WorkPage() {
  const [isConnect, setIsConnect] = useState(false);  // API 연결 확인
  const [works, setWorks] = useState([]);
  const [searchV, setSearchV] = useState("")  // 검색 값
  const [showWorks, setShowWorks] = useState([]);

  async function getData() {
    try {
      const res = await getWorks()
      setWorks(res)
      setShowWorks(res)
      setIsConnect(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <div>
      <Search 
        searchValue={searchV}
        setSearchValue={(search)=>setSearchV(search)}
        updateValues={(searchWork) => {
          const filterWorks = works.filter(work => work.title.includes(searchWork))
          if (!filterWorks.length) {alert('일치하는 작품이 없습니다.'); setShowWorks(works); return}
          setShowWorks(filterWorks)
      }}/>
      <div className="workList">
        {isConnect?
          (showWorks.length?
            showWorks.map(work=>( <Work className="Work" workType={1} work={work}/> ))
            :<div style={{width:"100%"}}>
              <div>등록된 작품이 없습니다. 작품을 등록해보세요!</div>
              {/* <button onClick={()=>navigate("/exhibit/regist")}>작품 등록하러 가기</button> */}
            </div>
          )
          :<Loading loadingType={"workList"} />
        }
      </div>
    </div>
  );
};