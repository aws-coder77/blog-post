import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import Button from "../components/Button";
import { useSelector } from "react-redux";

export default function Post() {
  const [posts, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.blogPost.userData);
  const isAuthor = posts && userData ? posts.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) setPosts(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);

  const deletePost = () => {
    service.deletePost(id).then((status) => {
      if (status) {
        service.deleteFile(posts.imageId);
        navigate("/");
      }
    });
  };

  return posts ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {posts.imageId && (
            <img
              src={service.getFilePreview(posts.imageId)}
              alt={posts.title}
              className="rounded-xl w-1/4"
            />
          )}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${posts.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{posts.title}</h1>
        </div>
        <div className="browser-css">{parse(posts.blogContent)}</div>
      </Container>
    </div>
  ) : null;
}
