/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Checkbox, Slider, SliderValue } from "@nextui-org/react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { debounce } from "lodash";

interface VariantOption {
  name: string;
  value: string;
  _id: string;
}

interface FilterOptions {
  priceRange?: {
    min: number;
    max: number;
  };
  variants?: {
    [key: string]: VariantOption[];
  };
}

interface Props {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const ProductsFilterDesktop = ({ filters, onFilterChange }: Props) => {
  const initialMin = filters.priceRange?.min || 0;
  const initialMax = filters.priceRange?.max || 1000;

  const [priceRange, setPriceRange] = useState<number[]>([
    Math.max(initialMin, 0),
    Math.min(initialMax, 1000),
  ]);

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const debouncedFilterChange = useCallback(
    debounce((newFilters: FilterOptions) => {
      onFilterChange(newFilters);
    }, 300),
    []
  );

  useEffect(() => {
    const newFilters = {
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      variants: selectedFilters,
    };
    debouncedFilterChange(newFilters as unknown as FilterOptions);
  }, [selectedFilters, priceRange]);

  const handleCheckboxChange = (
    sectionId: string,
    optionValue: string,
    checked: boolean
  ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = [];
      }

      if (checked) {
        updatedFilters[sectionId] = [...updatedFilters[sectionId], optionValue];
      } else {
        updatedFilters[sectionId] = updatedFilters[sectionId].filter(
          (val) => val !== optionValue
        );
      }

      return updatedFilters;
    });
  };

  const filterVariants = filters?.variants || {};
  const filterSections = Object.keys(filterVariants).map((key) => ({
    id: key,
    name: key,
    options: filterVariants[key].map((option) => ({
      value: option.value,
      label: option.name,
    })),
  }));

  return (
    <div className="sticky top-0 bg-white border border-gray100 rounded-lg p-4 hidden lg:block">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <Slider
          label="Price Range"
          formatOptions={{ style: "currency", currency: "USD" }}
          step={10}
          maxValue={
            filters.priceRange?.max ? filters.priceRange.max + 100 : 1000
          }
          minValue={filters.priceRange?.min || 0}
          value={priceRange}
          onChange={(value: SliderValue) => setPriceRange(value as number[])}
          className="w-full"
          color="foreground"
        />
        <p className="text-sm text-gray-500 mt-2">
          Selected budget: {priceRange.map((b) => `$${b}`).join(" – ")}
        </p>
      </div>

      {filterSections.map((section) => (
        <Disclosure
          as="div"
          defaultOpen={true}
          key={section.id}
          className="mb-4"
        >
          {({ open }) => (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium">
                <Disclosure.Button className="flex w-full items-center justify-between py-2 text-gray-600 hover:text-gray-900">
                  <span>{section.name}</span>
                  <span className="ml-3 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="mt-2">
                <div className="space-y-2">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`filter-${section.id}-${optionIdx}`}
                        color="default"
                        isSelected={
                          selectedFilters[section.id]?.includes(option.value) ||
                          false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            section.id,
                            option.value,
                            e.target.checked
                          )
                        }
                      >
                        {section.id === "Color" ? (
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: option.value }}
                            />
                            {option.label}
                          </div>
                        ) : (
                          option.label
                        )}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default ProductsFilterDesktop;
