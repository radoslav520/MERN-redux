import React from "react";

export default function ErrorPage() {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>We're unable to find that page.</p>
        <p>You probably typed wrong date formar</p>
        <p>Please use format (yyy-mm-dd)</p>
      </div>
    </div>
  );
}
