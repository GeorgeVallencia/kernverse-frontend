import CommentCreate from "../components/CommentCreate";
import CommentModal from "../components/CommentModal";
import CommentShow from "../components/CommentShow";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function Root() {

  return(
    <div>
      <NavBar />
      {/* <CommentCreate />
      <CommentModal onComment={handleClose}/>
      <CommentShow /> */}
      <Outlet />
    </div>
  );
};

export default Root;