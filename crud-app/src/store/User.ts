import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserList, userList } from '../data'



export const userSlice = createSlice({
    name: 'users',
    initialState: userList,
    reducers: {
        addUser: (state, action: PayloadAction<IUserList>) => {
            state.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<IUserList>) => {
            const {id, name, email} = action.payload
            const uu = state.find(user => user.id === id)
            if (uu) {
                uu.name = name
                uu.email = email
            }
        },
        deleteUser : (state, action) => {
            const {id} = action.payload
            const uu = state.find(user => user.id === id)
            if (uu) {
                return state.filter(user => user.id !== id)
            }
            
            
        }
    }
})

export const usersActions = userSlice.actions
export const usersReducer = userSlice.reducer