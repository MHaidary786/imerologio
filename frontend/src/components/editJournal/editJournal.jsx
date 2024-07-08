import React, { useState, useEffect, useRef } from "react";
import classes from "./EditJournal.module.css";
import { FaTags } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaAngry, FaRegSurprise } from "react-icons/fa";
import { RiEmotionSadLine, RiEmotionHappyLine } from "react-icons/ri"; // Import emoji icons

import axios from "axios";
import Navbar from "../navbar/navbar";
import DatePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function EditJournal() {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const textAreaRef = useRef(null);

  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [tagValue, setTagValue] = useState("");
  const [tag, setTag] = useState([]);
  const [tagsPopup, setTagsPopup] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const emotions = [
    { label: "Happy", icon: <RiEmotionHappyLine /> },
    { label: "Sad", icon: <RiEmotionSadLine /> },
    { label: "Love", icon: <IoIosHeart /> },
    { label: "Angry", icon: <FaAngry /> },
    { label: "Surprised", icon: <FaRegSurprise /> },
    // Add more emotions as needed
  ];


  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }

    const fetchJournal = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/journal/edit/${journalId}`,
          {
            headers: { "x-auth-token": `${localStorage.getItem("token")}` },
          }
        );
        const journal = res.data[0];
        setText(journal.text);
        setTag(journal.tag);
        setEmotion(journal.emotion);
        setPhotoUrl(journal.photoUrl);
        setDate(new Date(journal.date));
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchJournal();
  }, [journalId]);

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      setTag((prevTags) => [...prevTags, tagValue]);
      setTagValue("");
    }
  };

  const deleteTag = (value) => {
    setTag((prevTags) => prevTags.filter((t) => t !== value));
  };

  const togglePopup = () => {
    setTagsPopup(!tagsPopup);
  };

  const countWords = () => {
    return text.trim().split(/\s+/).length;
  };

  const countCharacters = () => {
    return text.replace(/\s/g, "").length;
  };

  const handleEditJournal = async () => {
    if (text && tag && date && emotion && photoUrl) {
      const updatedJournal = {
        text,
        date,
        emotion,
        tag,
        photoUrl,
      };

      try {
        await axios.put(
          `http://localhost:8080/journal/update/${journalId}`,
          updatedJournal,
          {
            headers: { "x-auth-token": `${localStorage.getItem("token")}` },
          }
        );
        navigate(`/journals/`); // Redirect to the updated journal page or journals list
      } catch (error) {
        console.error("Error updating journal:", error);
      }
    } else {
      console.log("Please fill all inputs");
    }
  };

  return (
    <div className={classes.journalContainer}>
      <Navbar isEditor={true} />
      <div className={classes.row1}>
        <DatePicker
          className={classes.datePicker}
          format="y-MM-dd h:mm a"
          onChange={setDate}
          value={date}
          locale="ge-GE"
        />
        <Link onClick={handleEditJournal} className={classes.saveLabel}>
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
        <Dropdown className={classes.emotionDropDown}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {emotion ? emotion : "Emotion"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {emotions.map((emo) => (
              <Dropdown.Item
                key={emo.label}
                onClick={() => setEmotion(emo.label)}
              >
                {emo.icon} {emo.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <input
          type="text"
          className={classes.photoUrlInput}
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Enter Photo URL"
        />
        <FaTags className={classes.tagsBtn} onClick={togglePopup} />
        {countWords()} Words, {countCharacters()} Characters
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
            {tag.map((item, index) => (
              <button onClick={() => deleteTag(item)} key={index}>
                {item}
                <IoClose className={classes.deleteTag} />
              </button>
            ))}
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
