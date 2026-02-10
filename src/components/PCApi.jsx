import { useState, useEffect } from "react";

function PCApi() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch products from API based on search query
  useEffect(() => {
    if (searchQuery.length < 1) {
      setProducts([]);
      setShowDropdown(false);
      return;
    }

    setSearchLoading(true);
    const timer = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setProducts(data.products.slice(0, 8)); // Limit to 8 results
            setShowDropdown(true);
          } else {
            setProducts([]);
            setShowDropdown(false);
          }
          setSearchLoading(false);
        })
        .catch((e) => {
          console.error("error fetching products", e);
          setSearchLoading(false);
        });
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchQuery(product.title);
    setShowDropdown(false);
  };

  return (
    <div className="pc-api-page">
      <div className="pc-api-card">
        <h2 className="pc-api-title">PC Products Search</h2>

        {/* Search Area */}
        <div className="search-area">
          <label className="label">Search Products</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (products?.length > 0) setShowDropdown(true);
            }}
          />

          {/* Dropdown Results */}
          {showDropdown && products?.length > 0 && (
            <div className="dropdown">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="dropdown-title">{product.title}</div>
                  <div className="dropdown-sub">Brand: {product.brand || "N/A"}</div>
                </button>
              ))}
            </div>
          )}

          {searchLoading && <p className="hint">Loading...</p>}
          {!searchLoading && searchQuery && products.length === 0 && (
            <p className="hint">No products found</p>
          )}
        </div>

        {/* Product Details Panel */}
        {selectedProduct && (
          <div className="panel">
            <div className="panel-top">
              <h3 className="product-name">{selectedProduct.title}</h3>
              <p className="product-price">${selectedProduct.price}</p>
            </div>

            <div className="product-grid">
              <div className="box">
                <div className="box-label">Rating</div>
                <div className="box-value">{selectedProduct.rating || "N/A"}</div>
              </div>
              <div className="box">
                <div className="box-label">Stock</div>
                <div className="box-value">{selectedProduct.stock || "N/A"}</div>
              </div>
              <div className="box">
                <div className="box-label">Discount</div>
                <div className="box-value">{selectedProduct.discountPercentage || "0"}%</div>
              </div>
              <div className="box">
                <div className="box-label">Brand</div>
                <div className="box-value">{selectedProduct.brand || "N/A"}</div>
              </div>
            </div>

            <div className="product-description">
              <h4>Description</h4>
              <p>{selectedProduct.description}</p>
            </div>

            <div className="product-category">
              <h4>Category: <span>{selectedProduct.category}</span></h4>
            </div>
          </div>
        )}

        {!selectedProduct && (
          <div className="empty">
            <p>Search for a product to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PCApi;
