import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Header from './Header/Header';
import History from './History/History';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Products from './Products/Products';
import Users from './Users/Users';
import Login from './Login/Login';
import NewProduct from './New/NewProduct';
import { AuthContextProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProduct from './UpdateProduct/UpdateProduct';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
          >
            <Header />

            <Menu />

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/chat"
                element={<Chat />}
              />
              <Route
                path="/users"
                element={<Users />}
              />
              <Route
                path="/products"
                element={<Products />}
              />
              <Route
                path="/history"
                element={<History />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/new"
                element={<NewProduct />}
              />
              <Route
                path="/updateproduct/:productId"
                element={<UpdateProduct />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
        />
      </AuthContextProvider>
    </div>
  );
}

export default App;
