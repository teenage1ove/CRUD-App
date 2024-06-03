import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserList, userList } from '../data'

const LS_USERS_KEY = 'luk'

interface IUser {
    name: string,
    email: string,
    id: number
}

const initialState:IUser[] = [
    ...JSON.parse(localStorage.getItem(LS_USERS_KEY) ?? '[]') 
]

export const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            state.push(action.payload)
            localStorage.setItem(LS_USERS_KEY, JSON.stringify(state))
            console.log()
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            const {id, name, email} = action.payload
            const uu = state.find(user => user.id === id)
            if (uu) {
                uu.name = name
                uu.email = email
                localStorage.setItem(LS_USERS_KEY, JSON.stringify(state))
            }
            
        },
        deleteUser : (state, action) => {
            const {id} = action.payload
            const uu = state.find(user => user.id === id)
            if (uu) {
                state = state.filter(user => user.id !== id)
                localStorage.setItem(LS_USERS_KEY, JSON.stringify(state))
                return state
            }
        }
    }
})

export const usersActions = userSlice.actions
export const usersReducer = userSlice.reducer