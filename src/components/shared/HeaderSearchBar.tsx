/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useGetAllProductsQuery } from "@/redux/features/products/product.api";
import { TQueryParam } from "@/types/global.types";
import { SearchCheck as MagnifyingGlassIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { IProduct } from "@/types/products.types";

const HeaderSearchBar = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([...params]);

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setParams([{ name: "searchTerm", value: search }]);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchTerm(search);
    debouncedSearch(search);
  };

  return (
    <div className="relative flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
      <div className="w-full sm:max-w-xl">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-md bg-yellow p-2">
            <MagnifyingGlassIcon
              className="mx-auto h-5 w-5 text-white"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray500 outline-none ring-1 ring-inset ring-gray300 transition-colors duration-200 ease-in-out placeholder:text-gray300 focus:border-r-2 focus:border-gray500 focus:ring-1 focus:ring-gray400 focus:ring-opacity-50 sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          />
          {(searchTerm && isFetching) ||
            (searchTerm && isLoading && (
              <div className="absolute w-full bg-white shadow-lg mt-2 rounded-md z-10 p-4 transition-opacity duration-300 ease-in-out animate-fadeIn">
                <div className="w-full flex flex-col gap-2">
                  <div className="animate-pulse bg-gray200 h-8 rounded-md"></div>
                  <div className="animate-pulse bg-gray200 h-8 rounded-md"></div>
                  <div className="animate-pulse bg-gray200 h-8 rounded-md"></div>
                </div>
              </div>
            ))}
          {searchTerm && !isFetching && products && products.data && (
            <div className="absolute w-full max-h-60 overflow-y-auto bg-white shadow-lg mt-2 rounded-md z-10 transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn">
              {products.data.map((product: IProduct) => (
                <Link
                  href={`/products/${product._id}`}
                  key={product._id}
                  className="block border-b border-gray200 last:border-b-0"
                  onClick={() => setSearchTerm("")}
                >
                  <div className="flex items-center p-2 hover:bg-gray100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <p className="sm:text-lg text-gray500">{product.name}</p>
                      <p className="mt-2 text-sm text-gray400 truncate">
                        {product.discount_price > 0 ? (
                          <>
                            <span className="text-red mr-2">
                              {formatPrice(product.discount_price)}
                            </span>
                            <span className="text-gray500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray500">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {searchTerm &&
            !isFetching &&
            (!products || !products.data || !products.data.length) && (
              <div className="absolute w-full bg-white shadow-lg mt-2 rounded-md z-10 p-4 text-center text-gray400 transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn">
                No results found.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchBar;
