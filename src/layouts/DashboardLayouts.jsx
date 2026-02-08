
import { useState } from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/header";
import MainContent from "../components/MainContent";
import { useNavigate } from "react-router-dom";
function DashBoardLayouts() {
    const [showSideBar , setShowSideBar] = useState(true)
    const [activePage ,setActivePage] = useState("Home")
    //hook to navigate 
    const navigate = useNavigate();
    function toggleSideBar() {
        setShowSideBar(!showSideBar); //because the usestate is true so we make it false after toggle
        
    };
    const handleLogout = () => {
        navigate("/Login")

    }
    return(
        <div className="layout">
            {showSideBar && ( // اي شي تضيفه ك مكون نضيفه هنا 
            <SideBar  activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}/>
            )}
            <div className="main-area">
            <Header onTogglesSideBar = {toggleSideBar}
            isSideBarVisible={showSideBar}/>
            <MainContent activePage= {activePage}/>
            </div>
            

        </div>
    );
    
}
export default DashBoardLayouts;