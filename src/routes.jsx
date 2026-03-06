import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Search from "./pages/Search"
import Main from "./pages/Main"
import Post from "./pages/Post"
import NotFound from "./pages/NotFound"

import Dashboard from "./pages/Dashboard"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Post/:idPost" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/:word_search" element={<Search />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
