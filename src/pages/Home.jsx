import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import Container from "../components/container/Container.jsx";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.blogPost.userLogin);
  const userId = status
    ? useSelector((state) => state.blogPost.userData.$id)
    : null;

  useEffect(() => {
    if (status) {
      service.getHomePosts(userId).then((post) => {
        if (post && post.documents) {
          setPosts(post.documents);
        }
      });
    }
  }, []);

  if (!status) {
    return (
      <div className="w-full py-8 mt-4 text-center bottom-0 ">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="bg-gray-200 flex items-center justify-center mx-auto">
      {status && Array.isArray(posts) && posts.length == 0 && (
        <div> You have not Posted any Blog</div>
      )}
      {Array.isArray(posts) && posts.length && (
        <Container>
          <h1 className="text-lg">Your recent post as following</h1>
          <div className="bg-gray-200 min-h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto items-center justify-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Home;
