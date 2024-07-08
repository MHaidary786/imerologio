import React, { useState, useEffect, useRef } from "react";
import classes from "./NewJournal.module.css";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
import logo from "../../assets/imerologio-logo.png";
import axios from "axios";

import DatePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Navbar from "../navbar/navbar";

export default function NewJournal() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");

  const [tagValue, setTagValue] = useState("");
  const [tag, setTag] = useState([]);
  const [tagsPopup, setTagsPopup] = useState(false);

  const [emotion, setEmotion] = useState("");

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      setTag([...tag, tagValue]);
      setTagValue("");
    }
  };

  const deleteTag = (value) => {
    let remainingTags = tag.filter((t) => t !== value);
    setTag(remainingTags);
  };

  const togglePopup = () => {
    setTagsPopup(!tagsPopup);
  };

  const handleChange = (date) => {
    setDate(date);
    // Do something with the selected date
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const countWords = () => {
    const words = text.trim().split(/\s+/).length;
    return words;
  };

  const countCharacters = () => {
    const characters = text.replace(/\s/g, "").length;
    return characters;
  };

  const handleAddJournal = () => {
    if (text && tag && date && emotion && photoUrl) {
      try {
        const newJournal = {
          text: text,
          date: date,
          emotion: emotion,
          tag: tag,
          photoUrl: photoUrl,
        };
        axios
          .post("http://localhost:8080/journal/create", newJournal, {
            headers: { "x-auth-token": `${localStorage.getItem("token")}` },
          })
          .then((res) => {
            navigate("/journals");
          });
      } catch (error) {
        console.log(error);
      }

      
    } else {
      console.log("Please fill all inputs");
    }
  };

  return (
    <div className={classes.journalContainer}>
      <Navbar isEditor={true}></Navbar>
      <div className={classes.row1}>
        <DatePicker
          className={classes.datePicker}
          format="y-MM-dd h:mm a"
          onChange={handleChange}
          value={date}
          locale="ge-GE"
        />

        <Link onClick={handleAddJournal} className={classes.saveLabel}>
          Save! <FiSave className={classes.saveIcon} />
        </Link>
      </div>

      <div className={classes.noteContainer}>
        <div className={classes.noteWrapper}>
          <textarea
            ref={textAreaRef}
            placeholder="Write Something ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="note"
            id="note"
          />
        </div>
      </div>

      <footer className={classes.journalFooter}>
        <div>
          <input
            type="text"
            className={classes.photoUrlInput}
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
          />
          <input
            type="text"
            className={classes.emotionInput}
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div>
          <FaTags className={classes.tagsBtn} onClick={togglePopup} />
        </div>
        <div>
          {countWords()} Words, {countCharacters()} Characters
        </div>
      </footer>

      <div
        className={
          tagsPopup ? classes.tagsContainer : classes.hideTagsContainer
        }
      >
        <div className={classes.tagContents}>
          <div className={classes.closeParent}>
            <IoClose onClick={togglePopup} className={classes.closeBtn} />
          </div>
          <div className={classes.tagInput}>
            {tag.map((item, index) => {
              return (
                <button onClick={() => deleteTag(item)} key={index}>
                  {item}
                  <IoClose className={classes.deleteTag} />
                </button>
              );
            })}
            <input
              type="text"
              value={tagValue}
              placeholder="type and enter"
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
