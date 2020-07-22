import React, { Component, useEffect, useState } from "react";
import Header from "../Components/Header";
import Main from "../Components/Main";
import Footer from "../Components/Footer";

function LandingPage({ match }) {
  return (
    <div className="page-wrap">
      <Header match={match} />
      <Main match={match} />
      <Footer />
    </div>
  );
}

export default LandingPage;
