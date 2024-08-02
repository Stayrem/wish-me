import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import css from './styles.module.css';
import { Wishlists} from './pages/Wishlists';
import { WishlistCreate } from './components/WishlistCreate';
import {Menu} from "./layout/Menu";
import {Wishlist} from "./pages/WishList";

function App() {

  return (
    <div className={css.app}>
      <div className={css.wrapper}>
        <BrowserRouter>
          <div className={css.main}>
            <Routes>
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/wishlists/create" element={<WishlistCreate />} />
              <Route path="/wishlist/:id" element={<Wishlist />} />
              <Route path="/wishlists/:id/add" element={<Wishlist />} />
            </Routes>
          </div>
          <Menu />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
