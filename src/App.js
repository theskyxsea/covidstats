import "./App.css";
import Index from "./component/Index";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function App() {
  return (
    <div className='App'>
      <Index />
    </div>
  );
}

export default App;
