import './App.css';
import React from 'react';

import { Routes, Route, Link, useLocation, BrowserRouter} from "react-router-dom";

import UserLogin from './login/login';
import HomeIndex from './home/home';
import { isLogin } from './utils';


// App里面的内容是所有页面都会展示的
function App() {
  // 要在Nagivate,useNagivate都需要在 <Router>里面用
  if (! isLogin()) {
    return (
      <div>
        <UserLogin />
        <Footer />
      </div>
    )
  }

  return (
    <>
      {/*div外的内容是所有组件都会显示的内容*/}
      <BrowserRouter>
        <Header />
        <div id="main">
            <Routes>
              <Route path='/' element={<Hello />} />
              <Route path='/home' element={<HomeIndex />} />
              <Route path='/login' element={<UserLogin />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}



function Header() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/login") {
    return ""
  };

  return (
    <div id="header">
      You are {location.pathname}
    </div>
  )
}


const Footer = () => {
  const start = 2021;
  const ownerShip = "UnknowName"
  const now = new Date().getFullYear();
  return (
    <div id="footer" style={{textAlign: "center"}}>
      {start} - {now} &copy; {ownerShip}
    </div>
  )
}


function NotFound() {
  return (
    <div>
      404 Not Found
    </div>
  )
}


class Debug extends React.Component {
  handClick = (arg, e) => {
    console.log("arg is ", arg);
    console.log("this.e", e);
  }

  render() {
    return (
      <button onClick={this.handClick.bind(this, "name")}>
        Click me
      </button>
    )
  }
}


class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: new Date().toLocaleTimeString(), "other": "value2"};
    this.tick = () => this.setState(
      {name: new Date().toLocaleTimeString(), other: "value5"}
    )
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  render() {
    return (
      <div>
        <Link to="/login">登陆</Link>
        <h1>Name: {this.state.name}, Other: {this.state.other}</h1>
      </div>
    )
  };
};

export default App;
