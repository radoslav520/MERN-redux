import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import iconPlus from "../Assets/icons/icon-plus.svg";

import iconCalendar from "../Assets/icons/icon-calendar.svg";
import { Redirect } from "react-router-dom";

import Modal from "./Modal";
import { postDate, getOneDate, getRandomQuote } from "../actions/index";

function Header({ match, tasks }) {
  const dateNow = new Date().toLocaleDateString();
  const dispatch = useDispatch();

  const quotes = useSelector((state) => state.quote.data);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(dateNow);
  const [err, setErr] = useState(false);

  let mm = parseInt(dateNow.substring(0, dateNow.indexOf("/")));
  let dd = parseInt(
    dateNow.substring(dateNow.indexOf("/") + 1, dateNow.lastIndexOf("/"))
  );
  let yyyy = parseInt(dateNow.substring(dateNow.lastIndexOf("/") + 1));
  const fd = `${mm}-${dd}-${yyyy}`;

  useEffect(() => {
    dispatch(getRandomQuote(quotes));
    if (match.params.date) {
      const date1 = new Date(match.params.date).toLocaleDateString(); //kad unesem parametar gore tipa 1-1-2001

      if (date1 === "Invalid Date") {
        setErr(true);
      } else {
        let mm = parseInt(date1.substring(0, date1.indexOf("/")));
        let dd = parseInt(
          date1.substring(date1.indexOf("/") + 1, date1.lastIndexOf("/"))
        );
        let yyyy = parseInt(date1.substring(date1.lastIndexOf("/") + 1));

        const formatDate = `${mm}-${dd}-${yyyy}`;

        dispatch(postDate(formatDate));
        dispatch(getOneDate(formatDate));

        setDate(date1);
      }
    } else {
      dispatch(postDate(fd));
      dispatch(getOneDate(fd));
    }
  }, []);

  const showModal = (e) => {
    setShow(true);
    e.preventDefault();
  };

  const hideModal = () => {
    setShow(false);
    // e.preventDefault();
  };

  const randomQuote = useSelector((state) => state.quote.randomQuote);

  if (err) {
    return <Redirect to="/err/err" />;
  }

  return (
    <div className="header">
      <div className="wrap">
        <button className="btn-icon" onClick={showModal}>
          <img className="icon icon-pluse" src={iconPlus} alt="add new item" />
        </button>
        <div className="header-blockquote">
          <h1 className="header-quote">{randomQuote.quote}</h1>
          <div className="header-cite">{randomQuote.author}</div>
        </div>
      </div>
      <div className="header-inner">
        <div className="wrap">

          <div className="date-wrap">
            <img className="icon" src={iconCalendar} alt="Calendar" />
            <time>{date}</time>
          </div>
        </div>
      </div>

      <Modal show={show} hideModal={hideModal} match={match} tasks={tasks} />
    </div>
  );
}

export default Header;
