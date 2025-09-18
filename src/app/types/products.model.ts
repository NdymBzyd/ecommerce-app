export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
  }
  
  export interface Product {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    priceAfterDiscount: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    imageCover: string;
    images: string[];
    slug: string;
    brand: Brand;
    category: Category;
    subcategory: Subcategory[];
    createdAt: string;
    updatedAt: string;
  }