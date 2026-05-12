import { useEffect, useState } from "react";
import "../styles/Category.css";
import API from "../services/axiosInstance";

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {

      // ✅ GET ALL DATA
      const res = await API.get(
        `/admin/categories?page=${page}&size=20&sortBy=id&direction=asc`
      );

      console.log("CATEGORY RESPONSE:", res.data);

      const data = res.data?.data;

      setCategories(data?.content || []);
      setTotalPages(data?.totalPages || 0);

    } catch (err) {
      console.error(
        "Fetch Error:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  // ---------------- ADD / UPDATE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        categoryName: name.trim(),
      };

      console.log("PAYLOAD:", payload);

      // ✅ UPDATE
      if (editId) {

        await API.put(
          `/admin/categories/${editId}`,
          payload
        );

      } else {

        // ✅ ADD
        await API.post(
          `/admin/categories`,
          payload
        );
      }

      // ✅ REFRESH
      fetchCategories();

      // ✅ RESET
      setName("");
      setEditId(null);
      setShowModal(false);

    } catch (err) {

      console.error(
        "Save Error:",
        err.response?.data || err.message
      );
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (cat) => {

    setName(cat.categoryName);

    setEditId(cat.id);

    setShowModal(true);
  };

  // ---------------- TOGGLE ----------------
  const handleToggle = async (cat) => {

    try {

      // ✅ TOGGLE STATUS
      const newStatus =
        cat.status === "ACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

      console.log("NEW STATUS:", newStatus);

      // ✅ PATCH STATUS API
      await API.patch(
        `/admin/categories/${cat.id}/status?status=${newStatus}`
      );

      fetchCategories();

    } catch (error) {

      console.error(
        "Toggle Error:",
        error.response?.data || error.message
      );
    }
  };

  // ---------------- OPEN MODAL ----------------
  const handleAddClick = () => {

    setName("");

    setEditId(null);

    setShowModal(true);
  };

  // ---------------- UI ----------------
  return (
    <div className="category-container">

      {/* HEADER */}
      <div className="header">

        <h2>Categories</h2>

        <button
          className="add-btn"
          onClick={handleAddClick}
        >
          + Add Category
        </button>

      </div>

      {/* TABLE */}
      <table className="category-table">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>
              <td
                colSpan="3"
                style={{ textAlign: "center" }}
              >
                No categories found
              </td>
            </tr>

          ) : (

            categories.map((cat, index) => (

              <tr key={cat.id}>

                <td>
                  {page * 20 + index + 1}
                </td>

                <td>
                  {cat.categoryName}
                </td>

                <td>

                  <div className="actions-container">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(cat)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    {/* TOGGLE */}
                    <button
                      className={`toggle-btn ${
                        cat.status === "ACTIVE"
                          ? "active"
                          : "inactive"
                      }`}
                      onClick={() => handleToggle(cat)}
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

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="modal">

          <div className="modal-content">

            <h3>
              {editId
                ? "Edit Category"
                : "Add Category"}
            </h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

              <div className="modal-actions">

                <button type="submit">
                  {editId ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
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