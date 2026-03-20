import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./components"

import {
  Login,
  Search,
  Main,
  Post,
  NotFound,
  Dashboard,
  CreatePost,
  EditPost,
} from "./pages"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Post/:idPost" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search/:word_search" element={<Search />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-post/:idPost"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
