export interface OrderUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Product {
    id: string;
    _id: string;
    title: string;
    imageCover: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    subcategory: Subcategory[];
    category: Category;
    brand: Brand;
  }
  
  export interface CartItem {
    _id: string;
    count: number;
    price: number;
    product: Product;
  }
  
export interface OrderDetails {
    _id: string;
    __v: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    isPaid: boolean;
    isDelivered: boolean;
    paymentMethodType: string;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    shippingAddress: ShippingAddress;
    user: OrderUser;
    cartItems: CartItem[];
}