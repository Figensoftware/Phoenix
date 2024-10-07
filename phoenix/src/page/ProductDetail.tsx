import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import { ProductType } from "../types/Types";
import productService from "../services/ProductService";
import { Button, Container } from "@mui/material";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addProductToBasket } from "../redux/basketSlice";


function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>();
    const [count, setCount] = useState<number>(0);


    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await productService.getProductById(productId);
            setProduct(product);

        } catch (error) {
            toast.error("An error occurred while fetching product details." + error);
        } finally {
            dispatch(setLoading(false));
        }
    }


    useEffect(() => {
        getProductById(Number(productId));
    }, [])


    const addBasket = () => {
        if (product) {
            const payload: ProductType = {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload));
            toast.success("Product added basket successfully.");
        }
    }



    return (
        <div>
            <Container maxWidth="lg" >
                {product &&
                    <div className="product-detail">
                        <div>
                            <img src={product.image} />
                        </div>
                        <div className="detail-info">
                            <div className="detail-title">{product.title}</div>
                            <div className="detail-desc">{product.description}.</div>
                            <div className="detail-price">{product.price}$</div>

                            <div className="counter">
                                <CiCirclePlus className="icons" onClick={() => setCount(count + 1)} />
                                <span className="count">{count}</span>
                                <CiCircleMinus className="icons" onClick={() => setCount(count - 1)} />
                            </div>

                            <div>
                                <Button onClick={addBasket} variant="contained" size="small" color="warning" sx={{ textTransform: "none", marginTop: "25px" }}>Add to basket</Button>
                            </div>

                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}

export default ProductDetail;
