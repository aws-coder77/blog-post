import React from "react";
import Blog from "../components/Blog";
import { useParams } from "react-router-dom";
function Blogcontent() {
  const { id } = useParams();
  return (
    <div>
      BlogContent my name is chandan kumar
      <Blog id={id} />
    </div>
  );
}

export default Blogcontent;
