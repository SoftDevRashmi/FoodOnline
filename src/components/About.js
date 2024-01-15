import UserClassComponent from "../components/UserClassComponent";
import UserComponent from "./UserComponent";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Hi!...This is about page</p>
      <UserClassComponent name={"Rashi (Class)"} location={"Hyderabad"} />
      <UserComponent name={"Rashmi (Function)"} Location={"Banglore"} />
    </div>
  );
};

export default About;
