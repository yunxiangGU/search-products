"use client";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { Provider } from "react-redux";
import { store } from "./store";

enum ProductType {
  Electronics = "Electronics",
  Sporting_Goods = "Sporting Goods",
  Garden = "Garden",
  Home = "Home",
}

export type Product = {
  name: string;
  price: number;
  type: ProductType;
  inStock: boolean;
};

// products are hard-coded for this demo
// while in real use case would implement "add/edit/delete" product feature
const products: Product[] = [
  {
    name: "Galaxy S20+",
    price: 800,
    type: ProductType.Electronics,
    inStock: true,
  },
  {
    name: "iPod Touch",
    price: 75,
    type: ProductType.Electronics,
    inStock: false,
  },
  {
    name: "iPhone 7",
    price: 650,
    type: ProductType.Electronics,
    inStock: true,
  },
  {
    name: "Nexus 7",
    price: 550,
    type: ProductType.Electronics,
    inStock: false,
  },
  {
    name: "Football",
    price: 10,
    type: ProductType.Sporting_Goods,
    inStock: true,
  },
  {
    name: "Baseball",
    price: 15,
    type: ProductType.Sporting_Goods,
    inStock: false,
  },
  {
    name: "Basketball",
    price: 20,
    type: ProductType.Sporting_Goods,
    inStock: true,
  },
  {
    name: "Water Fountain",
    price: 25,
    type: ProductType.Garden,
    inStock: false,
  },
  { name: "Lights", price: 30, type: ProductType.Garden, inStock: true },
  { name: "Cutlery Set", price: 30, type: ProductType.Home, inStock: false },
  { name: "Couch Cusion", price: 20, type: ProductType.Home, inStock: true },
  { name: "Alarm Clock", price: 35, type: ProductType.Home, inStock: false },
  {
    name: "Nest Doorbell",
    price: 300,
    type: ProductType.Home,
    inStock: true,
  },
];

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center bg-gray-300">
        <div className="w-full h-20 bg-yellow-400 drop-shadow" />
        <div className="pt-10 text-2xl font-bold">Search Products</div>
        <FilterBar />
        <div className="flex items-center overflow-x-scroll w-[1400px] justify-center">
          {Object.values(ProductType)
            .filter((key) => isNaN(Number(key)))
            .map((productType, index) => {
              return (
                <ProductCard
                  key={index}
                  type={productType.toString()}
                  products={products.filter(
                    (product: Product) => product.type === productType
                  )}
                />
              );
            })}
        </div>
      </main>
    </Provider>
  );
}
