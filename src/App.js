/* eslint-disable */

import './App.css';
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button, Modal } from 'react-bootstrap';
import {useState} from 'react';
import shopData from './data';
import Detail from './Detail'
import axios from 'axios';

// 라우팅
import { Link, Route, Switch } from 'react-router-dom'

function App() {

  const [shoes, setshoes] = useState(shopData);
  const [stock, setstock] = useState([10,11,12]);
  
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">shoes Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>
        {
        /* 라우터 exact : 패스가 딱 맞을때 */
        }
        <Route exact path="/">

          <Jumbotron className="main_background">
            <h1>20% season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">
            <div className="row">
              {
                shoes.map( (shoseInfo,i) => {
                  return (
                    <ShopList shoesData={shoseInfo} key={i}></ShopList>
                  )
                })
              }
            </div>
          </div>
            
          
          <Button className="btn btn-primary" onClick={() => {

            // 로딩중 UI

            axios.get('https://codingapple1.github.io/shop/data2.json')
            // 성공
            .then((result) => {

              // 로딩중 UI 안보이게
              setshoes( [ ...shoes , ...result.data] );
              console.log(setshoes);
            })
            // 실패
            .catch(() => {})

          }}>더보기</Button>


        </Route>
          



        <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} setstock={setstock}></Detail>
        </Route>

        
        {/* /:id 파라미터 */}
        <Route path="/:id">
          <div>아무거나 적었을때</div>
        </Route>
        
      </Switch>




      {/* <Route path="/" component={Modal}></Route> */}

      {/* <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"></img>
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].content} & {shoes[0].price}</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%"></img>
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%"></img>
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
        </div>
      </div> */}

    </div>
  );
}

function ShopList(props) {
 
  return (
  
    <div className="col-md-4">
      <img src={props.shoesData.img} width="100%"></img>
      <h4>{props.shoesData.title}</h4>
      <p>{props.shoesData.price}</p>
    </div>

  )
}

export default App;
