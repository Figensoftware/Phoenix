import { ProductType } from "../types/Types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ProductCardProps {
    product: ProductType;
}


function ProductCard(props: ProductCardProps) {
    const { id, price, image, title, description, category, rating } = props.product;
    return (
        <div>
            <Card sx={{ width: "330px", height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "60px 10px", cursor: "pointer", boxShadow: "2px 4px 5px lightgray" }}>
                <img src={image} width={230} height={230} />

                <CardContent sx={{ height: "180px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title.substring(0, 40)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description.substring(0, 140)}
                    </Typography>
                </CardContent>
                <div>
                    <h2 style={{ fontFamily: "arial" }}>{price}$</h2>
                </div>
                <CardActions>
                    <Button size="small" variant="outlined" color="warning">Details</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ProductCard;
