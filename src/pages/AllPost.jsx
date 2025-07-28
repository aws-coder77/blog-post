import React, { useState, useEffect } from "react";
import service from "../appwrite/conf";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const userId = useSelector((state) => state.blogPost.userData && state.blogPost.userData.$id);

  useEffect(() => {
    service.getPosts(userId).then((post) => setPosts(post.documents));
  }, []);

  const filteredPosts = posts.filter(
    (post) => post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || post.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Suggestions when 3 or more characters are typed
  const suggestions = searchQuery.length >= 3 ? posts.filter((post) => post.title?.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center mx-auto min-h-screen">
      <Container>
        <div className="w-full flex flex-col items-center mb-4 relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="p-2 mt-4 rounded-md border border-gray-400 w-full max-w-md"
          />

          {/* Suggestion dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-16 w-full max-w-md bg-white border border-gray-300 rounded-md shadow-md z-10">
              {suggestions.map((post) => (
                <li key={post.$id} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(post.title)}>
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto items-center justify-center">
          {filteredPosts && filteredPosts.length ? (
            filteredPosts.map((post) => (
              <div key={post.$id} className="p-2">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-4">No posts found.</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
