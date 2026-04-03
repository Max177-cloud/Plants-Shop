import React from "react";
import { Link } from "react-router-dom";

export default function CabinetPage() {
  return (
    <>
      <h1 className="cabinet_title">Добро пожаловать!</h1>
      <Link className="back_home" to="/">
        <img
          src="/images/png-transparent-encapsulated-postscript-computer-icons-logo-back-button-miscellaneous-angle-triangle.png"
          alt="Назад"
        />
      </Link>
    </>
  );
}

