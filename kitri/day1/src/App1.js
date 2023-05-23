import './App.css';

function Header(props){
  console.log("##### CHECK PROPS ##### ", props);
  return (
    <header>
        <h1> 제목 : {props.title}</h1>
        <h1><a href="/">Computer Programming</a> </h1>
    </header>
  );
}

function Nav(props){
  console.log("##### CHECK PROPS ##### ", props);
  const subjectList = []
  for(let i=0; i<props.data.length; i++){
    subjectList.push(<li>{props.data[i].subject}</li>);
  }
  return (
    <nav>
      <ui>{subjectList}</ui>
    </nav>
  );
}

function Article(props){
  return(
    <article>
      <h3>{props.title}</h3>
      <a href="https://ko.legacy.reactjs.org/tutorial/tutorial.html#passing-data-through-props">
        {props.question}
      </a>
    </article>
  );
}

function App1(){
  const forNavData = [
    {num:1, subject:"React.js"},
    {num:2, subject:"Node.js"},
    {num:3, subject:"Spring"},
    {num:4, subject:"Typeleaf"},
  ]

  return (
    <div className="App">
      <Header title="Programming" />
      <Nav data={forNavData}/>
      <Article title=">> List of the Computer Programming <<" question="리엑트 자습서" />
    </div>
  );
}
export default App1;
