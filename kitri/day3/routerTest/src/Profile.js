import React from 'react';
import { withRouter } from 'react-router-dom';
import WithRouterSample from './WithRouterSample';

const data = {
  lucky: {
    name: '승부사',
    description: 'Web 개발자가 되기위해 ...'
  },
  gildong: {
    name: '홍길동',
    description: '전래동화 흥부전의 주인공'
  }
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default withRouter(Profile);
