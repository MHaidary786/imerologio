import React, { useState, useEffect, useRef } from "react";
import classes from "./NewJournal.module.css";
import { FaTags } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RiEmotionSadLine, RiEmotionHappyLine } from "react-icons/ri"; // Import emoji icons
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "../navbar/navbar";
import DatePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IoIosHeart } from "react-icons/io";
import { FaAngry, FaRegSurprise } from "react-icons/fa";


export default function NewJournal() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [photoUrl, setPhotoUrl] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tag, setTag] = useState([]);
  const [tagsPopup, setTagsPopup] = useState(false);
  const [emotion, setEmotion] = useState("");

  const emotions = [
    { label: "Happy", icon: <RiEmotionHappyLine /> },
    { label: "Sad", icon: <RiEmotionSadLine /> },
    { label: "Love", icon: <IoIosHeart /> },
    { label: "Angry", icon: <FaAngry /> },
    { label: "Surprised", icon: <FaRegSurprise /> },
    // Add more emotions as needed
  ];

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      setTag([...tag, tagValue]);
      setTagValue("");
    }
  };

  const deleteTag = (value) => {
    setTag(tag.filter((t) => t !== value));
  };

  const togglePopup = () => {
    setTagsPopup(!tagsPopup);
  };

  const handleChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const countWords = () => {
    return text.trim().split(/\s+/).length;
  };

  const countCharacters = () => {
    return text.replace(/\s/g, "").length;
  };


// function DescriptionAlerts() {
//     return (
//       <Stack sx={{ width: '100%' }} spacing={2}>
//         <Alert severity="success">
//           <AlertTitle>Success</AlertTitle>
//           This is a success Alert with an encouraging title.
//         </Alert>
//         <Alert severity="info">
//           <AlertTitle>Info</AlertTitle>
//           This is an info Alert with an informative title.
//         </Alert>
//         <Alert severity="warning">
//           <AlertTitle>Warning</AlertTitle>
//           This is a warning Alert with a cautious title.
//         </Alert>
//         <Alert severity="error">
//           <AlertTitle>Error</AlertTitle>
//           This is an error Alert with a scary title.
//         </Alert>
//       </Stack>
//     );
//   }
  









  // const EmptyAlert = () => {
  //   return (
  //     <Stack sx={{ width: '100%' }} spacing={2}>
  //     <Alert severity="success">
  //       <AlertTitle>Success</AlertTitle>
  //       This is a success Alert with an encouraging title.
  //     </Alert>
  //     <Alert severity="info">
  //       <AlertTitle>Info</AlertTitle>
  //       This is an info Alert with an informative title.
  //     </Alert>
  //     <Alert severity="warning">
  //       <AlertTitle>Warning</AlertTitle>
  //       This is a warning Alert with a cautious title.
  //     </Alert>
  //     <Alert severity="error">
  //       <AlertTitle>Error</AlertTitle>
  //       This is an error Alert with a scary title.
  //     </Alert>
  //   </Stack>
  //   )
  // };

  const handleAddJournal = () => {
    if (text && tag && date && emotion && photoUrl) {
      const newJournal = {
        text,
        date,
        emotion,
        tag,
        photoUrl,
      };

      axios
        .post("https://imerologio.onrender.com/journal/create", newJournal, {
          headers: { "x-auth-token": `${localStorage.getItem("token")}` },
        })
        .then(() => {
          navigate("/journals");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please fill all fields");
    }
  };

  return (
    <div className={classes.journalContainer}>
      <Navbar isEditor={true} />
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
