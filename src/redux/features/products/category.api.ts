import { TQueryParam, TResponseRedux } from "@/types/global.types";
import { baseApi } from "../../api/baseApi";

interface GetCategoryQueryArgs {
  id: string;
  filters?: any;
  page?: number;
  limit?: number;
}

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "category/categories",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["categories"],
      keepUnusedDataFor: 60,
    }),

    getCategory: builder.query({
      query: ({ id, filters, page, limit }: GetCategoryQueryArgs) => {
        const params = new URLSearchParams();

        if (filters) {
          params.append("filter", JSON.stringify(filters));
        }
        if (page) {
          params.append("page", page.toString());
        }
        if (limit) {
          params.append("limit", limit.toString());
        }

        return {
          url: `/category/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["categories"],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllCategoriesQuery, useGetCategoryQuery } = categoriesApi;
