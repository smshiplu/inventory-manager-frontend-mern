import { AllRoutes } from "./routes";
import { Header, Footer } from "./components";
import { useCheckLogin } from './hooks/useCheckLogin';

import './App.css';

function App() {
  useCheckLogin();
  return (
   <>
      <Header/>
      <AllRoutes />
      <Footer />
   </>
  );
}

export default App;
