import React, { useState, useEffect } from "react";
import service from "../appwrite/conf";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((post) => setPosts(post.documents));
  }, []);

  return (
    <div className="bg-gray-200 flex items-center justify-center mx-auto">
      <Container>
        <div className="bg-gray-200 min-h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto items-center justify-center">
          {posts.length &&
            posts.map((post) => (
              <div key={post.$id} className="p-2">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
