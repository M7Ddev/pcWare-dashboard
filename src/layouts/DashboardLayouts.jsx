
import { useState , useEffect } from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useNavigate } from "react-router-dom";
import { productsData, OrdersData } from "../data/data";
function DashBoardLayouts({setIsLoggedIn}) {
    const [showSideBar , setShowSideBar] = useState(true)
    const [activePage ,setActivePage] = useState("Home")
    //hook to navigate 
    const navigate = useNavigate();

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : productsData;
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : OrdersData;
    });

    useEffect(()=>{
        localStorage.setItem("products", JSON.stringify(products));
    },[products]) //adding products as a dependency to update the local storage whenever the products state changes

    useEffect(()=>{
        localStorage.setItem("orders", JSON.stringify(orders));
    },[orders]) //adding orders as a dependency to update the local storage whenever the orders state changes
    function toggleSideBar() {
        setShowSideBar(!showSideBar); //because the usestate is true so we make it false after toggle
        
    };
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); //remove the login status from local storage
        setIsLoggedIn(false); //update the state to false
        navigate("/login", { replace: true })

    }
    return(
        <div className="layout">
            {showSideBar && ( // اي شي تضيفه ك مكون نضيفه هنا 
            <SideBar  activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}/>
            )}
            <div className="main-area">
            <Header onTogglesSideBar = {toggleSideBar}
            isSideBarVisible={showSideBar}/>
            <MainContent activePage= {activePage}
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            />
            </div>
            

        </div>
    );
    
}
export default DashBoardLayouts;