import React, { useState, useEffect } from "react";
import Container from "../components/container/Container.jsx";
import PostForm from "../components/PostForm";
import service from "../appwrite/conf";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);
  return post ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          <PostForm post={post} className="p-2" />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
