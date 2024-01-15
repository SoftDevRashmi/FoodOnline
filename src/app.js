import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Grocery from "./components/grocery";

/*const LazyGrocery = lazy(() => {
  import("./components/grocery");
});*/ //so took lot time to solve the error due to this code error was throwing something went wrong
//In this approach, the curly braces {} create a block
//statement. Without an explicit return statement, the function
// implicitly returns undefined. This can lead to unexpected behavior
// when using React.lazy, which expects a function that returns a promise.

const LazyGrocery = lazy(() => import("./components/grocery"));

//this works fine as there is no {} so no need of return too

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading Grocery...</h1>}>
            <LazyGrocery />
          </Suspense>
        ),
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
