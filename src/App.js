import "./App.css";
import Header from "./components/Header";
import MainViewComponent from "./components/MainView";
function App() {
  return (
    <div className="bg-[#ede1d7] h-full">
      <Header />
      <div>
        <MainViewComponent />
      </div>
    </div>
  );
}

export default App;
