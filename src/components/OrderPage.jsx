import { OrdersData } from "../data/data";
import { useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState(OrdersData);

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.OrderID !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h2>ادارة الطلبات</h2>
        <button className="btn-add">اضف طلب +</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>رقم المنتج</th>
            <th>الكمية</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.ProductId}</td>
              <td>{order.Quantity}</td>
              <td>
                <span
                  className={order.Status ? "badge-active" : "badge-inactive"}
                >
                  {order.Status ? "Completed" : "Pending"}
                </span>
              </td>
              <td>
                <button className="btn-edit">Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => deleteOrder(order.OrderID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
