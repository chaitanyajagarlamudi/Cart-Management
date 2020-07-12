import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "Hackershop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: [],
                subTotal: 0,
                totalPrice: 0,
                discount: 0,
                selectedCoupon: '0'
            },
            products
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.updateCoupon = this.updateCoupon.bind(this);
    }

    addToCart(index) {
        const products = this.state.products;
        products[index].cartQuantity = 1;
        let cart = {...this.state.cart};
        cart.items.push({
            id: products[index].id,
            price: products[index].price,
            item: products[index].heading,
            quantity: 1
        });
        this.setState({
            products,
            cart,
            subTotal:cart.items.reduce(function(total,obj){return obj.price},0),
            discount:0,
            totalPrice: cart.items.reduce(function(total,obj){return obj.price},0)
        })
    }

    removeFromCart(index) {
        const products = this.state.products;
        products[index].cartQuantity = 0;
        let cart = {...this.state.cart};
        let cartIndex = this.state.cart.items.findIndex(item => item.id === products[index].id);
        cart.items.splice(cartIndex, 1);
        this.setState({
            cart,
            products
        })
    }

    updateCoupon(value) {
        let discount=0;
        let totalPrice=this.state.cart.totalPrice;

        if(value==="10"){
           discount = (10%100)* this.state.cart.subTotal;
           totalPrice = this.state.cart.subTotal - discount;
        }else if(value ==="20"){
            discount = (20%100)* this.state.cart.subTotal;
            totalPrice = this.state.cart.subTotal - discount;
        }
         this.setState({cart: {
             ...this.state.cart,
             selectedCoupon: value,
             discount,
             totalPrice
         }});
    }

    render() {

        return (
            <div>
                <nav className="app-header layout-row align-items-center justify-content-center">
                    <div className="layout-row align-items-center">
                        <img alt="" src={logo} className="logo"/>
                        <h4 id="app-title" data-testid="app-title" className="app-title">{title}</h4>
                    </div>
                </nav>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />
                    <Cart cart={this.state.cart} updateCoupon={this.updateCoupon}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        heading: "Cap - $10",
        name: "Cap",
        price: 10
    },
    {
        heading: "Hand Bag - $30",
        name: "HandBag",
        price: 30
    },
    {
        heading: "Shirt - $30",
        name: "Shirt",
        price: 30
    },
    {
        heading: "Shoes - $50",
        name: "Shoe",
        price: 50
    },
    {
        heading: "Pant - $40",
        name: "Pant",
        price: 40
    },
    {
        heading: "Slipper - $20",
        name: "Slipper",
        price: 20
    }
];
export default App;
