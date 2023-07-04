import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://nba-stats-app-62o4.onrender.com',
})

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User'],
	endpoints: builder => ({}),
})
