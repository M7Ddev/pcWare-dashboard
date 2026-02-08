
function Header({onTogglesSideBar , isSideBarVisible }) {
    return(
        <div>
            <button className="toggle-btn" onClick={onTogglesSideBar}> 
            {isSideBarVisible ? "✖" : "☰ "}


            </button>
        </div>
    )
    
}
export default Header