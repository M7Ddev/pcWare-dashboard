function SideBar({activePage , onPageChange , onLogout}) { //probs
    const navItems = [
        {id : "dashboard" , label : "الداشبورد"},
        {id : "products" , label : "المنتجات"},
        {id : "orders" , label : "الطلبات"},
        {id : "users" , label : "المستخدمين"},
        {id : "profiles" , label : "الحسابات"},
        {id : "weather" , label: "الطقس"}

    ]; 
    return(
        <aside className="sidebar">
            <h2>صفحتي</h2>

            <nav>
                <ul className="nav-list">

                    {navItems.map((item) =>(
                        <li                            
                        key = {item.id} //if the item active true show the nav if not will show title
                        className = {activePage === item.id ? "nav-item active" : "nav-title"}
                        onClick={() => onPageChange(item.id)} //if it clicked show the items 
                        >
                            {item.label} 
                        
                        </li>
                    ))} 
                    <li className="logout-item" onClick={onLogout}>تسجيل خروج</li>
            
                </ul>
            </nav>

        </aside>
    )
    
}
export default SideBar