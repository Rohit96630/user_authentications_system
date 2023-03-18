import "./App.css";
import SignUpPAge from "./Components/Validation/SignUpPAge";
import SignInPage from "./Components/Validation/SignInPage";
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import AddUsers from "./Components/home/AddUsers";
import EditUser from "./Components/home/EditUser";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUpPAge />} />

          <Route path="/login" element={<SignInPage />} />

          <Route path="/home" element={<Home />} />
          <Route path="/adduser" element={<AddUsers />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* // <SignUpPAge /> */}
      {/* <SignInPage /> */}
    </>
  );
}

export default App;
