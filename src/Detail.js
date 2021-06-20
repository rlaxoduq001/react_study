/* eslint-disable */

import React, { useState } from 'react';
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

function Detail(props) {

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

      <div className="my-alert">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>

      <div className="my-alert-blue">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>

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