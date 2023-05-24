import React from 'react';

// props가 아닌 memo(메모이제이션 기법)를 통해 값 받음
// props 변화에만 영향 줌
// props가 이전과 동일값이면 재렌더링 X 
// props가 이전과 다른값이면 재렌더링 O
const Counter = React.memo(({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
});

export default Counter;
