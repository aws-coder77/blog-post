import React from "react";
import Blog from "../components/Blog";
import { useParams } from "react-router-dom";
function Blogcontent() {
  const { id } = useParams();
  return (
    <div>
      <Blog id={id} />
    </div>
  );
}

export default Blogcontent;
