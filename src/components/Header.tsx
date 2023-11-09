import GoogleLoginBtn from "./GoogleLoginBtn"

const Header = () => {
    return (
        <header className="shadow-boxOut bg-background">
            <h1 className="p-4 pt-6 text-3xl text-font">MoodHub</h1>
            <GoogleLoginBtn />
        </header>
    )
}

export default Header