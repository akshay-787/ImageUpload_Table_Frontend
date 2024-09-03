import React, { useState } from 'react';
import { useItemContext } from '../context/ItemContext';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

const AddItemForm = () => {
    const { addItem } = useItemContext();
    const initialValues = () => ({
        image: '',
        title: '',
        description: '',
        quantity: '',
        price: '',
        date: ''
    });

    const initialErrors = () => ({
        image: '',
        title: '',
        description: '',
        quantity: '',
        price: '',
        date: ''
    });
    const [forms, setForms] = useState([{ id: Date.now(), values: initialValues(), errors: initialErrors() }]);


    const addMultipleForm = () => {
        setForms([...forms, { id: Date.now(), values: initialValues(), errors: initialErrors() }]);
    };

    const removeForm = (index) => {
        if (forms.length > 1) {
            setForms(forms.filter((_, i) => i !== index));
        }
    };

    const handleChange = (e, index) => {
        const { name, value, files } = e.target;
        const updatedForms = [...forms];
        
        if (name === 'image') {
            updatedForms[index].values[name] = files[0];
        } else {
            updatedForms[index].values[name] = value;
        }

        if (updatedForms[index].errors[name]) {
            updatedForms[index].errors[name] = '';
        }

        setForms(updatedForms);
    };

    const validateForm = (form) => {
        const { image, title, description, quantity, price, date } = form.values;
        let isValid = true;
        const errors = { ...form.errors };

        if (!image) {
            errors.image = 'Image is required';
            isValid = false;
        }
        if (!title) {
            errors.title = "Title is required";
            isValid = false;
        }
        if (!description) {
            errors.description = "Description is required";
            isValid = false;
        } else if (description.length > 250) {
            errors.description = "Description should not be greater than 250";
            isValid = false;
        }
        if (!quantity) {
            errors.quantity = "Quantity is required";
            isValid = false;
        }
        if (!price) {
            errors.price = "Price is required";
            isValid = false;
        }
        if (!date) {
            errors.date = "Date is required";
            isValid = false;
        }

        setForms(forms.map((f, i) => (i === form.index ? { ...f, errors } : f)));
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        for (let i = 0; i < forms.length; i++) {
            if (!validateForm({ ...forms[i], index: i })) {
                isValid = false;
            }
        }

        if (!isValid) {
            return;
        }
        

        forms.forEach(form => {
            addItem(form.values);
        });

        setForms([{ id: Date.now(), values: initialValues(), errors: initialErrors() }]);
    };

    return (
        <div className="card">
            <div className="card-body">
                <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                    {forms.map((form, index) => (
                        <div key={form.id} className="form-section">
                            <div className="col-md-2">
                                <input
                                    className={`form-control ${form.errors.image ? 'is-invalid' : ''}`}
                                    type="file"
                                    id={`image-${index}`}
                                    name="image"
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder='Image'
                                />
                                {form.errors.image && <div className="invalid-feedback">{form.errors.image}</div>}
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="text"
                                    className={`form-control ${form.errors.title ? 'is-invalid' : ''}`}
                                    id={`title-${index}`}
                                    name='title'
                                    onChange={(e) => handleChange(e, index)}
                                    value={form.values.title}
                                    placeholder='Title'
                                />
                                {form.errors.title && <div className="invalid-feedback">{form.errors.title}</div>}
                            </div>
                            <div className="col-md-3">
                                <textarea
                                    className={`form-control ${form.errors.description ? 'is-invalid' : ''}`}
                                    id={`description-${index}`}
                                    name='description'
                                    onChange={(e) => handleChange(e, index)}
                                    value={form.values.description}
                                    placeholder='Description'
                                />
                                {form.errors.description && <div className="invalid-feedback">{form.errors.description}</div>}
                            </div>
                            <div className="col-md-1">
                                <input
                                    type="number"
                                    className={`form-control ${form.errors.quantity ? 'is-invalid' : ''}`}
                                    id={`quantity-${index}`}
                                    name='quantity'
                                    onChange={(e) => handleChange(e, index)}
                                    value={form.values.quantity}
                                    placeholder='Quantity'
                                />
                                {form.errors.quantity && <div className="invalid-feedback">{form.errors.quantity}</div>}
                            </div>
                            <div className="col-md-1">
                                <input
                                    type="text"
                                    className={`form-control ${form.errors.price ? 'is-invalid' : ''}`}
                                    id={`price-${index}`}
                                    name='price'
                                    onChange={(e) => handleChange(e, index)}
                                    value={form.values.price}
                                    placeholder='Price'
                                />
                                {form.errors.price && <div className="invalid-feedback">{form.errors.price}</div>}
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="date"
                                    className={`form-control ${form.errors.date ? 'is-invalid' : ''}`}
                                    id={`date-${index}`}
                                    name='date'
                                    onChange={(e) => handleChange(e, index)}
                                    value={form.values.date}
                                    placeholder='Date'
                                />
                                {form.errors.date && <div className="invalid-feedback">{form.errors.date}</div>}
                            </div>
                            <div className="col-md-1 d-flex align-items-center">
                                {index === 0 ? (
                                    <IoMdAddCircleOutline onClick={addMultipleForm} />
                                ) : (
                                    <IoMdRemoveCircleOutline onClick={() => removeForm(index)} />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemForm;
