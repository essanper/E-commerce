import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import firebase from 'firebase';
import { firebaseConfig } from './database';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    filterProduct: "all products"
  };

  componentDidMount() {
    this.setProducts();
  }

  filterAndOrderBy =  (filterByThis, orderByThis) => {
    let orderByThisOption = "";
    let products = [];

      if(orderByThis !== "Indiferent"){

        if(orderByThis === "Title"){
          orderByThisOption = "titulo";
        }else if(orderByThis === "Price"){
          orderByThisOption = "precio";
        }

        firebase.database().ref('productos').orderByChild(orderByThisOption).on('child_added', snap => {


          if(snap.val().grupo === filterByThis || filterByThis === "all products"){

            products.push({
              id:snap.key,
              titulo: snap.val().titulo,
              imagen: snap.val().imagen,
              precio: snap.val().precio,
              empresa: snap.val().empresa,
              descripcion: snap.val().descripcion,
              grupo: snap.val().grupo,
              comprado: snap.val().comprado,
              cantidad: snap.val().cantidad,
              total: snap.val().total
            });
          }

        });

    }else {

      firebase.database().ref('productos').on('child_added', snap => {

        if(snap.val().grupo === filterByThis || filterByThis === "all products"){
          products.push({
            id:snap.key,
            titulo: snap.val().titulo,
            imagen: snap.val().imagen,
            precio: snap.val().precio,
            empresa: snap.val().empresa,
            descripcion: snap.val().descripcion,
            grupo: snap.val().grupo,
            comprado: snap.val().comprado,
            cantidad: snap.val().cantidad,
            total: snap.val().total
          });
        }

      });

    }

     this.setState({products});

  }

  // filter = (filter) => {
  //
  //   let products = [];
  //
  //   firebase.database().ref().child('productos').on('child_added', snap => {
  //
  //     if(snap.val().grupo === filter || filter === "all products"){
  //       products.push({
  //         id:snap.key,
  //         titulo: snap.val().titulo,
  //         imagen: snap.val().imagen,
  //         precio: snap.val().precio,
  //         empresa: snap.val().empresa,
  //         descripcion: snap.val().descripcion,
  //         grupo: snap.val().grupo,
  //         comprado: snap.val().comprado,
  //         cantidad: snap.val().cantidad,
  //         total: snap.val().total
  //       });
  //     }
  //
  //   });
  //
  //   this.setState({products});
  //
  // }

  // orderBy = (order) => {
  //   let orderByThis = "";
  //   let products = [];
  //
  //   if(order === "Title") {
  //     orderByThis = "titulo";
  //
  //   } else {
  //     orderByThis = "precio";
  //
  //   }
  //
  //   firebase.database().ref('productos').orderByChild(orderByThis).on('child_added', snap => {
  //
  //       products.push({
  //         id:snap.key,
  //         titulo: snap.val().titulo,
  //         imagen: snap.val().imagen,
  //         precio: snap.val().precio,
  //         empresa: snap.val().empresa,
  //         descripcion: snap.val().descripcion,
  //         grupo: snap.val().grupo,
  //         comprado: snap.val().comprado,
  //         cantidad: snap.val().cantidad,
  //         total: snap.val().total
  //       });
  //
  //   });
  //
  //   this.setState({products});
  //
  // }

  // addProduct = () => {
  //   // PONER EN componentDidMount CON LOS DATOS RELLENADOS PARA AGREGAR EL PRODUCTO A FIREBASE
  //
  //   firebase.database().ref().child('productos').push().set({
  //     titulo: "NOMBRE",
  //     imagen: "imagenes/NOMBRE.png",
  //     precio: 0,
  //     empresa: "NOMBRE",
  //     descripcion:
  //       "Lorem NOMBRE Smashed Iphone ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
  //     comprado: false,
  //     cantidad: 0,
  //     total: 0
  //   });
  // }

  setProducts = async () => {

    let products = [];
    let cart = [];
    let cartSubTotal = 0;
    let cartTax = 0;
    let cartTotal = 0;

    await firebase.database().ref().child('productos').on('child_added', snap => {

      products.push({
        id:snap.key,
        titulo: snap.val().titulo,
        imagen: snap.val().imagen,
        precio: snap.val().precio,
        empresa: snap.val().empresa,
        descripcion: snap.val().descripcion,
        grupo: snap.val().grupo,
        comprado: snap.val().comprado,
        cantidad: snap.val().cantidad,
        total: snap.val().total
      });

      if(snap.val().comprado){
        //SI LO HEMOS COMPRADO ANTERIORMENTE SE CARGA EN LA COMPRA
        cart.push({
          id:snap.key,
          titulo: snap.val().titulo,
          imagen: snap.val().imagen,
          precio: snap.val().precio,
          empresa: snap.val().empresa,
          descripcion: snap.val().descripcion,
          grupo: snap.val().grupo,
          comprado: snap.val().comprado,
          cantidad: snap.val().cantidad,
          total: snap.val().total
        });

        // SE CALCULA EL SUBTOTAL, EL TAX Y EL TOTAL DE LO COMPRADO
        cartSubTotal += (snap.val().total);

        cartTax += (snap.val().total*0.0825);

        cartTotal = (cartTax+cartSubTotal);

      }

      this.setState({products,
        cart,
        cartSubTotal:parseFloat(cartSubTotal).toFixed(2),
        cartTax:parseFloat(cartTax).toFixed(2),
        cartTotal:parseFloat(cartTotal).toFixed(2)
        });
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = async id => {

    const producto = this.getItem(id);

    //EDITAR VARIOS CAMPOS DEL ARTICULO QUE SE VA A AGREGAR AL CARRITO
    await firebase.database().ref('productos/'+id).set({
      titulo:producto.titulo,
      imagen:producto.imagen,
      precio:producto.precio,
      empresa:producto.empresa,
      grupo: producto.grupo,
      cantidad:1,
      descripcion:producto.descripcion,
      comprado:true,
      total:producto.precio
    });

    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.comprado = true;
    product.cantidad = 1;
    const price = product.precio;
    product.total = price;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product }
      };
    }, this.addTotals);
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {

    let producto =  this.getItem(id);

    firebase.database().ref('productos/'+id).set({
      titulo:producto.titulo,
      imagen:producto.imagen,
      precio:producto.precio,
      empresa:producto.empresa,
      cantidad:producto.cantidad+1,
      descripcion:producto.descripcion,
      grupo: producto.grupo,
      comprado:producto.comprado,
      total:producto.precio * (producto.cantidad+1)
    });

    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.cantidad = product.cantidad + 1;
    product.total = product.cantidad * product.precio;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals());
  };

  decrement = id => {

    let producto =  this.getItem(id);

    firebase.database().ref('productos/'+id).set({
      titulo:producto.titulo,
      imagen:producto.imagen,
      precio:producto.precio,
      empresa:producto.empresa,
      cantidad:producto.cantidad-1,
      descripcion:producto.descripcion,
      grupo: producto.grupo,
      comprado:producto.comprado,
      total:producto.precio * (producto.cantidad-1)
    });

    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.cantidad = product.cantidad - 1;
    if (product.cantidad === 0) {
      this.removeItem(id);
    } else {
      product.total = product.cantidad * product.precio;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };

  getTotals = () => {

    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.0825;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal:parseFloat(subTotal.toFixed(2)),
      tax,
      total:parseFloat(total.toFixed(2))
    };
  };

  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total
        };
      }
    );
  };

  removeItem = id => {

    let product = this.getItem(id);

    firebase.database().ref('productos/'+id).set({
      titulo: product.titulo,
      imagen: product.imagen,
      precio: product.precio,
      empresa: product.empresa,
      descripcion: product.descripcion,
      grupo: product.grupo,
      total: 0,
      cantidad: 0,
      comprado: false
    });

    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.comprado = false;
    removedProduct.cantidad = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals());
  };

  clearCart = async () => {

    await firebase.database().ref('productos').on('child_added', snap => {

      firebase.database().ref('productos/'+snap.key).set({
        titulo: snap.val().titulo,
        imagen: snap.val().imagen,
        precio: snap.val().precio,
        empresa: snap.val().empresa,
        descripcion: snap.val().descripcion,
        grupo: snap.val().grupo,
        total: 0,
        cantidad: 0,
        comprado: false
      });

    });

    await firebase.database().ref().child('compra').remove();

    this.setState(
      () => {
        this.setProducts();
        this.addTotals();
      }
    );

  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          filterAndOrderBy: this.filterAndOrderBy
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
