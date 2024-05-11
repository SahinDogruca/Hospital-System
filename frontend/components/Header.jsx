import Link from "next/link";
import React from "react";
import { useUser } from "../context/UserContext";
import { logout } from "../utils/doctorApi";

const Links = () => {
  return (
    <div className="links">
      <Link href="/login">
        <button type="button" className="btn btn-primary">
          Login
        </button>
      </Link>
      <Link href="/register">
        <button type="button" className="btn">
          Sign up
        </button>
      </Link>
    </div>
  );
};

const Header = () => {
  const { user, setUser, isLogged, setIsLogged } = useUser();

  const handleLogout = () => {
    logout();
    setUser({});
    setIsLogged(false);
  };

  return (
    <div className="header-wrapper">
      <div className="background-overlay"></div>
      <div className="header-container">
        <h1 className="header-title">Hospital</h1>
        {isLogged ? (
          <div className="header-user">
            <h3 className="header-title">Welcome {user.name}</h3>
            <div className="buttons">
              <div>
                <Link href="/dashboard">
                  <button type="button" className="btn">
                    Dashboard
                  </button>
                </Link>
              </div>
              <div className="logout">
                <button type="button" className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Links />
        )}
      </div>
    </div>
  );
};

export default Header;
