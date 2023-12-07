import UserList from "./UserList";
import GoogleLoginBtn from "./GoogleLoginBtn";

const Header = () => {
  return (
    <header className="shadow-boxOut bg-background flex justify-between">
      <div>
        <h1 className="p-4 pt-6 text-3xl text-font">MoodHub</h1>
      </div>
      <div className="items-center flex p-4">
        <UserList />
        <GoogleLoginBtn />
      </div>
    </header>
  );
};

export default Header;
