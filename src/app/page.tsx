import { getProducts } from "@/actions/products.action";
import ProductsGrid from "@/components/products-components/ProductsGrid";
import CategorySlider from "@/components/slider-comps/CategorySlider";
import MainSlider from "@/components/slider-comps/MainSlider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(options)
  console.log(session, "session at home page");

  const {data : products} = await getProducts()

  // console.log(products, "data from products");
  
  
  return (
<div className="text-center text-3xl bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200">
  <MainSlider/>
  
  <div className="my-5 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 rounded-4xl mx-10">
  <CategorySlider/>
  </div>
      <div className="my-5 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 rounded-4xl mx-10">
        <ProductsGrid products={products} />
      </div>
</div>
  );
}
