// 강사님 예제
import './App.css';
import React, {useState} from 'react'

function Counter() {
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    setNumber(number + 1)
    console.log('+');
  } 

  const onDescrease = () => {
    setNumber(number - 1)
    console.log('-');
  }
  
  return (
    <div>
      <h1>{number}</h1>      
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDescrease}>-1</button>
      
    </div>
  );
}

function Order() {
  const [message, setMessage] = useState("주문하세요")
  const onOrder = () =>{
    setMessage("어떤 메뉴를 주문하시겠어요?")
  }
  const onEnd = () =>{
    setMessage("감사합니다. 또 오세요.")
  }

  return (
    <div>
      <h1>{message}</h1>
      
      <button onClick={onOrder}>주문</button>
      <button onClick={onEnd}>종료</button>      
    </div>
  );
}

function InputTest(){
   const [text, setText] = useState('')

   const onChangeText = (e) => {
    setText(e.target.value)
   } 

   const onReset = () => {
     setText('')
   }
  return(
      <>
        <input placeholder='이름' onChange={onChangeText}/>        
        <button onClick={onReset}>Clear</button>
        <div>
            <h3>입력값 :  {text} </h3>
        </div>   
      </>


  );

}

function IconputManyTest(){
  //const [name, setName] = useState('')
  //const [age, setAge] = useState('')

  const [person, setPerson] = useState({
      name:"",
      age:""
  })
  
  const {name, age} = person;


  const onChangeText = (e) => {
     const {value, name} = e.target

     setPerson({
         ...person,
        [name] : value
     })

     console.log(person)
  } 

  const onReset = () => {
    setPerson({name:'',age:''})
    
  }
 return(
     <>
       <input placeholder='이름' onChange={onChangeText} name='name'/>
       <input placeholder='나이' onChange={onChangeText} name='age'/>
       <button onClick={onReset}>Clear</button>
       <div>
           <h3>이름 :  {name} </h3>
           <h3>나이 :  {age} </h3>
       </div>   
     </>


 );

}



function OrderColor() {
  
  const [message, setMessage] = useState("주문하세요")
  const [color, setColor] = useState("black") 
  
  const onOrder = () =>{
    setMessage("어떤 메뉴를 주문하시겠어요?")
  }
  const onEnd = () =>{
    setMessage("감사합니다. 또 오세요.") 
  }

  const onColor = (e) =>{
    setColor(e.target.value)
  }
  return (
    <div>
      <h1 style={{color:color}}>{message}</h1>
      
      <button onClick={onOrder}>주문</button>
      <button onClick={onEnd}>종료</button> 
      <button style={{color:"blue"}} value ="blue" onClick={onColor}>파랑</button>
      <button style={{color:"red"}} value ="red" onClick={onColor}>빨강</button> 
      <button style={{color:"yellow"}} value ="yello" onClick={onColor}>노랑</button>
           
    </div>
  );
}

function App() {
  return (
    <div className="App">      
      <IconputManyTest />
    </div>
  );
}

export default App;
