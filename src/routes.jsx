import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Search from "./pages/Search"
import Main from "./pages/Main"
import Article from "./pages/Article"
import NotFound from "./pages/NotFound"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
