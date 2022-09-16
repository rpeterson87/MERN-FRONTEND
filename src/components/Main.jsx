import { Routes, Route, Outlet } from "react-router-dom"
import People from "../pages/People"
import Show from "../pages/Show"
const Main = () => {
  const URL = "https://mern-fully-working.herokuapp.com/people/"
  return (
    <main>
        <Outlet/>
      <Routes>
        <Route path="/" element={<People URL={URL}/>} />
        <Route path="/people/:id" element={<Show URL={URL}/>} />
      </Routes>
    </main>
  )
}

export default Main
