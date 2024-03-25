import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import parse from "html-react-parser";

function Blog({ id }) {
  const [blogData, setBlogData] = useState({});
  useEffect(() => {
    service.getPost(id).then((post) => {
      if (post) setBlogData(post);
    });
  }, [id]);
  console.log(blogData);
  return (
    <div className="md:flex m-4 gap-2">
      <div>
        <div>
          <h1 className=" text-2xl font-medium">Title</h1>
          <h1 className=" flex justify-between text-2xl font-medium ml-2 text-auto">
            {blogData.title}{" "}
          </h1>
        </div>
        <div>
          <h1 className=" text-2xl font-medium mt-5">Content</h1>
          <div className=" flex text-md font-medium ml-2  text-auto justify-between">
            {parse(`${blogData.blogContent}`)}
          </div>
        </div>
      </div>
      <div>
        {blogData.imageId && (
          <img
            src={service.getFilePreview(blogData.imageId)}
            alt={blogData.title}
            className="rounded-xl md:max-w-sm mt-3 "
          />
        )}
      </div>
    </div>
  );
}

export default Blog;
