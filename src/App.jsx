import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import './App.css'
import SearchBox from "./components/searchbox"
import RootLayout from './layout/RootLayout'
import MovieDetail from "./components/moviedetail"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<SearchBox />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
      </Route>
    ),
    { basename:import.meta.env.BASE_URL }
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App
