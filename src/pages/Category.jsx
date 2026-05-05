import { useEffect, useState } from "react";
import '../styles/Category.css';
import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ FETCH ACTIVE CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/active`);
      setCategories(res.data.data.content || res.data.data);

    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, {
          categoryName: name,
        });
      } else {
        await axios.post(API_URL, {
          categoryName: name,
        });
      }

      fetchCategories();
      setName("");
      setEditId(null);
      setShowModal(false);

    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  // ✅ EDIT
  const handleEdit = (cat) => {
    setName(cat.name || cat.categoryName); // depending on DTO
    setEditId(cat.id); // 🔥 backend uses id, not _id
    setShowModal(true);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleAddClick = () => {
    setName("");
    setEditId(null);
    setShowModal(true);
  };

  return (
    <div className="category-container">
      
      <div className="header">
        <h2>Categories</h2>
        <button className="add-btn" onClick={handleAddClick}>
          + Add Category
        </button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name || cat.categoryName}</td>
              <td style={{ textAlign: "right" }}>
                <button onClick={() => handleEdit(cat)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(cat.id)}className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId ? "Edit Category" : "Add Category"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="modal-actions">
                <button type="submit">
                  {editId ? "Update" : "Add"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;