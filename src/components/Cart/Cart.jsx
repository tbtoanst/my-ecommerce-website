import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom'
import useStyles from './styles'

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();
  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        you have no items in your shopping cart.
        <Link to='/' className={classes.link}>Start adding some!</Link>  
      </Typography>
    );
  };
  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={cart.id}>
              <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button onClick={()=>onEmptyCart()} className={classes.emptyButton} type='button' size='large' variant='contained' color='secondary' >Empty</Button>
                <Button component={Link} to='/checkout' className={classes.checkoutButton} type='button' size='large' variant='contained' color='primary' >Checkout</Button>
            </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar}></div>
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
