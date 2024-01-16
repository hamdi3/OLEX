import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ProductForm from '../components/ProductForm'; // Correct import

const ProductsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFabClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        <Fab color='primary' aria-label='add' onClick={handleFabClick}>
          <AddIcon />
        </Fab>
      </Box>
      <ProductForm open={isFormOpen} onClose={handleCloseForm} />
    </>
  );
};

export default ProductsPage;
