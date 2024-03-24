import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, imageId = "" }) {
  const [imageURL, setImageURL] = useState(null);
  if (title.length > 15) {
    title = title.substring(0, 12) + "...";
  }

  useEffect(() => {
    if (imageId) {
      try {
        const response = service.getFilePreview(imageId);
        if (response) setImageURL(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [imageId]);

  return (
    <Link to={`/post/${$id}`}>
      <div
        key={imageId}
        className="bg-white rounded-lg shadow mx-2 p-2 max-w-sm flex items-center justify-center"
      >
        <div className="">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          {imageURL && (
            <img
              src={imageURL}
              alt="Card Image"
              className="mb-4 rounded h-72"
            />
          )}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
