function ObjectTest1 () {
    const num = 100;
    let status = 'shipping';
    return (
        <div>
            <p>{num}</p>
            <p>
            {
                {
                info: <p>상품정보</p>,
                shipping: <p>배송관련</p>,
                refund: <p>환불관련</p> 
                }[status]
            }
            </p>
        </div>
    );

}

export default ObjectTest1;