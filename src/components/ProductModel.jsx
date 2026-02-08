function ProductModel(
    {
       //probs 
    showForm,
    editingProduct,
    formData,
    handleInputChange,
    handleSubmit,
    closeForm

    }
) {return(
        <>
        {showForm && ( //if its false show the form 
                <div className="model-overlay">
                    <div className="model">
                        <h3>{editingProduct ? "تعديل البيانات" : "اضف منتج"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>الاسم</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>الصنف</label>
                                <input type="text" name="catagory" value={formData.catagory} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>السعر</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>الكمية</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>الحالة</label>
                                <select name="acitve" value={formData.acitve} onChange={handleInputChange}>
                                    <option value="">اختر الحالة</option>
                                    <option value={true}>نشط</option>
                                    <option value={false}>غير نشط</option>
                                </select>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn-save">{editingProduct ? "تحديث" : "حفظ"}</button>
                                <button type="button" className="btn-cancel" onClick={closeForm}>الغاء</button>
                            </div>

                        </form>
                
                    </div>
                </div>
            )}
        </>

    )
    
}
export default ProductModel;