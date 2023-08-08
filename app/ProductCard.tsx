import React, { useState } from "react";
import { Product } from "./page";
import { useAppSelector } from "./hooks";
import { selectInStockOnly, selectSearchInput } from "./slice";
import { ArrowUpDown } from "./icons";

export default function ProductCard(props: {
  type: string;
  products: Product[];
}) {
  const searchInput = useAppSelector(selectSearchInput);
  const inStockOnly = useAppSelector(selectInStockOnly);
  const [sortByColumn, setSortByColumn] = useState<string>("name");
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  function handleSortByClick(type: string) {
    if (sortByColumn === type) {
      setSortAscending(!sortAscending);
    } else {
      setSortByColumn(type);
      setSortAscending(true);
    }
  }

  return (
    <div className="flex flex-col shrink-0 items-center bg-white m-6 py-10 px-6 rounded drop-shadow w-[270px] h-[350px] overflow-y-scroll select-none">
      <div className="font-bold text-lg">{props.type}</div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th
              className="border-b text-start p-2 cursor-pointer"
              onClick={() => handleSortByClick("name")}
            >
              <div className="flex items-center">
                <div>Name</div>
                <div
                  className={
                    sortByColumn === "name" ? "text-blue-700" : "text-black"
                  }
                >
                  <ArrowUpDown />
                </div>
              </div>
            </th>
            <th
              className="border-b text-start p-2 cursor-pointer"
              onClick={() => handleSortByClick("price")}
            >
              <div className="flex items-center">
                <div>Price</div>
                <div
                  className={
                    sortByColumn === "price" ? "text-blue-700" : "text-black"
                  }
                >
                  <ArrowUpDown />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.products
            .filter((product: Product) =>
              product.name
                .toLowerCase()
                .includes(searchInput?.toLowerCase() ?? "")
            )
            .filter((product: Product) =>
              inStockOnly ? product.inStock : true
            )
            .sort(function (productA: Product, productB: Product) {
              if (sortByColumn === "name") {
                if (productA.name.toLowerCase() < productB.name.toLowerCase()) {
                  return sortAscending ? -1 : 1;
                } else if (
                  productA.name.toLowerCase() > productB.name.toLowerCase()
                ) {
                  return sortAscending ? 1 : -1;
                }
              } else if (sortByColumn === "price") {
                if (productA.price < productB.price) {
                  return sortAscending ? -1 : 1;
                } else if (productA.price > productB.price) {
                  return sortAscending ? 1 : -1;
                }
              }
              return 0;
            })
            .map((product: Product, index: number) => {
              return (
                <tr key={index}>
                  <td className="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {product.name}
                  </td>
                  <td className="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis text-end">
                    {`\u00A3${product.price.toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
