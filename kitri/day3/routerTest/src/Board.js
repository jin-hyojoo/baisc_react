import './App.css';
import React, {useState} from 'react';

function Article(props){
return( 
<article>
<h2>{props.title}</h2>
    {props.body}
</article>
)
}
function Header(props){
return <header>
<h1><a href="/" onClick={(event)=>{
props.onChangeMode();
}}>{props.title}</a></h1>
</header>
}
function Nav(props){
    const lis = []
    for(let i=0; i<props.topics.length; i++){
        let t = props.topics[i];
        lis.push(<li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={event=>{
            event.preventDefault();
        props.onChangeMode(Number(event.target.id));
        }}>{t.title}</a>
        </li>)
    }
    return (
        <nav>
        <ol>
        {lis}
        </ol>
        </nav>
    );
}

function Board() {
const [mode, setMode] = useState('WELCOME');
const [id, setId] = useState(null);
const [nextId, setNextId] = useState(4);
const [topics, setTopics] = useState([
{id:1, title:'html', body:'html is ...'},
{id:2, title:'css', body:'css is ...'},
{id:3, title:'javascript', body:'javascript is ...'}
]);

let content = null;
let contextControl = null;
if(mode === 'WELCOME'){
content = <Article title="Welcome" body="Language"></Article>
} 
else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
        if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
    }
}
content = <Article title={title} body={body}></Article>
contextControl = <>
<li><a href={'/update/'+id} onClick={event=>{
    event.preventDefault();
    setMode('UPDATE');
}}>Update</a></li>
<li><input type="button" value="Delete" onClick={()=>{
    const newTopics = []
    for(let i=0; i<topics.length; i++){
    if(topics[i].id !== id){
    newTopics.push(topics[i]);
    }}
    setTopics(newTopics);
    setMode('WELCOME');
    }} /></li>
</>
} 

return (
<div>
    <Header title={mode} onChangeMode={()=>{
    setMode('WELCOME');
    }}></Header>
    <Nav topics={topics} onChangeMode={(_id)=>{
    setMode('READ');
    setId(_id);
    }}></Nav>
    {content}
    <ul>
    <li><a href="/create" onClick={event=>{
    event.preventDefault();
    setMode('CREATE');
    }}>Create</a></li>
    {contextControl}
    </ul>
  </div>
  );
}

export default Board