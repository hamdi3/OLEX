import { useProduct } from '../context/ProductContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProductForm from '../components/ProductForm';
const HomePage = () => {
  const { products, fetchProducts, setProducts, deletedProduct } = useProduct();
  const [editing, setEditing] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  React.useEffect(() => {
    fetchProducts();
    console.log('fetch products inside useEffect');
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;
  const options = ['Edit', 'Delete'];

  const handleEdit = (id) => {
    // Handle edit action
    console.log(id);
    setEditing(true);
    setEditId(id);
    handleClose();
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((item) => (
        <Card key={item.id} style={{ maxWidth: 345, margin: 16 }}>
          <CardMedia
            component='img'
            alt={item.name}
            height='140'
            src={item.image}
          />
          <CardContent>
            <Typography variant='h6' component='div'>
              {item.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.description}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.price}
            </Typography>
            <div>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {options.map((option) => (
                  <MenuItem
                    onClick={
                      option === 'Edit'
                        ? () => handleEdit(item.id)
                        : () => deletedProduct(item.id)
                    }
                    key={option}
                    selected={option === 'Pyxis'}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </CardContent>
        </Card>
      ))}
      {editId && (
        <ProductForm
          editId={editId}
          editing={editing}
          open={editing}
          // productDatas={products.find((item) => item.id === item.id)}
        />
      )}
    </div>
  );
};

export default HomePage;
