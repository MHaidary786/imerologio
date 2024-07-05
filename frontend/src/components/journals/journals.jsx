import React, { useEffect, useState } from "react";
import classes from "./journals.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IoIosHeart,
  IoIosPricetag,
  IoIosTrash,
  IoIosAdd,
} from "react-icons/io";
import { MdSort } from "react-icons/md";

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllJournals();
  }, []);

  const getAllJournals = async () => {
    try {
      await axios.get("http://localhost:8080/journal").then((res) => {
        console.log(res.data);
        setJournals(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteJournal = async (_id) => {
    try {
      await axios
        .delete(`http://localhost:8080/journal/delete/${_id}`)
        .then((res) => {
          setJournals(journals.filter((journal) => journal._id !== _id));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddJournal = () => {
    navigate("/");
  };

  const EditJournal = (_id) => {
    navigate("/");
  };

  const SortJournals = () => {
    setJournals(
      [...journals].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h2>Your Journals</h2>
        </div>
        <div className={classes.topLineWrapper}>
          <button type="button" onClick={AddJournal}>
            {" "}
            <IoIosAdd className={classes.AddIcon} />
            New
          </button>
          <div>
            <MdSort className={classes.SortIcon} onClick={SortJournals} />
          </div>
        </div>
        <div className={classes.JournalWrapper}>
          {journals.map((journal) => (
            <div className={classes.journalCard} key={journal._id}>
              <div
                className={classes.leftSide}
                onClick={() => EditJournal(journal._id)}
              >
                <h4>
                  <span>{journal.text.substring(0, 35)}</span>
                  <span>{journal.text.length > 35 ? "..." : ""}</span>
                </h4>
                <p>
                  <IoIosHeart className={classes.Icon} />
                  <span>{journal.emotion}</span>
                  <IoIosPricetag
                    className={`${classes.Icon} ${classes.marginLeft}`}
                  />
                  {journal.tag.map((tag, index) => (
                    <span key={index} className={classes.tag}>
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
              <div className={classes.rightSide}>
                <div className={classes.imageMask}>
                  <img src={journal.photoUrl} alt="Jounal pic" />
                </div>
                <IoIosTrash
                  className={classes.DeleteIcon}
                  onClick={() => DeleteJournal(journal._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}