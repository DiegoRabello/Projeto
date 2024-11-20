import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/header";
import { Home } from "./pages/home/Home";
import { Favoritos } from "./pages/favoritos/Favoritos";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/favoritos" 
            element={
                <Favoritos />
              // <PrivateRoute>
              // </PrivateRoute>
            } 
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
