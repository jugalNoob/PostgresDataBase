import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dash from './page/Dash';
import Form from './page/Form';
import Home from './page/Home';
import Login from './page/Login';
import Nav from './page/Nav';
// mankia@gmail.com
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Nav />, // Nav wraps around pages
    // errorElement: <Error />,
    children: [
  {
    path: "/", 
    element: <Home />
  },
  {
    path: "/form", 
    element: <Form />
  },
  {
    path: "/login", 
    element: <Login />

  },

  {
    path: "/dash", 
    element: <Dash />
  }

]
}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;