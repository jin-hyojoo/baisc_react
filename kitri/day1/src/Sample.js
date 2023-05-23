const Sample = (props) => {
    const name = "Nyozu";

    if (name){
        return ( 
            <div>
                <h1>Sample tEST rEACT!!</h1>
                <hr></hr>
                <h4>{name}님 서울역 도착하셨습니다.</h4>
                <h4>문의사항은 {props.phone}으로 연락바랍니다.</h4>
            </div>
        );
    }else{
        return <h1>이름이 없네용</h1>;
    }
   
}
  
export default Sample;
