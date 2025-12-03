import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game.jsx";
import Popup from "./components/Popup/Popup.jsx";

function App() {
  return (
    <div>
      <Popup />
      <Game />
    </div>
  );
}

export default App;
