import React, { useState, useEffect } from "react";
import service from "../appwrite/conf";
import Container from "./container/Container";
import authService from "../appwrite/auth";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

function AllUserPost() {
  const [allUserData, setAllUserData] = useState([]);
  const [curser, setCurser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setErrors(null);
    try {
      setLoading(true);
      const response = await service.getUserPost(curser);
      const datresponse = response.documents;
      if (response.documents.length > 0) {
        setAllUserData([...allUserData, ...datresponse]);
        const lastId = response.documents[response.documents.length - 1].$id;
        setCurser(lastId);
      } else {
        setCurser(null);
      }
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;

      if (isBottom && !loading && curser) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    fetchData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gray-200 flex items-center justify-center mx-auto">
      <Container>
        <div className="bg-gray-200 min-h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto items-center justify-center">
          {allUserData &&
            allUserData.map((userData) => (
              <div
                key={userData.imageId}
                className="bg-white rounded-lg shadow mx-2 p-2 max-w-sm flex items-center cursor-pointer justify-center"
                onClick={() => {
                  navigate(`/all-user-post/${userData.$id}`);
                }}
              >
                <div key={userData.id} className=" overflow-hidden">
                  <h2 className="text-2xl font-bold mb-4 ">
                    {(() => {
                      if (userData.title.length > 15) {
                        return userData.title.substring(0, 12) + "...";
                      }
                      return userData.title;
                    })()}
                  </h2>
                  {userData.imageId && (
                    <div className="flex items-center justify-center">
                      <img
                        src={service.getFilePreview(userData.imageId)}
                        alt="Card Image"
                        className="mb-4 flex items-center justify-center rounded w-48 h-64 overflow-hidden"
                      />{" "}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllUserPost;
