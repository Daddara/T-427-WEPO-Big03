import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import "./detailstyles.css";



//This needs work

// addToCart(e, bubble);{
//     e.preventDefault();
//     console.log("Adding to cart..");
//     // Check if cart exists, otherwise create a new array for cart
//     if(localStorage.getItem('cart') == null){
//         localStorage.setItem('cart', '[]');
//     }
//     var prevData = JSON.parse(localStorage.getItem('cart'));
//     var the_bubble = {"bubble" : bubble}
//     prevData.push(the_bubble);
//     localStorage.setItem('cart', JSON.stringify(prevData));
//     console.log(localStorage.getItem('cart'));
//   }


const BubbleDetails =() =>{
    const location = useLocation();
    console.log(location);
    

    let bubble = location.state.bubble;

    return (
        <div className = "Bubble">
            <div key={bubble.id} className="Details">
                <div>
                    <img className="Img" src={bubble.image} alt={bubble.name} />
                </div>
                <div>
                    <div className="Heading">
                        <h2>{bubble.name}</h2>
                    </div>
                <div>
                    <p className="BubbleDetails">{bubble.description}</p>
                    <p className="BubblePrice">Price: {bubble.price} kr</p>
                </div>
                    <button className="CartButton" onClick={e => this.addToCart(e, bubble)}>Add to cart</button>                
                </div>
            </div>
        </div>
        )      
    }


export default BubbleDetails;