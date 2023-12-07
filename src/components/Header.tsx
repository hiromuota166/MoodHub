'use client'
import GoogleLoginBtn from "./GoogleLoginBtn";

const handleClick = () => {
  window.location.href = '/';
}

const Header = () => {
  return (
    <header className="shadow-boxOut bg-background flex justify-between">
      <div>
        <button>
          <h1 
            onClick={handleClick}
            className="p-4 pt-6 text-3xl text-font">MoodHub
          </h1>
        </button>
      </div>
      <div className="items-center flex p-4">
        <GoogleLoginBtn />
      </div>
    </header>
  );
};

export default Header;
