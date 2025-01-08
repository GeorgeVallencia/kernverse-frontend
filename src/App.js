import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
// import Posts from "./components/Posts";
import { UserContextProvider } from "./context/UserContext";
import PostsPage from "./pages/PostsPage";
import PaymentsPage from "./pages/PaymentsPage";
import LandingPage from "./pages/LandingPage";
import PublishPage from "./pages/PublishPage";
import ProfilePage from "./pages/ProfilePage";
import CommentsPage from "./pages/CommentsPage";
import ClapPage from "./pages/ClapPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/posts',
        element: <PostsPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/create',
        element: <PostsPage />
      },
      {
        path: '/subscribe',
        element: <PaymentsPage />
      },
      {
        path: '/published-posts',
        element: <PublishPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/comments',
        element: <CommentsPage />
      },
      {
        path: '/claps',
        element: <ClapPage />
      },
    ]
  }
]);

function App() {
  return(
    <UserContextProvider>
      <RouterProvider router={router}>
        <NavBar />
        <LandingPage />
      </RouterProvider>
    </UserContextProvider>
  );
}

export default App;