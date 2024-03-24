import React, { useState } from "react";
import { useSelector } from "react-redux";

function Blog({ id }) {
  const Data = useSelector((state) => state.blogPost.userData);
  const [blogData, setBlogData] = useState({});
  console.log(Data);
  return <div>Blog</div>;
}

export default Blog;
