export interface Brands{
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Category{
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface SubCategory{
    _id: string;
    name?: string;
    slug?: string;
    category?: string;
}

export interface Review{
    //If needed
}

export interface ProductDetails {

    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: Category;
    brand: Brands;
    subcategory: SubCategory[];
    quantity: number;
    sold: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    imageCover: string;
    images: string[];
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;

}