import React, {Component} from 'react';

class UpdateContent extends Component{
  constructor(props){
    super(props);
    this.state={
      id: this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }//end constructor

  inputFormHandler(e){
    /* 자바스크립트 최신기능 e.target.name :현재 이벤트가 발생하고있는 태그의 이름을 알아냄 */
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    console.log(this.props.data);
    console.log('UpdateContent RENDER');
      return(
        <article>
            <h2>Update</h2>
            <form action="/create_process" method="post"
              onSubmit={function(e){
                e.preventDefault();
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc
                );
              }.bind(this)}
            >
                <input type="hidden" name="id" value={this.state.id}></input>
                <p>
                  <input 
                  type="text" 
                  name="title" 
                  placeholder="title" 
                  value={this.state.title}
                  /* state값 변경되어야 readonly가 아니게됨 따라서 onChange사용
                     onchange안쓰면 input의 내용이 변경되지 못하게 막혀있음 */
                  onChange={this.inputFormHandler}
                  ></input>
                </p>
                <p>
                  <textarea 
                    onChange={this.inputFormHandler}
                    name="desc" 
                    placeholder="description"
                    value={this.state.desc}
                    ></textarea>
                </p>
                <p>
                  <input type="submit"></input>
                </p>
            </form>
        </article>      
      );
    }
  }

  export default UpdateContent;