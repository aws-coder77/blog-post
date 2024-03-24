import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import Container from "../components/container/Container.jsx";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const dataValue = useSelector((state) => state.blogPost);
  let userId, status;
  if (dataValue.userLogin) {
    status = dataValue.userLogin;
    userId = dataValue.userData.$id;
  }
  useEffect(() => {
    if (status) {
      async function getData() {
        try {
          await service.getHomePosts(userId).then((post) => {
            if (post && post.documents) {
              setPosts([...post.documents]);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }
  }, [status]);

  if (!status) {
    return (
      <div className="w-full py-8 mt-4 text-center bottom-0 ">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold ">Login to see posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="bg-gray-200 flex items-center justify-center mx-auto">
      {status && Array.isArray(posts) && posts.length == 0 && (
        <div className=" flex items-center justify-center text-lg">
          You have not Posted any Blog
        </div>
      )}
      &nbsp;
      {posts && posts.length > 0 && Array.isArray(posts) && (
        <Container>
          <h1 className="text-lg">Your recent post as following</h1>
          <div className="bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mx-auto items-center justify-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-1">
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
