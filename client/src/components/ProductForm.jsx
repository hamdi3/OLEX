import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Input,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext ';

const ProductForm = ({ open, onClose, onProductAdded, editId, editing }) => {
  const { accessToken } = useAuth();
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, productImage: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productData.productName);
      formData.append('description', productData.productDescription);
      formData.append('price', productData.productPrice);
      formData.append('image', productData.productImage);

      const response = await axios.post(
        'http://127.0.0.1:8000/products_api/products/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Successful');

      // Reset form state
      setProductData({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImage: null,
      });

      onClose(); // Close the form
      // Notify the parent component that a new product has been added
      onProductAdded(response.data); // Pass the new product data
    } catch (error) {
      // Handle error
      console.error('Error submitting product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} editId={editId} editing={editing}>
      {!editId ? (
        <>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
              <TextField
                label='Product Name'
                name='productName'
                value={productData.productName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label='Product Description'
                name='productDescription'
                value={productData.productDescription}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                type='number'
                label='Product Price'
                name='productPrice'
                value={productData.productPrice}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              <Button variant='contained' color='primary' type='submit'>
                Add Product
              </Button>
            </form>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <form encType='multipart/form-data'>
              <TextField
                label='Product Name'
                name='productName'
                value={productData.productName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label='Product Description'
                name='productDescription'
                value={productData.productDescription}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                type='number'
                label='Product Price'
                name='productPrice'
                value={productData.productPrice}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              <Button variant='contained' color='primary' type='submit'>
                Edit Product
              </Button>
            </form>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ProductForm;
