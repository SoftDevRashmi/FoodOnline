export default function UserComponent(props) {
  return (
    <div>
      <h1>Welcome to function component</h1>
      <p>Name:{props.name} </p>
      <p>Location: {props.Location}</p>
    </div>
  );
}
