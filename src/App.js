import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";



function App() {
  return (
  // To provide access for the store to the app
  <Provider store={appStore}>
   <Body />
  </Provider>
  );
}

export default App;
