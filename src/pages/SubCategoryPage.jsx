import { useEffect, useState } from "react";

import {
  createSubCategory,
  deleteSubCategory,
  getActiveCategories,
  getAllSubCategories,
  updateSubCategory,
} from "../services/subCategoryService";

import "../styles/subcategory.css";

function SubCategoryPage() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryName: "",
    subCategoryDescription: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getActiveCategories();
      setCategories(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await getAllSubCategories();
      setSubCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSubCategory(editingId, formData);
      } else {
        await createSubCategory(formData);
      }

      fetchSubCategories();

      setFormData({
        categoryId: "",
        subCategoryName: "",
        subCategoryDescription: "",
      });

      setEditingId(null);
      setShowForm(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      categoryId: item.categoryId,
      subCategoryName: item.subCategoryName,
      subCategoryDescription: item.subCategoryDescription,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id);
      fetchSubCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="subcategory-page">

      <div className="subcategory-header">

        <h2>SubCategories</h2>

        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add SubCategory
        </button>

      </div>

      {showForm && (

        <form className="subcategory-form" onSubmit={handleSubmit}>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subCategoryName"
            placeholder="SubCategory Name"
            value={formData.subCategoryName}
            onChange={handleChange}
            disabled={!formData.categoryId}
          />

          <textarea
            name="subCategoryDescription"
            placeholder="Description"
            value={formData.subCategoryDescription}
            onChange={handleChange}
            disabled={!formData.categoryId}
          />

          <button type="submit">
            {editingId ? "Update" : "Save"}
          </button>

        </form>
      )}

      <div className="table-container">

        <table className="subcategory-table">

          <thead>
            <tr>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Description</th>
              <th>Status</th>

              {/* ✅ Actions shown only when form is opened */}
              {showForm && <th>Actions</th>}

            </tr>
          </thead>

          <tbody>
            {subCategories.map((item) => (
              <tr key={item.id}>

                <td>{item.categoryName}</td>
                <td>{item.subCategoryName}</td>
                <td>{item.subCategoryDescription}</td>
                <td>{item.status}</td>

              
                {showForm && (
                  <td>
                    {editingId === item.id ? (
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Update
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Remove
                        </button>

                      </div>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Manage
                      </button>
                    )}
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SubCategoryPage;