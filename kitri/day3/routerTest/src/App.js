import React from 'react';
import {Route, Link,Switch} from 'react-router-dom';

// 사용자 정의
import Home from './Home';
import About from './About';
import Profiles from './Profiles';
import Board from './Board';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div><br/>
      <Link to="/">홈</Link> | <Link to="/profiles">프로필</Link> | 
      <Link to="/about">소개</Link> | <Link to="/board">게시판</Link> | 
      <Link to="/history">기록</Link><br/><br/><hr/>
     
     
      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/profiles" component={Profiles} />
        <Route path="/about" component={About} />
        <Route path="/board" component={Board} />
        <Route path="/history" component={HistorySample} />
      </Switch>
    </div>
  );
};

export default App;
