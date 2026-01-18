import { BrowserRouter, Route, Routes } from "react-router-dom"
import TodoListPage from "./pages/todo-list-page/TodoListPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
