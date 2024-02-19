import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import { Landing } from "./components/Landing/";
import { GroupDetailsPage } from "./components/Groups";
import { GroupsListPage } from "./components/Groups";
import { GroupForm } from "./components/Groups";
import { EventDetailsPage } from "./components/Events";
import { EventsListPage } from "./components/Events";
import { EventForm } from "./components/Events";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  // const router = {
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Landing />} />
  //       <Route path="/groups" element={<GroupsListPage />} />
  //       <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
  //       <Route path="/groups/new" element={<GroupForm />} />
  //       <Route path="/events" element={<EventsListPage />} />
  //       <Route path="/events/:eventId" element={<EventDetailsPage />} />
  //       <Route path="/events/new" element={<EventForm />} />
  //     </Routes>
  //   </BrowserRouter>
  // };

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
      {
        path: "/groups",
        element: <GroupsListPage />,
      },
      { path: "/groups/:groupId", element: <GroupDetailsPage /> },
      { path: "/groups/new", element: <GroupForm /> },
      { path: "/events", element: <EventsListPage /> },
      { path: "/events/:eventId", element: <EventDetailsPage /> },
      { path: "/events/new", element: <EventForm /> },
    ],
  },
  ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
