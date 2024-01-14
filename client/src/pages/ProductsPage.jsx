import { useProduct } from '../context/ProductContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const ProductsPage = () => {
  const { products } = useProduct();

  return (
    <Card sx={{ maxWidth: 345 }}>
      {products.map((item) => {
        const { id, name, image, description } = item;
        console.log(image, 'ds');
        return (
          <div key={id}>
            <CardMedia
              sx={{ height: 140 }}
              component='img'
              src={image}
              alt={name}
            />

            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </div>
        );
      })}
    </Card>
  );
};

export default ProductsPage;
