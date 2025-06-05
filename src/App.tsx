import Header from "./components/Header";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
