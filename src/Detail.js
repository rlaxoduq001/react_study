/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss'


// styled components 만드는법
const DivBox = styled.div`
  padding : 20px;
`;

const TitleBox = styled.h4`
  font-size : 25px;
  color : ${ props => props.color }
`;


// class 함수 생명주기
// componentDidMount() : 렌더링될때
// componetWillUnmount() : 사라질때
// 신문법은 useEffect()


function Detail(props) {


  const [alertTime, setalertTime] = useState(true);
  const [inputData, setinputData] = useState('');
  // 라이플사이클 훅
  // useEffect : 컴포넌트가 연결될때, update될때
  useEffect(() => {

    let timer = setTimeout(()=>{
      setalertTime(false);
    },2000);
    
    // 컴포넌트가 사라질때
    return () => {
      // 디테일 컴포넌트가 사라질때 실행
      clearTimeout(timer);
    } 

  // 업데이트 될때도 실행되는데 막는법 [] <= 실행조건 (alertTime 스테이트가 변경이 될때만)
  // [] 빈값일경우? detail 컴포넌트가 업데이트 될때 실행이 안됨
  }, [alertTime]);

  // 실행할 코드가 많을때 useEffect 많이 사용 (순서대로 실행됨)
  // useEffect(() => {})
  // useEffect(() => {})


  // useParams 라우터 훅 파라미터 넘길때
  let { id } = useParams();
  
  // props의 인덱스, 데이터에 있는 id와 비교하여 같을경우을 반환
  let findShose = props.shoes.find( shose => {
    return id == shose.id
  })

  let history = useHistory();

  return (
    <div className="container">

      
      <DivBox>
        <TitleBox className="blue">제목</TitleBox>
      {/* styled-components
        <TitleBox color={'red'}>제목</TitleBox> */}
      </DivBox>

      {inputData}
      <input onChange={e => {setinputData(e.target.value)}}/>

      {
        alertTime == true ? 
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      : 
        null
      }
      
      {/* <div className="my-alert-blue">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div> */}

      <div className="row">
        <div className="col-md-6">
          <img src={findShose.img} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findShose.title}</h4>
          <p>{findShose.content}</p>
          <p>{findShose.price}</p>
          <button className="btn btn-danger">주문하기</button> 
          <button className="btn btn-danger" onClick={ () => { 
            history.goBack(); 
            // history.push('/asd')   <== 원하는 url로 이동
            }}>뒤로가기</button> 
        </div>
      </div>
  </div> 
  )
}

export default Detail;