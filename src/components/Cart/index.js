import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.css";
import {connect} from "react-redux";
import {getOrder} from "../../actions/getOrderAction";
import {setCounter} from '../../actions/getCartAction';
import propTypes, { bool, shape } from 'prop-types';


class Cart extends React.Component{

    state ={
        cart: JSON.parse(localStorage.getItem('cart')),
        user: JSON.parse(localStorage.getItem('user')),
        order: null
    }
    componentDidMount(){
        if(this.state.user !== null){
            this.props.getOrder(this.state.user.telephone);
        }
    }
   
    getPrev(e){
        let len = this.props.order.data.length;
        let data = this.props.order.data[len -1 ];
        localStorage.setItem('cart', JSON.stringify(data));
        let oldCart = JSON.parse(localStorage.getItem('cart'));
        var count = 0;
        for(let i = 0; i < oldCart.length; i++){
            console.log(oldCart[i]);
            if(oldCart[i].hasOwnProperty('bubble')){
            count += oldCart[i].bubble.counter;
            }
            else{
            count += oldCart[i].bundle.counter;
            }
        }
    
        this.props.setCounter(count);
        this.setState({ cart : oldCart });

    }

    

    
    render(){
        if(this.state.cart !== null){
        return(

            // Render all items from the "cart" section in localstorage
            // TODO: Implement single bubble differently
            <div>
                <h1 className="h1Bundles">Cart Items</h1>
                <div className="cartDiv">
                    {this.state.cart &&
                    this.state.cart.map((item, index) => {

                    if(item.hasOwnProperty("bundle")){
                return (
                        <div key={item.bundle.id}  className="CartItem">
                            <div>
                                <h2 className="Heading">{item.bundle.counter} x {item.bundle.name}</h2>
                                <p className="BubblePrice">Price: {item.bundle.price} kr</p>
                            </div>
                        </div>
                    );
                    }
                    else{
                        return (
                        <div key={item.bubble.id} className="CartItem">
                            <div>
                                <h2 className="Heading">{item.bubble.counter} x {item.bubble.name}</h2>
                                <p className="BubblePrice">Price: {item.bubble.price} kr</p>
                            </div>
                        </div>
                    );
                    }
                    })}
                    <NavLink className="checkoutbtn" to="/cart/checkout" exact>Proceed to Checkout</NavLink>  
                </div>
            </div>   
        )
    }
    else{
        return (
            <div>
                <h1 className="h1Bundles">No items in cart</h1>
                { this.state.user !== null ? (<div>
                    <input
                    type="submit"
                    value="Get previous order"
                    className="Button"
                    onClick={e => this.getPrev(e)}
                    />
                </div>
                ) : null }
            </div>
        )
    }
}}
const mapStateToProps = (state) => {
    return {order: state.order, counter: state.counter}
  }
  
  const mapDispatchToProps = {
    getOrder,
    setCounter
  }

  Cart.protoTypes = {
      // cart array
    cart: propTypes.arrayOf({
        //cart counter
        counter: propTypes.number.isRequired
    }).isRequired
  }

  export default connect(mapStateToProps, mapDispatchToProps) (Cart);