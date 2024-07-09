import React, { useEffect, useState, useContext } from "react";
import classes from "./journals.module.css";
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import {
  IoIosHeart,
  IoIosPricetag,
  IoIosTrash,
  IoIosAdd,
} from "react-icons/io";
import { MdSort } from "react-icons/md";
import Navbar from "../navbar/navbar";
import { ParamContext } from "../ParamContext";

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { param, updateParam } = useContext(ParamContext);
  const [localParam, setLocalParam] = useState(param);

  useEffect(() => {
    getAllJournals(localParam);
  }, [localParam]);

  const getAllJournals = async (localParam) => {
    console.log ("this is my localparam: ", localParam)
    try {
      await axios
        .get("http://localhost:8080/journal/", {
          headers: { "x-auth-token": `${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (!localParam){
            setJournals(res.data);
          } else {            
            setJournals(res.data.filter(journal => {let convertJournalDate = new Date(journal.date);
              return convertJournalDate.toDateString() === localParam.toDateString();
            }));
          }      
        });
    } catch (error) {
      console.log(error);
    }
  };


  const DeleteJournal = async (_id) => {
    try {
      await axios
        .delete(`http://localhost:8080/journal/delete/${_id}`, {
          headers: { "x-auth-token": `${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setJournals(journals.filter((journal) => journal._id !== _id));
        });
        setLocalParam(null);
    } catch (error) {
      console.log(error);
    }
  };

  const AddJournal = () => {
    navigate("/newjournal");
  };

  const EditJournal = (_id) => {};

  const SortJournals = () => {
    setJournals(
      [...journals].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };


  //
  const reloadPage = () => { 
    updateParam(null); 
    setLocalParam(null); 
    navigate("/journals", { replace: true }); 
  };

  useEffect(() => { 
    if (location.pathname === "/journals") {
    }
  }, [location.pathname]);

  return (
    <div className={classes.container}>
      <Navbar isEditor={false} reloadPage={reloadPage}/>
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
                  onClick={() => navigate(`/editor/${journal._id}`)}
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
                    <img src={journal.photoUrl} alt="Journal pic" />
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
    </div>
  );
}
