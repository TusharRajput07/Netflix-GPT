import { Provider } from "react-redux";
import Body from "./components/Body";
import reduxStore from "./utils/reduxStore";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Body />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
