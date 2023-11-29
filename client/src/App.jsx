import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Toast from "./components/Toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "./context/authContext";
import Accounts from "./pages/Accounts";
import { TransactionProvider } from "./context/transactionContext";
import { useState } from "react";
import Modal from "./components/Modal";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import CheckAdmin from "./pages/CheckAdmin";
import GetParticularAccountDetails from "./pages/GetParticularAccountDetails";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<> This is modalOpen</>);

  return (
    <AuthContextProvider>
      <TransactionProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen ">
            <Header />
            <Toast />
            <Modal
              setModalOpen={setModalOpen}
              showModal={modalOpen}
              children={modalChildren}
            />
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/sign-up"
                element={<SignUp />}
              />
              <Route
                path="/accounts"
                element={
                  <Accounts
                    setModalOpen={setModalOpen}
                    setModalChildren={setModalChildren}
                  />
                }
              />
              <Route
                path="/admin"
                element={<CheckAdmin />}
              >
                <Route
                  index
                  path=""
                  element={<Admin />}
                />
                <Route
                  path=":account_number"
                  element={<GetParticularAccountDetails />}
                />
                <Route
                  path="login"
                  element={<AdminLogin />}
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </TransactionProvider>
    </AuthContextProvider>
  );
}

export default App;
