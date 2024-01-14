import { useProduct } from '../context/ProductContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProductsPage = () => {
  const { products } = useProduct();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((item) => (
        <Card key={item.id} style={{ maxWidth: 345, margin: 16 }}>
          <CardMedia
            component='img'
            alt={item.name}
            height='140'
            src={item.image}
            onError={(e) => {
              console.error(`Error loading image for ${item.name}:`, e);
            }}
            onLoad={() => {
              console.log(`Image loaded successfully for ${item.name}`);
            }}
          />
          <CardContent>
            <Typography variant='h6' component='div'>
              {item.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.description}
            </Typography>
          </CardContent>
          {/* Log the image URL just before rendering */}
          {console.log('Image URL:', item.image)}
        </Card>
      ))}
    </div>
  );
};

export default ProductsPage;
