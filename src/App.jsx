import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import RoutesConfig from "./routes/RoutesConfig";

function App() {
  return (
    <>
      <Header />
      <RoutesConfig />
      <Footer />

      {/* React toast container */}
      <ToastContainer />
    </>
  )
}

export default App
