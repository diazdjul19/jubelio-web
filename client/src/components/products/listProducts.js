import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://localhost:5000/products/get-products";

const InputProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product for editing

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    slug: "",
    description: "",
    image: null,
  });

  const handleImageError = (event) => {
    const defaultImage = "https://via.placeholder.com/150";
    event.target.src = defaultImage;
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}?page=${page}&pageSize=${pageSize}`
      );
      setProducts(response.data.products);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset the page to 1 when changing the page size
  };

  const handleCreateProduct = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("sku", formData.sku);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const data = await axios.post(
        "http://localhost:5000/products/create-product",
        formDataToSend
      );

      if (data.status != 200) {
        window.alert(data.message);
        return;
      }

      // Close the modal and refresh the list of products
      setShowModal(false);
      getProducts();

      window.alert("Product created successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSelectedProduct({
        ...selectedProduct,
        [name]: files[0],
      });
    } else {
      setSelectedProduct({
        ...selectedProduct,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", selectedProduct.name);
    formDataToSend.append("sku", selectedProduct.sku);
    formDataToSend.append("price", selectedProduct.price);
    formDataToSend.append("slug", selectedProduct.slug);
    formDataToSend.append("description", selectedProduct.description);
    formDataToSend.append("image", selectedProduct.image);

    try {
      const data = await axios.put(
        `http://localhost:5000/products/update-product/${selectedProduct.id}`,
        formDataToSend
      );

      if (data.status != 200) {
        window.alert(data.message);
        return;
      }

      // Close the edit modal and refresh the list of products
      setShowEditModal(false);
      getProducts();

      window.alert("Product updated successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(
          `http://localhost:5000/products/delete-product/${product.id}`
        );
      }

      setShowEditModal(false);
      getProducts();

      window.alert("Product deleted successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container text-center" style={{ marginTop: "50px" }}>
      <h1>List Product</h1>

      <button
        type="button"
        className="btn btn-primary mt-2 mb-4"
        onClick={handleCreateProduct}
      >
        Create Product
      </button>

      {/* Modal for creating a product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="sku">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SKU"
                name="sku"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                name="price"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Slug"
                name="slug"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image" // Change this to "image"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button className="mt-3 mr-2" variant="primary" type="submit">
              Create
            </Button>
            <Button
              className="mt-3"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing a product */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="editName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="editSKU">
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter SKU"
                  name="sku"
                  value={selectedProduct.sku}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="editPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="editSlug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter slug"
                  name="slug"
                  value={selectedProduct.slug}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="editDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              <Form.Group controlId="editImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleEditFormChange}
                />
              </Form.Group>
              {/* Add other input fields to edit other product attributes */}
              <Button className="mt-3 mr-2" variant="primary" type="submit">
                Save Changes
              </Button>
              <Button
                className="mt-3"
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <div className="row">
        {Array.isArray(products) ? (
          products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              {" "}
              {/* Added mb-4 for margin-bottom */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={product.img_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                  onError={handleImageError}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>

                  <p className="card-text">{product.sku}</p>
                  <p className="card-text">${product.price}</p>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />

                  <button
                    type="button"
                    className="btn btn-primary ml-2 mr-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-2 mr-2"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="p-4">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous Page
          </button>
          <span>Page {page}</span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next Page
          </button>
        </div>

        <div
          className="pagination p-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InputProducts;
