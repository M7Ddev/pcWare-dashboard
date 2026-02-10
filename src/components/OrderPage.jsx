import { OrdersData } from "../data/data";
import { useState } from "react";
import OrderModel from "./OrderModel";

function OrdersPage({orders, setOrders}) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    date: "",
    product: "",
    qty: "",
    price: "",
    status: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  //to calaculate the total price of the order we will use reduce method to sum up the price of each item in the order and return the total price
  const calculateTotal = (items) => { 
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(
        orders.map((order) => order.id === editingOrder ?
          {
            ...order,
            customerName: formData.customerName,
            email: formData.email,
            date: formData.date,
            status: formData.status,
            items: [{ product: formData.product, qty: parseInt(formData.qty), price: parseInt(formData.price) }]
          } : order
        )
      )
    } else {
      const newOrder = {
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        customerName: formData.customerName,
        email: formData.email,
        date: formData.date,
        status: formData.status,
        items: [{ product: formData.product, qty: parseInt(formData.qty), price: parseInt(formData.price) }]
      };
      setOrders([...orders, newOrder])
    }
    closeForm();
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingOrder(null)
    setFormData({ customerName: "", email: "", date: "", product: "", qty: "", price: "", status: "" })
    setShowForm(true)
  };

  const openEditForm = (order) => {
    setEditingOrder(order.id)
    setFormData({
      customerName: order.customerName,
      email: order.email,
      date: order.date,
      product: order.items[0].product,
      qty: order.items[0].qty,
      price: order.items[0].price,
      status: order.status
    });
    setShowForm(true)
  };

  const closeForm = () => {
    setEditingOrder(null)
    setFormData({ customerName: "", email: "", date: "", product: "", qty: "", price: "", status: "" })
    setShowForm(false)
  };
  return (
    <div>
      <OrderModel
        showForm={showForm}
        editingOrder={editingOrder}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        closeForm={closeForm}
      />
      <div className="page-header">
        <h2>ادارة الطلبات</h2>
        <button className="btn-add" onClick={openAddForm}>اضف طلب +</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>اسم العميل</th>
            <th>البريد الإلكتروني</th>
            <th>التاريخ</th>
            <th>المنتج</th>
            <th>الكمية</th>
            <th>السعر الإجمالي</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.email}</td>
              <td>{order.date}</td>
              <td>
                {order.items.map((item, idx) => (
                  <div key={idx}>{item.product}</div>
                ))}
              </td>
              <td>
                {order.items.map((item, idx) => (
                  <div key={idx}>{item.qty}</div>
                ))}
              </td>
              <td>${calculateTotal(order.items).toFixed(2)}</td>
              <td>
                <span
                  className={order.status === "completed" ? "badge-active" : order.status === "pending" ? "badge-pending" : "badge-cancelled"}
                >
                  {order.status === "completed" ? "مكتمل" : order.status === "pending" ? "معلق" : "ملغي"}
                </span>
              </td>
              <td>
                <button className="btn-edit" onClick={() => openEditForm(order)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => deleteOrder(order.id)}
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
