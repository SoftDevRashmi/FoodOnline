import React from "react";
class UserClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 2,
    };
  }
  render() {
    //can destructure or use directly
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h1>Welcome to Class Component</h1>
        <h2>count:{count}</h2>
        <p>Name: {this.props.name}</p>
        <p>Location:{this.props.location}</p>

        <h2>count2:{this.state.count2}</h2>
      </div>
    );
  }
}
export default UserClassComponent;
