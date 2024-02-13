import { React, useState, useEffect } from "react";
import dummy from "../db/data.json"
import Work from "../components/work/Work";
import Search from "../components/search/Search";
import '../index.css'
import { getWorks } from "../API";
import Loading from "../components/loading/Loading";


export default function WorkPage() {
  const [works, setWorks] = useState([]);

  async function getData() {
    try {
      const res = await getWorks()
      setWorks(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <div>
      <Search updateValues={(searchWork) => {

        // filter ..??
        const newWorks = []
        for (let i=0; i<dummy.works.length; i++) {
          // *수정* : title (API 연결 후) 변경
          if (dummy.works[i].title.includes(searchWork)) {
            // 뒤에서부터 넣기 !!!!!!!
            newWorks.push(dummy.works[i])
            console.log(newWorks)
          }
        }
        // setWorks(newWorks)
      }}/>
      <div className="workList">
        {works.length?
          works.map(work=>( <Work className="Work" workType={1} work={work}/> ))
          :<Loading loadingType={"workList"}/>
        }
        {/* <Loading loadingType={"workList"}/>
        {works.map(work=>( <Work className="Work" workType={1} work={work}/> ))} */}
      </div>
    </div>
  );
};