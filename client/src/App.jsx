import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Members from './components/Members'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Browse from './components/Browse'
import Profile from './components/Profile'
import { ToastContainer } from 'react-bootstrap'
import { Toaster, toast } from 'sonner'
import Wishlist from './components/Wishlist'
import MemberDescription2 from './components/MemberDescription2'

  
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: "/members",
    element: <Members/>
  },
  {
    path: "/description/:id",
    element: <MemberDescription2/>
  },
  {
    path: "/browse",
    element: <Browse/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path:"/wishlist",
    element: <Wishlist/>
  }

])
function App() {

  return (
    <div>
    <RouterProvider router={appRouter} />
  </div>
    
  );
}

export default App
