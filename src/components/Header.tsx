import NightModeSwitch from "./NightModeSwitch"
const Header = () => {
    return (
        <header className="shadow-boxOut bg-background dark:bg-red text-font dark:text-darkfont">
            <h1 className="p-4 pt-6 text-3xl">MoodHub</h1>
            <NightModeSwitch />
        </header>
    )
}

export default Header