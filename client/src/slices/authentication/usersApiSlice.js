import { apiSlice } from './apiSlice'

const USERS_URL = '/users'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: data => ({
				// data.append('file', file)
				url: `${USERS_URL}/register`,
				method: 'POST',
				body: data,
			}),
		}),
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				credentials: 'include',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		getUser: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		updateUser: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				credentials: 'include',
				body: data,
			}),
		}),
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useGetUserMutation,
	useUpdateUserMutation,
} = usersApiSlice
