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
const HomePage = () => {
  const { products, deleteroduct } = useProduct();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ['Edit', 'Delete'];

  const ITEM_HEIGHT = 48;

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
          </CardContent>
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
                  key={option}
                  selected={option === 'Delete'}
                  onClick={() => deleteroduct(item.id)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
