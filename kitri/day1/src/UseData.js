const UseData = () =>{
    const name = "NYO";
    const address = "가디";
    const ph = "010-5555-7777";

    return(
        <div>
            <table border='1'>
                <tr>
                    <td>이름</td>
                    <td>주소</td>
                    <td>핸드폰</td>
                </tr>
                <tr>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{ph}</td>
                </tr>
            </table>   
        </div> 
    );

}

export default UseData;