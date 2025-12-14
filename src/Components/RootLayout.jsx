// src/Components/RootLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./ScrollToTopButton";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Outlet />
    </>
  );
}

export default RootLayout;