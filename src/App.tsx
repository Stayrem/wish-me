import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './layout/Header';
import css from './styles.module.css';
import { Home } from './pages/Home';
import { WishList } from './pages/WishList';

function App() {
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
      {
          path: '/wishlist/:id',
          element: <WishList />,
      },
  ]);
  return (
    <div className={css.app}>
      <Header />
      <div className={css.wrapper}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
