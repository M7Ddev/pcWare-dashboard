import { productsData } from "../data/data"
import { useState } from "react"
import ProductModel from "./ProductModel";

function ProductPage() {
    const [products, setProducts] = useState(productsData);
    const [formData, setFormData] = useState({
        name: "",
        catagory: "",
        price: "",
        stock: "",
        acitve: ""

    });
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleSubmit = (e) =>{ //so the user can sumbit the  form
        e.preventDefault();
        if (editingProduct) { //when sumbit know if its add or edit we will use 
            setProducts( //using map to check all the values in the array and update it 
                products.map((item) => item.id === editingProduct ?
                    {
                        ...item.id,
                        name: formData.name,
                        catagory: formData.catagory,
                        price: formData.price,
                        stock: formData.stock,
                        acitve: formData.stock>0,
                    } : item
                )
                    
                
            )

        } else{
                    const newProduct = {
                        id: products.length+1,
                        name: formData.name,
                        catagory: formData.catagory,
                        price: formData.price,
                        stock: formData.stock,
                        acitve: formData.stock>0,
                    };
                    setProducts([...products,newProduct]) //take the old products and add the new
    }
    closeForm();
    };
    const deleteProducts = (id) => {
        setProducts(products.filter((kick) => kick.id !== id));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });//using SpreadOpration
    };
    const openAddForm = () => {
        setEditingProduct(null)
        setFormData({ name: "", catagory: "", price: "", stock: "", acitve: "" })
        setShowForm(true)
    };

    const openEditForm = (product) => {
        setEditingProduct(product.id)
        setFormData({ 
            name: product.name, 
            catagory: product.catagory, 
            price: product.price, 
            stock: product.stock,
            acitve: product.acitve });
        setShowForm(true)
    };
    const closeForm = () => {
        setEditingProduct(null)
        setFormData({ name: "", catagory: "", price: "", stock: "", acitve: "" })
        setShowForm(false)
    };



    return (
        <div>
            <ProductModel
            showForm ={showForm}
            editingProduct = {editingProduct}
            formData = {formData}
            handleInputChange = {handleInputChange}
            handleSubmit = {handleSubmit}
            closeForm  = {closeForm}
            
            />
            <div className="page-header">
                <h2>ادارة المنتجات</h2>
                <button className="btn-add" onClick={openAddForm}>اضف المنتج +</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>المنتجات</th>
                        <th>الصنف</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>الحالة</th>
                        <th>الاجرائات</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.catagory}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <span className={item.acitve ? "badge-active" : "badge-inactive"}>
                                    {""}
                                    {item.acitve ? "Active" : "out of stock"}
                                </span>
                            </td>
                            <td>
                                <button className="btn-edit" onClick={() => openEditForm(item)}>Edit</button>
                                <button className="btn-delete" onClick={() => deleteProducts(item.id)}>Delete</button>
                            </td>

                        </tr>



                    )

                    )}

                </tbody>
            </table>
        </div>

    )

}

export default ProductPage