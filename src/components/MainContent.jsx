import StatCard from "./StatCard";
import ProductPage from "./ProductPage";
import OrdersPage from "./OrderPage";
import WeatherApi from "./WeatherAPI";
import PCApi from "./PCApi";
import { OrdersData } from "../data/data";
import { productsData } from "../data/data";
import OrderStatus from "./OrderStatus";

function MainContent({activePage , products, setProducts, orders, setOrders}) {
const totalProdcts = products.length;
const totalOrders = orders.length;
//عشان نحسب العوائد لازم نجمع سعر كل منتج مضروب في الكمية اللي تم طلبها في كل الطلبات
const revenue = orders.reduce((total, order) => {
    const orderTotal = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    return total + orderTotal;
}, 0); //to start the total from 0
    if (activePage === "products") {
        return(
            <main className="main">
                <ProductPage products={products} setProducts={setProducts}/>

            </main>
        );
    }
    if (activePage === "orders") {
        return(
            <main className="main">
                <OrdersPage orders={orders} setOrders={setOrders}/>

            </main>
        );
    }

    //     if (activePage === "weather") {
    //     return (
    //         <main className="main">
    //             <WeatherApi />
    //         </main>
    //     );
    // }

    if (activePage === "pcapi") {
        return (
            <main className="main">
                <PCApi />
            </main>
        );
    }
    return(
        <div className="main-content">
            <h2>الداشبورد</h2>
            <div className="card-grid">
                <StatCard  title={"المنتجات"} value={totalProdcts} />
                <StatCard  title={"العوائد"} value={revenue.toFixed(2)} />
                <StatCard  title={"الطلبات"} value={totalOrders} />

            </div><br />
            <OrderStatus orders={orders} />

        </div>
    )
    
}
export default MainContent;