import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/Main"
import Article from "./pages/Article"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
