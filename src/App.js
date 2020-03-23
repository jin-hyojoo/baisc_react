import React,{Component} from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';


class App extends Component {
  /**state값 초기화
   * 
   * 어떤 컴포넌트가 실행될 때 render()함수보다 먼저 실행되어
   * 컴포넌트를 초기화 시켜주고 싶을 때 constructor안에 그 내용을 작성함
   * 즉, 컴포넌트가 실행될 때 constructor가 먼저 실행되어 초기화를 담당함.
   * 
   * state값에 subject가 있는지 등과 같은 점을 알수 없음을 통해
   * 외부에서 알 필요 없는 정보를 철저히 은닉하는 것이 좋은 사용성을 만드는 핵심.
   * ex) 전선이 삐져나와 있단거나 실밥이 삐져나와있는거 아무도 좋아하지 않음.
   * 
   * 상위컴퍼넌트(여기선 APP)의 상태값을 하위컴터넌트(여기선 Subject) props에 전달 가능
   * 
   * 리엑트는 props,state값이 변경되면 해당되는 컴포넌트의 render()함수 다시 호출되고
   * render()함수 하위에 있는  컴포넌트들도 다시 호출됨 -> props,state값이 변경 사 화면이 다시 그려짐
   */
  constructor(props){
    super(props);
    this.max_content_id=3; /* ui영향 미치지 않기 때문에 this.state사용 안함 (불필요한 렌더링)  */
    this.state={
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web!!'},
      welcome:{title:'Welcome', desc:'Hello, React'},
      contents:[
        {id:1, title:'HTML' , desc:'HTML is for information'},
        {id:2, title:'CSS' , desc:'CSS is for design'},
        {id:3, title:'JAVASCRIPT' , desc:'JAVASCRIPT is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i =0;
     while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
          break;
          /* _title = data.title;
            _desc = data.desc; */
        }
        i += 1;
      } 
  }//================================================  end getReadContent : 'read'모드에서 선택한 컨텐트 무엇인지 읽어오기
  
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode ===  'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode ===  'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
          this.max_content_id += 1;
          /* state에 값 추가할 때 push를 사용하면 원래의 값(원본값)이 변경되므로 
             오리지널 값 변경이 없이 새로운 데이터 추가가 가능한 concat을 사용하도록 하자 
             (원본을 바꾸지 않음 = 불변성 = immutable)
             : 단순한 구현을 유지함으로써 높은 복잡성에 도전하고자하는 노력
             관련 js -> https://immutable-js.github.io/immutable-js/
          */

         var _contents = Array.from(this.state.contents);
         _contents.push({id:this.max_content_id, title:_title, desc:_desc});

         /* 74줄 문장 (Array.from()) 쓰기 전에 썼던 컨켓방법 
            컨켓대신 Array.from을 사용하고 복제된 값으로 push를 사용했으므로 
            원래의 원본값에는 영향을 주지 않음

            var _contents = this.state.contents.concat( 
            {id:this.max_content_id, title:_title, desc:_desc}
          )
          */
          this.setState({
            contents : _contents,
            mode:'read',
            selected_content_id:this.max_content_id
          });
          console.log(_title, _desc);
      }.bind(this)}></CreateContent>

    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents); //this.state.contents를 복사한 새로운 배열 생성
          
          //수정하고자 하는 동일값의 id 찾기
          var i= 0 ;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i+= 1;
          }
          this.setState({
            contents : _contents,
            mode:'read'
          });
        console.log(_title, _desc);
    }.bind(this)}></UpdateContent>

    }else if(this.state.mode === 'delete'){

    }return _article;
  }//================================================  End getContent : mode에 따른 화면로드 

  render(){
    console.log('APP RENDER');
    return (
      <div className="App">
        
            {/* 우리가 만드려는 Subject 컴포넌트는 onChangePage라는 이벤트가 있어서
                컴포넌트 안에서 링크 클릭 시 이벤트에 설치한 함수를 호출하도록 만듬  */}
                
        <Subject 
            title={this.state.subject.title} 
            sub={this.state.subject.sub}

            onChangePage = {function(){
              this.setState({mode:'welcome'});
            }.bind(this)}
        ></Subject> 
          
          {/*  수업 진도 내용 -> 컴포넌트 이벤트 만들기 1전까지는 주석 속 내용 참고
          <header>
            <h1><a href="/" onClick={function(e){
              console.log(e);
              e.preventDefault();  // 이벤트의 원래 정해진 동작을 막음, 여기선 a태그니까 링크로의 연결기능을 막음 

                 *** 이벤트가 호출됐을 때 실행되는 이 함수 안에서는 this값이 자신의 컴포넌트 값이 아닌 아무값도 설정되어 있지 않기때문에
                 this를 우리의 컴포넌트로 사용하기 위해 함수가 끝난 직후에 this를 bind 해주어야함 
                 
                 this.state.mode='welcome';

                 근데 또 코드를 이렇게 작성하면 react가 state값이 변경되었는지 알 수 없음 
                 (react가 요구하는 사용법을 따라야함)

                 따라서 this.state.mode가 아닌 setState()를 이용해 값이 변경됨을 알려야 함
                 그러니까 컴퍼넌트 생성이 끝난 후 동적으로 state값 바꿀 때는 setState를 이용해주세요 ^_^ ***
                  
                 this.setState({
                    mode:'welcome'
                 });
            }.bind(this)}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}   
        </header>   
      */}

          {/* 부모 APP의 state를 자식이 props로 받아 사용 중 */}
          <TOC 
            onChangePage={function(id){
              this.setState({
                mode:'read',
                selected_content_id: Number(id)
              });
            }.bind(this)} 
            data={this.state.contents}
          ></TOC>

          <Control onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm("Are you sure you want to delete it??")){ //진짜로 삭제할건지 물어보기
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id ){
                    _contents.splice(i,1); //발견한 아이디의 값부터 1개 지우겠다
                    break;
                  }
                  i += 1;
                }
                this.setState({
                  mode :'welcome',
                  contents : _contents
                });
                alert("Delete Success");
              }
            }else {
               this.setState({
               mode:_mode
               });
              }
          }.bind(this)}></Control>

          {this.getContent()}
          
          {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
      </div>
    );
  }
}

export default App;
