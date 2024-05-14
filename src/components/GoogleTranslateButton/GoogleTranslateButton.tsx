'use client'

import { useEffect } from "react";
import "./GoogleTranslateButton.scss";

const GoogleTranslateButton = () => {
  
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "sv",
  //       autoDisplay: true
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  return (
    <>
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslateButton;
