import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import OurCalendar from "./components/calendar/calendar";
import Journals from "./components/journals/journals";
import ChangePassword from "./components/changePassword/changePassword";
import ChangeName from "./components/changeName/changeName";
import NewJournal from "./components/newJournal/newJournal";
import EditJournal from "./components/editJournal/editJournal";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      {/* pass true to isEditor and the other Navbar will appear */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/journals" element={<Journals />} />

        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/changeName" element={<ChangeName />} />
        <Route path="/newJournal" element={<NewJournal />} />

        <Route path="/calendar" element={<OurCalendar />} />
        <Route path="/editor/:journalId" element={<EditJournal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
