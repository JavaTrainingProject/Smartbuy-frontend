import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";

import "../styles/OrderPage.css";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders");
        setOrders(res.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-page">

      <Header />

      <div className="order-layout">

       
        <UserNavbar />

       
        <div className="order-main">

          <h2>🧾 My Orders</h2>

          
          <div className="order-content-wrapper">

            {orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              orders.map((order) => (
                <div key={order.orderId} className="order-card">

                  <div className="order-top">
                    <h3>Order Id {order.orderId || order.id}</h3>
                    <span>{order.status}</span>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.productName} - {item.quantity} × ₹{item.price}
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    Total: ₹{order.totalAmount}
                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}