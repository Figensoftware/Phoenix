import { Button, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setDrawer, updateBalance } from "../redux/appSlice";
import { ProductType, UserType } from "../types/Types";
import { useEffect } from "react";
import { calculateBasket, removeProductFromBasket, setBasket } from "../redux/basketSlice";
import { toast } from "react-toastify";


function BasketDetail() {
    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])


    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }


    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId));
    }

    const buy = () => {

        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Your balance is not sufficient.");
            return;
        }
        if (currentUser?.balance) {
            const remainingTotal = currentUser.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remainingTotal
            }
            dispatch(updateBalance(payload));
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast("Products have been purchased.");
        }
    }



    return (
        <div>
            <Drawer open={drawer} anchor="right" onClose={closeDrawer}>
                <div className="my-basket">My Basket</div>
                {basket && basket.map((product: ProductType, index: number) => (
                    <div key={index} className="drawer">
                        <div>
                            <img src={product.image} />
                        </div>
                        <div className="drawer-info">
                            <div className="drawer-title">{product.title.substring(0, 30)}</div>
                            <div className="drawer-desc">{product.description.substring(0, 40)}...</div>
                        </div>

                        <div className="drawer-count">({product.count})</div>
                        <div className="drawer-price">{product.price}$</div>
                        <div>
                            <Button onClick={() => removeProduct(product.id)} size="small" color="warning" variant="outlined" sx={{ textTransform: "none" }}>Discard</Button>
                        </div>
                    </div>
                ))}

                <div className="total">
                    {basket.length > 0 ?
                        <>
                            <b className="total-amount">Total Amount: {totalAmount.toFixed(2)}$</b>
                            <Button onClick={buy} size="small" color="warning" variant="contained" sx={{ textTransform: "none" }}>Buy</Button>
                        </>
                        :
                        <b>You don't have any products in your basket.</b>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default BasketDetail;
