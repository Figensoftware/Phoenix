import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import categoryService from '../services/CategoryService';
import { ProductType } from '../types/Types';
import productService from '../services/ProductService';
import { Button } from '@mui/material';

function Category() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("An error occured while fetching categories." + error);
        } finally {
            dispatch(setLoading(false));
        }
    }


    useEffect(() => {
        getAllCategories();
    }, [])


    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true));
            if (e.target.checked) {
                const products: ProductType[] = await categoryService.getProductsByCategoryName(categoryName);
                dispatch(setProducts(products));

            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("An error occurred whiled fetching product by categories.")
        } finally {
            dispatch(setLoading(false));
        }
    }


    return (
        <div className="category">
            <FormGroup>
                <Button color='warning' sx={{ borderBottom: "1px solid #bbb", textTransform: "none", fontFamily: "arial", fontSize: "16px", cursor: "default", marginBottom: "16px" }}>Categories</Button>
                {
                    categories && categories.map((category: string, index: number) => (

                        <FormControlLabel key={index}
                            control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)}
                                color='warning' />}
                            label={category} />
                    ))
                }

            </FormGroup>
        </div>
    )
}

export default Category;
