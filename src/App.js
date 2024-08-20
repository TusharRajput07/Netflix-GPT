import { Provider } from "react-redux";
import Body from "./components/Body";
import reduxStore from "./utils/reduxStore";

const App = () => {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Body />
      </div>
    </Provider>
  );
};

export default App;
