import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React, { Component, useEffect, useState } from "react";

class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "内容",
    };
  }
  clickEvent(e) {
    console.log(e.target.dataset.index);
    this.setState({
      content: `内容${e.target.dataset.index}`,
    });
  }

  render() {
    return (
      <div>
        <button data-index="1" onClick={this.clickEvent.bind(this)}>
          内容1
        </button>
        <button data-index="2" onClick={this.clickEvent.bind(this)}>
          内容2
        </button>
        <div>{this.state.content}</div>
      </div>
    );
  }
}

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      msg: "父组件默认数据",
    };
  }
  switch = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
    console.log(this.state.isActive);
  };
  changeMessage = (data) => {
    this.setState({
      msg: data,
    });
  };
  render() {
    const { isActive, msg } = this.state;
    return (
      <div>
        <div>父组件</div>
        <button onClick={this.switch}>控制</button>
        <World
          none={isActive}
          msg={msg}
          toSwitch={this.switch}
          changeMessage={this.changeMessage}
        />
      </div>
    );
  }
}

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "子组件修改的数据",
    };
  }
  childChange = () => {
    this.props.changeMessage(this.state.msg);
  };
  render() {
    const { none, toSwitch, msg } = this.props;
    return none ? (
      <div className={none ? "active" : ""}>
        <div>子组件 active{msg}</div>
        <button onClick={toSwitch}>切换</button>
        <button onClick={this.childChange}>传递</button>
      </div>
    ) : (
      <div>
        <div>子组件none {msg}</div>
        <button onClick={toSwitch}>切换</button>
        <button onClick={this.childChange}>传递</button>
      </div>
    );
  }
}

class Parent extends Component {
  constructor(props) {
    super(props);
  }
  parentEvent = (e) => {
    console.log(e);
  };
  render() {
    return (
      <div>
        <button
          onClick={(e) => this.parentEvent("hello world")}
          className="child"
        >
          提交
        </button>
      </div>
    );
  }
}

function UserGreet(props) {
  return <h1>欢迎</h1>;
}
function UserLogin(props) {
  return <h1>请先登录</h1>;
}

class Judge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  toLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };
  render() {
    return (
      <div>
        <div>{this.state.isLogin ? <UserGreet /> : <UserLogin />}</div>
        <button onClick={this.toLogin}>登录</button>
      </div>
    );
  }
}

function ListItem(props) {
  const [hitoko, changeHitoko] = useState(null);
  console.log(1);
  useEffect(() => {
    fetch("https://international.v1.hitokoto.cn/")
      .then((res) => res.json())
      .then((data) => {
        changeHitoko(data.hitokoto);
      });
  }, []);
  return (
    <div>
      <div>
        传来的数据:
        {hitoko}
      </div>
    </div> 
  );
}

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ListItem />
      </div>
    );
  }
}

ReactDOM.render(<ListItem />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
