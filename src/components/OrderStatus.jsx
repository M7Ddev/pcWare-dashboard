import React from "react";
import { OrdersData } from "../data/data"
function OrderStatus({orders}) {
    const total = orders.length;
    const completed = orders.filter((order) => order.status === "completed").length;
    const pending = orders.filter((order) => order.status === "pending").length;
    const cancelled = orders.filter((order) => order.status === "cancelled").length;
    return(
        <div className="order-status">  
            <h3>Order status</h3>
            <div className="status-item">
                <span>مكتمل</span>
                <span>{completed}</span>
                <div className="progerss-bar"></div>
                <div className="progress-fill green" style={{width: `${(completed / total) * 100}%`}}></div>
            </div>
            <div className="status-item">
                <span>قيد الانتظار</span>
                <span>{pending}</span>
                <div className="progerss-bar"></div>
                <div className="progress-fill yellow" style={{width: `${(pending / total) * 100}%`}}></div>
            </div>
            <div className="status-item">
                <span>ملغي</span>
                <span>{cancelled}</span>
                <div className="progerss-bar"></div>
                <div className="progress-fill red" style={{width: `${(cancelled / total) * 100}%`}}></div>
            </div>
        </div>
        
    )
    
}
export default OrderStatus