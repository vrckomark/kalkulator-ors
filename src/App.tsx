import CalculatorKeypad from "./components/CalculatorKeypad";
import ModeSelector from "./components/ModeSelector";
import ResultScreen from "./components/ResultScreen";
import ModeContext from "./contexts/ModeContext";

function App() {
  return (
    <div className="bg-background flex flex-col w-screen h-screen pb-16  p-2 sm:p-4 lg:p-6 xl:p-8">
      <ModeContext>
        <div className="flex w-full h-1/3">
          <div className="h-full">
            <ModeSelector />
          </div>

          <ResultScreen />
        </div>
        <CalculatorKeypad />
      </ModeContext>
    </div>
  );
}

export default App;
