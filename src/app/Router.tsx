import { FavoritesPage } from "@pages/favorites";
import { FeedPage } from "@pages/feed";
import { HomePage } from "@pages/home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>
  );
};
