import { apiSlice } from './apiSlice'

const USERS_URL = '/users'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/register`,
				method: 'POST',
				body: data,
			}),
		}),
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		updateUser: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
			}),
		}),
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useUpdateUserMutation,
} = usersApiSlice
