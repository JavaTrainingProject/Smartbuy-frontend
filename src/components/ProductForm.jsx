import React, { useState } from "react";
import { createProduct } from "../services/productService";

const ProductForm = () => {

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct(product);
            alert("Product added successfully");

            // reset form
            setProduct({
                name: "",
                price: "",
                description: ""
            });

        } catch (error) {
            console.error("Error creating product", error);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <br /><br />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;