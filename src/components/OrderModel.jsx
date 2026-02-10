function OrderModel(
    {
        showForm,
        editingOrder,
        formData,
        handleInputChange,
        handleSubmit,
        closeForm
    }
) {
    return (
        <>
            {showForm && (
                <div className="model-overlay">
                    <div className="model">
                        <h3>{editingOrder ? "تعديل الطلب" : "اضف طلب"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>اسم العميل</label>
                                <input 
                                    type="text" 
                                    name="customerName" 
                                    value={formData.customerName} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>التاريخ</label>
                                <input 
                                    type="date" 
                                    name="date" 
                                    value={formData.date} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>اسم المنتج</label>
                                <input 
                                    type="text" 
                                    name="product" 
                                    value={formData.product} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>الكمية</label>
                                <input 
                                    type="number" 
                                    name="qty" 
                                    value={formData.qty} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>السعر</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={formData.price} 
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>الحالة</label>
                                <select name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="">اختر الحالة</option>
                                    <option value="completed">مكتمل</option>
                                    <option value="pending">معلق</option>
                                    <option value="cancelled">ملغي</option>
                                </select>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn-save">{editingOrder ? "تحديث" : "حفظ"}</button>
                                <button type="button" className="btn-cancel" onClick={closeForm}>الغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default OrderModel;
