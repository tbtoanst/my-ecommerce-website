import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce'
import {Products, Navbar, Cart, Checkout} from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    };

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    };

    const handleAddToCart = async (producionId, quantity) => {
        const {cart} = await commerce.cart.add(producionId, quantity);
        setCart(cart);
    };

    const handleUpdateCartQty = async(productionId, quantity) => {
        const {cart} = await commerce.cart.update(productionId, {quantity});
        setCart(cart);
    }

    const handleRemoveFromCart = async(productionId) => {
        const {cart} = await commerce.cart.remove(productionId);
        setCart(cart);
    }

    const handleEmptyCart = async() => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart)

    return (
        <Router>
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart} 
                    onUpdateCartQty = {handleUpdateCartQty}
                    onRemoveFromCart = {handleRemoveFromCart}
                    onEmptyCart = {handleEmptyCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
