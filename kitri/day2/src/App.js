import React, { useState } from 'react'; // 상태관리를 위함. 상태값 관리 하려는 대상에 대한 초기화 및 값 변경 가능케 함 
import './App.css';

// ****************************  
//        사용자 TAG 생성           
// ****************************
// 1. Counter Tag
function Counter(){
  const [color, setColor] = useState("black");
  const [msg, setMessage] = useState("주문하세요");

  const onOrder = () => {
    setMessage("어떤 메뉴를 주문하실건가요?");
  }

  const onClose = () => {
    setMessage("감사합니다. 번호표를 받아주세요.");
  }

  return(
    <div>
      <h1 style={{color}}> 키오스크 '_' kiosk</h1>
      <button onClick={onOrder}>주문</button>
      <button onClick={onClose}>종료</button>&nbsp;&nbsp;&nbsp;
      <button onClick={() => setColor("red")}>빨</button>
      <button onClick={() => setColor("orange")}>주</button>
      <button onClick={() => setColor("yellow")}>노</button>
      <p>{msg}</p>
    </div>
  );
}


// 2. InputTest Tag
function InputTest(){
  const [text, setText] = useState('');

  const onChangeText = (e) =>{
    // 현재 이벤트 동작 지점의 값으로 text settings
    setText(e.target.value); 
  }

  return (
    <>
      <input onChange={onChangeText} />&nbsp;
      <div>
        <h3> 입력값 : {text}</h3>
      </div>
    </>
  );
}


// 3. InputManyValue Tag
function InputManyValue(){

  const [person, setPerson] = useState({
    name: "",
    age: ""
  });
  
  const onChangeText = (e) =>{
    const {value, name} = e.target;

    setPerson({
      ...person,
      [name] : value
    }); 
  }

  const onReset = () =>{
    setPerson({name:'',age:''})
  }

  return (
    <>
      <h2>__다중값 상태관리__</h2>
      <input placeholder='이름' onChange={onChangeText} name="name"/><br/>
      <input placeholder='나이' onChange={onChangeText} name="age"/>&nbsp;
      <button onClick={onReset}>Clear</button>
      <div>
        <h3>이름 : {person.name}</h3>
        <h3>나이 : {person.age}</h3>
      </div>
    </>
  );
} 


// ****************************  
//          APP 실행단           
// ****************************
function App() {
  return (
    <div className="App">
      <Counter/>
      <InputTest />
      <hr></hr><br/>
      <InputManyValue />
    </div>
  );
}

export default App;
