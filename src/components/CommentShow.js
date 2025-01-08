import { useContext } from "react";
import UserContext from "../context/UserContext";
import { GoPerson } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid';


function CommentShow({ comments }) {

  const { userInfo } = useContext(UserContext);

  return(
    <div className="text-sm flex flex-col">
      <hr />
      { comments?.map((comment) => (
      <div key={comment._id || uuidv4()} >
      <div className="flex pt-8 mb-5 items-center">
        <GoPerson size={25} className="text-teal-400" />
        {/* <div className="border rounded-full w-10 p-3 h-10"/> */}
        <div className="flex flex-col">
          <p className="ml-4">{userInfo?.fullName}</p>
          <p className="ml-4 text-gray-500">
            {new Date(comment.createdAt).toLocaleString() || "Just now"}
          </p>
        </div>
      </div> 
        <p className="mb-2">
          {typeof comment.comment === "string" ? comment.comment : JSON.stringify(comment.comment)}
        </p>
      <hr />
      </div>
      ))}
    </div>
  );
}

export default CommentShow;