import StatCard from "./StatCard";
import ProductPage from "./ProductPage";
import OrdersPage from "./OrderPage";
import WeatherApi from "./WeatherAPI";
function MainContent({activePage}) {

    if (activePage === "products") {
        return(
            <main className="main">
                <ProductPage />

            </main>
        );
    }
    if (activePage === "orders") {
        return(
            <main className="main">
                <OrdersPage/>

            </main>
        );
    }

        if (activePage === "weather") {
        return (
            <main className="main">
                <WeatherApi />
            </main>
        );
    }
    return(
        <div className="main-content">
            <h2>الداشبورد</h2>
            <div className="card-grid">
                <StatCard  title={"المنتجات"} value={100} />
                <StatCard  title={"العوائد"} value={200} />
                <StatCard  title={"الطلبات"} value={300} />

            </div>
        </div>
    )
    
}
export default MainContent;