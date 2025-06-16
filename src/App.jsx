import { useEffect, useState } from "react";

const Card = ({ title }) => {
  const [count, setCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false);
  // useEffect runs twice when the component mounts
  useEffect(() => {
    console.log(`${title} has been Liked: ${hasLiked}`);
  },[hasLiked]);

  return (
    <div className="card" onClick={()=> setCount(count +1)}>
      <h2> {title} <br/> {count}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ?  "❤️" : "🤍"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card title="Movie0" />
      <Card title="Movie1" />
      <Card title="Movie2" />
    </div>
  );
};

export default App;
