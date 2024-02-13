import './Loading.css'

export default function Loading(props) {
  switch (props.loadingType) {
    case "exhibitList":
      function LoadingExhibit() {
        return (
          <div className="exhibitsLoading">
            <div style={{width:"100%", height:"320px", backgroundColor:"#D9D9D9"}}></div>  {/* 이미지 */}
            <div style={{width:"60%", height:"22.4px", marginTop:"12px"}}></div>           {/* 제목 */}
            <div style={{width:"30%", height:"17.6px", margin:"2px 0"}}></div>             {/* 작가 */}
            <div style={{width:"70%", height:"15.2px", }}></div>                           {/* 기간 */}
          </div>
        )
      }
      
      return (
        <>
          <LoadingExhibit/>
          <LoadingExhibit/>
          <LoadingExhibit/>
          <LoadingExhibit/>
          <LoadingExhibit/>
          <LoadingExhibit/>
        </>
      )
  
    case "artistList":
      function LoadingArtist() {
        return (
          <div className="artistLoading">
            <div style={{width:"100%", height:"300px", backgroundColor:"#D9D9D9"}}></div>  {/* 이미지 */}
            <div style={{width:"40%", height:"25.6px", margin:"10px 0 8px"}}></div>        {/* 작가명 */}
            <div style={{width:"65%", height:"17.6px", margin:"1px 0"}}></div>             {/* 이메일 */}
            <div style={{width:"65%", height:"17.6px", margin:"1px 0"}}></div>             {/* 전화번호 */}
          </div>
        )
      }

      return (
        <>
          <LoadingArtist/>
          <LoadingArtist/>
          <LoadingArtist/>
          <LoadingArtist/>
          <LoadingArtist/>
          <LoadingArtist/>
        </>
      )

    case "workList":
      function LoadingWork() {
        return (
          <div className="workLoading">
            <div style={{width:"100%", height:"300px", backgroundColor:"#D9D9D9"}}></div>  {/* 이미지 */}
            <div style={{width:"50%", height:"30.4px", margin:"16px 0 5px"}}></div>        {/* 작품명 */}
            <div style={{width:"35%", height:"20px"}}></div>        {/* 작가명 */}
          </div>
        )
      }

      return (
        <>
          <LoadingWork/>
          <LoadingWork/>
          <LoadingWork/>
          <LoadingWork/>
          <LoadingWork/>
          <LoadingWork/>
        </>
      )

    default:
      break;
  }
}