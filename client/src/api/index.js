import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/bikes" }),
  tagTypes: ["Bikes"],
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: () => "/",
      providesTags: ["Bikes"],
      transformResponse: (response) => {
        response.forEach((bike) =>
          Object.keys(bike).forEach((prop) => {
            if (typeof bike[prop] === "string" && prop != "status") {
              bike[prop] = bike[prop].toUpperCase();
            }
          })
        );
        return response;
      },
    }),

    getBikeStats: builder.query({
      query: () => "/stats",
      providesTags: ["Bikes"],
    }),

    createBike: builder.mutation({
      query: (bikeData) => ({
        url: "/",
        method: "POST",
        body: bikeData,
      }),
      invalidatesTags: ["Bikes"],
    }),

    updateBikeStatus: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PATCH",
        body: { newStatus: data.newStatus },
      }),
      invalidatesTags: ["Bikes"],
    }),

    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bikes"],
    }),
  }),
});

export const {
  useGetBikesQuery,
  useGetBikeStatsQuery,
  useCreateBikeMutation,
  useUpdateBikeStatusMutation,
  useDeleteBikeMutation,
} = apiSlice;
