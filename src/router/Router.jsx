// src/router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import HomePage from "../Pages/HomePage";
import ServicesPage from "../Pages/ServicesPage";
import ServiceDetailPage from "../Pages/ServiceDetailPage";
import AboutPage from "../Pages/AboutPage";
import ContactsPage from "../Pages/ContactsPage";
import NotFoundPage from "../Pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "service/:serviceId",
        element: <ServiceDetailPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);