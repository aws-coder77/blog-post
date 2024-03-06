import React from "react";
import Container from "./container/Container";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.blogPost.userLogin);

  const navigate = useNavigate();

  const [isScreenMD, setIsScreenMD] = useState(true);
  const [isMenuHidden, setIsMenuHidden] = useState("hidden");

  useEffect(() => {
    if (isScreenMD) {
      setIsMenuHidden("hidden");
    } else {
      setIsMenuHidden("visible");
    }
  }, [isScreenMD]);

  function handleMenu() {
    setIsScreenMD((Menuvalue) => !Menuvalue);
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "All User Post",
      slug: "/all-user-post",
      active: authStatus,
    },
  ];
  return (
    <header className=" py-3 shadow bg-slate-900 text-slate-100">
      <Container>
        <nav className="flex">
          <div className="flex items-center justify-end w-4/5 md:w-full">
            <ul
              className={` ${isMenuHidden} bg-black rounded-2xl text-white block md:flex ml-auto`}
            >
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <Logout />
                </li>
              )}
            </ul>
          </div>
          <div className="flex md:hidden justify-end px-5 py-3 w-1/5 md:w-full">
            <IoMenu
              onClick={handleMenu}
              size={30}
              className={isScreenMD ? " " : "hidden"}
            />
            <MdOutlineCancel
              onClick={handleMenu}
              className={isScreenMD ? "hidden" : ""}
              size={30}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
