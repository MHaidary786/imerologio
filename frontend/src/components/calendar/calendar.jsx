import React, { useState , useRef, useContext } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import "./calendar.css"
import { useNavigate } from "react-router-dom";
import { ParamContext } from "../ParamContext";
import Navbar from "../navbar/navbar";

const OurCalendar = () => {
  const [date, setDate] = useState(new Date()); // current date
  const calendarRef = useRef(null);
  const scrollThreshold = 100;
  const navigate = useNavigate();
  const {setParam} = useContext(ParamContext);

  const handleScroll = (event) => {
    const calendarContainer = calendarRef.current;
    if (calendarContainer) {
      if (event.deltaY < 0) {
        // if we scroll up
        const monthsToSubtract = Math.abs(event.deltaY) / scrollThreshold;
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth() - monthsToSubtract,
          1
        );
        setDate(newDate);
      } else {
        // if we scroll down
        const monthsToAdd = Math.ceil(Math.abs(event.deltaY) / scrollThreshold);
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth() + monthsToAdd,
          1
        );
        setDate(newDate);
      }
    }
  };

  const tileClassName = ({ date: tileDate, view }) => {
    if (view === "month") {
      if (tileDate.getMonth() !== date.getMonth() || tileDate.getFullYear() !== date.getFullYear()) {
        return "different-month";
      }
    }
    return null;
  };

  const handleClick = (tileDate) => {
    console.log("Tile clicked:", tileDate.getMonth()+1, tileDate.getDate(), tileDate.getFullYear(), tileDate);
    setParam(tileDate)
    navigate("/journals")
  };

  const tileContent = ({ date: tileDate, view }) => {
    const today = new Date();
    const isCurrentDay = tileDate.getDate() === today.getDate() && tileDate.getMonth() === today.getMonth() && tileDate.getFullYear() === today.getFullYear();
    const isDifferentMonth = tileDate.getMonth() !== date.getMonth() || tileDate.getFullYear() !== date.getFullYear();
    
    if (view === "month") {
      if (isDifferentMonth) {
        return <div className="empty-tile"></div>;
      } else if (isCurrentDay) {
        return <div className="current-day-marker"></div>;
      }
    }
    return null;
  };

  const onClickDay = (value, event) => {
    const tileDate = value;
    if (tileDate.getMonth() === date.getMonth() && tileDate.getFullYear() === date.getFullYear()) {
      handleClick(tileDate);
    }
  };

  return (
    <>
    <Navbar/>
       <div className="calendar-container">
      <div className="react-calendar__navigation__label">
        <span className="react-calendar__navigation__label__labelText">
          {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
        </span>
      </div>
      <div className="react-calendar" ref={calendarRef} onWheel={handleScroll}>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
          tileContent={tileContent}
          onClickDay={onClickDay}
        />
      </div>
    </div></>
 
  );
};

export default OurCalendar;
