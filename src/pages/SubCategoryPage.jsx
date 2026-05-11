import { useEffect, useState } from "react";

import {
  createSubCategory,
  deleteSubCategory,
  getActiveCategories,
  getAllSubCategories,
  updateSubCategory,
  toggleSubCategoryStatus,
} from "../services/subCategoryService";

import "../styles/subcategory.css";

function SubCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryName: "",
    subCategoryDescription: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [page]);

  const fetchCategories = async () => {
    try {
      const response = await getActiveCategories();

      const result = response.data?.data;


      const list = Array.isArray(result)
        ? result
        : result?.content || [];

      setCategories(list);
    } catch (error) {
      console.log("Category error:", error);
      setCategories([]);
    }
  };


  const fetchSubCategories = async () => {
    try {
      const response = await getAllSubCategories(page);
      setSubCategories(response.data.data || []);
    } catch (error) {
      console.log("SubCategory error:", error);
      setSubCategories([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      categoryId: "",
      subCategoryName: "",
      subCategoryDescription: "",
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        categoryId: Number(formData.categoryId),
        subCategoryName: formData.subCategoryName?.trim(),
        subCategoryDescription: formData.subCategoryDescription?.trim(),
      };


      console.log("SAVE PAYLOAD:", payload);

      if (!payload.categoryId || !payload.subCategoryName) {
        alert("Category and SubCategory Name are required");
        return;
      }

      if (editingId) {
        await updateSubCategory(editingId, payload);
      } else {
        await createSubCategory(payload);
      }

      fetchSubCategories();
      resetForm();

    } catch (error) {
      console.log(
        "Submit error:",
        error?.response?.data || error.message
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      categoryId: item.categoryId,
      subCategoryName: item.subCategoryName,
      subCategoryDescription: item.subCategoryDescription,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id);
      fetchSubCategories();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };


  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      await toggleSubCategoryStatus(id, newStatus);

      fetchSubCategories();
    } catch (error) {
      console.log("Toggle error:", error);
    }
  };

  return (
    <div className="category-container">
      <div className="header">
        <h2>SubCategories</h2>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add SubCategory
        </button>
      </div>

      {/* TABLE */}
      <table className="category-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Description</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subCategories?.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No subcategories found
              </td>
            </tr>
          ) : (
            subCategories.map((item, index) => (
              <tr key={item.id}>
                <td>{page * 5 + index + 1}</td>
                <td>{item.categoryName}</td>
                <td>{item.subCategoryName}</td>
                <td>{item.subCategoryDescription}</td>

                <td>
                  <div className="actions-container">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>


                    <button
                      className={`toggle-btn ${item.status === "ACTIVE" ? "active" : "inactive"
                        }`}
                      onClick={() => toggleStatus(item.id, item.status)}
                    >
                      <div className="toggle-circle"></div>
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page + 1}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingId ? "Edit SubCategory" : "Add SubCategory"}</h3>

            <form onSubmit={handleSubmit}>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: Number(e.target.value), // IMPORTANT FIX
                  })
                }
                required
              >
                <option value="">Select Category</option>

                {(Array.isArray(categories) ? categories : []).map((cat) => (
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
                required
              />

              <textarea
                name="subCategoryDescription"
                placeholder="Description"
                value={formData.subCategoryDescription}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button type="submit">
                  {editingId ? "Update" : "Save"}
                </button>

                <button type="button" onClick={resetForm}>
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

export default SubCategoryPage;