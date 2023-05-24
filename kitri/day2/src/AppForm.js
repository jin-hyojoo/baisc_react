import './App.css';
import {useState} from 'react';

// Article
function Article(props){
    return( 
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}//=================== End Article

// Header
function Header(props){
    return (
        <header>
            <h1><a href="/" onClick={(event)=>{
                                        event.preventDefault();
                                        props.onChangeMode();
                                    }}>{props.title}</a>
            </h1>
        </header>
    );
}//=================== End Header

// Nav
function Nav(props){

    const lis = []

    for(let i=0; i<props.topics.length; i++){
        let t = props.topics[i];
        lis.push(<li key={t.id}>
                    <a id={t.id} href={'/read/'+t.id} onClick={event=>{
                                                                event.preventDefault();
                                                                props.onChangeMode(Number(event.target.id));
                                                            }}>{t.title}
                    </a>
                 </li>);
    }
    return (
        <nav>
        <ol>
        {lis}
        </ol>
        </nav>
    );
}//=================== End Nav

// Create
function Create(props){
    return(
        <article>
            <h2>Create</h2>
            <form onSubmit={event=>{
                                event.preventDefault();
                                
                                const title = event.target.title.value;
                                const body = event.target.body.value;
                                props.onCreate(title, body);
                            }}>
                <p><input type="text" name="title" placeholder="title"/></p>
                <p><textarea name="body" placeholder="body"></textarea></p>
                <p><input type="submit" value="Create"></input></p>
            </form>
        </article>
    );
}//=================== End Create

// Update
function Update(props){

    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={event=>{
                                     event.preventDefault();
                                     const title = event.target.title.value;
                                     const body = event.target.body.value;
                                     props.onUpdate(title, body);
                                    }}>
       
                <p><input type="text" name="title" placeholder="title" value={title}
                    onChange={event=>{
                                        setTitle(event.target.value);
                                     }}/></p>
                <p><textarea name="body" placeholder="body" value={body}
                    onChange={event=>{
                                        setBody(event.target.value);
                                     }}></textarea></p>
                <p><input type="submit" value="Update"></input></p>
            </form>
        </ article>
    );
}//=================== End Update

// ****************************  
//          APP 실행단           
// ****************************
function App1() {

    // 모드 관리
    const [mode, setMode] = useState('WELCOME');

    // 인덱스 역할
    const [id, setId] = useState(null); 
    
    // 다음 인덱스 설정
    const [nextId, setNextId] = useState(4);

    const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
    ]);

    let content = null;
    let contextControl = null;

    // 첫 로딩
    if(mode === 'WELCOME'){
        content = <Article title="Welcome" body="Hello, WEB"></Article>

    // 내용 읽어오기(조회)
    } else if(mode === 'READ'){
        let title, body = null;

        for(let i=0; i<topics.length; i++){
            if(topics[i].id === id){
                title = topics[i].title;
                body = topics[i].body;
            }
        }

        // Article 태그에 props(title, body) 전달 
        content = <Article title={title} body={body}></Article>;

        contextControl = <>
        <li><a href={'/update/'+id} onClick={event=>{ event.preventDefault(); setMode('UPDATE');}}>Update</a></li>
            
        // id값 동일하지 않는 topics값 재생성해 해당 topics으로 setTopics 
        // => 특정 id를 결국 지우겠다는 소리
        <li><input type="button" value="Delete" onClick={()=>{
                                                            const newTopics = []

                                                            for(let i=0; i<topics.length; i++){
                                                                if(topics[i].id !== id){
                                                                newTopics.push(topics[i]);
                                                                }
                                                            }

                                                            setTopics(newTopics);
                                                            setMode('WELCOME');
                                                        }} /></li>
    </>;

    // New 생성
    } else if(mode === 'CREATE'){
        content = <Create onCreate={(_title, _body)=>{
                                                        const newTopic = {id:nextId, title:_title, body:_body}
                                                        const newTopics = [...topics]
                                                        newTopics.push(newTopic);
                                                        setTopics(newTopics);
                                                        setMode('READ');
                                                        setId(nextId);
                                                        setNextId(nextId+1);
                                                    }}>
                 </Create>

    // 수정하기
    } else if(mode === 'UPDATE'){
        let title, body = null;

        // 같은 id일 경우에만 값 재세팅
        for(let i=0; i<topics.length; i++){
            if(topics[i].id === id){
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        
        content = <Update title={title} body={body} onUpdate={(title, body)=>{
                                                                                console.log(title, body);
                                                                                const newTopics = [...topics]
                                                                                const updatedTopic = {id:id, title:title, body:body}

                                                                                for(let i=0; i<newTopics.length; i++){
                                                                                    if(newTopics[i].id === id){
                                                                                        newTopics[i] = updatedTopic;
                                                                                        break;
                                                                                    }
                                                                                }
                                                                                setTopics(newTopics);
                                                                                setMode('READ');
                                                                            }}>
                    </Update>
    };

    // 화면 
    return (
        <div>
            <Header title="WEB" onChangeMode={()=>{ setMode('WELCOME'); }}></Header>
            
            {/* 헷갈리지만 잘 알아두기
            
            // 1. props(= topics)값 들고 Nav함수로 이동
            // 2. Nav함수 속 로직 실행
            // 3. 호출한 Nav함수에서 onChangeMode를 호출   ex. onClick={event=>{props.onChangeMode(Number(event.target.id)); 
            // 4. 호출한 함수에서 전달받은 id값으로 setId 진행
            // 5. Header태그나 다른 태그들도 마찬가지
            */}
            <Nav topics={topics} onChangeMode={(_id)=>{ setMode('READ'); setId(_id); }}></Nav>
            
            {content}

            <ul>
                <li><a href="/create" onClick={event=>{ event.preventDefault(); setMode('CREATE'); }}>Create</a></li>
                {contextControl}
            </ul>
        </div>
    );
}
export default App1;
