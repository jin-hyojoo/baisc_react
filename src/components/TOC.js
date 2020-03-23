import React, {Component} from 'react';

/**TOC:Table Of Contents */
class TOC extends Component{

  
    /* shouldComponentUpdate는 컴포넌트의 reder()실행 여부를 결정함 (render이전에 실행됨)
       인자로 newProps, newState 2개를 지님
       newProps로 바뀐값을 알 수 있고 this.props.data로는 현재값을 알 수 있음
       즉, 새롭게 변경된 값과 이전 값에 접근이 가능하다     */
    shouldComponentUpdate(newProps, newState){
      console.log("TOC shouldComponentUpdate"
        ,newProps.data, this.props.data
      );
      
      /* 값이 같다는건 변경되지 않았다는 의미니까 불필요한 render호출이 필요없음 */
      if(this.props.data === newProps.data){ 
        return false;
      }
      return true;
    }


    render(){
      console.log('TOC RENDER');
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length){
        /**lists 배열에 값 담음 , 여러 엘리먼트 자동으로 생성할 때 key라는 props 가져야함
         * 리액트가 필요로 하는 것이니 그러려니 하고 지켜주는 게 좋음 */
        lists.push(
          <li key={data[i].id}>
            <a 
              href={"/content/" + data[i].id}
              /* data-id = {data[i].id}과 같이 속성을 이용하는 방식 대신 bind함수 두번째 인자에 값을 넘겨주는 방식을 사용할 수 있음 
                 두번째 인자로 넘겨진 값은 해당 이벤트 함수의 매개변수 값으로 들어옴을 유의.. */
              onClick={function(id, e){
                e.preventDefault();
                this.props.onChangePage(id/* e.target.dataset.id */);
              }.bind(this,data[i].id)}
              >{data[i].title}</a>
          </li>); 
        i +=  1;
      }
      return(
        <nav>
          <ul>
              {lists}
          </ul>
        </nav>      
      );
    }
  }

  /** TOC 클래스를 가져다 쓸 수 있게 함 
   * 즉, 클래스를 외부에서 사용할 수 있도록 함 */
  export default TOC;

