import { useDispatch } from 'react-redux';
import { usersActions } from '../store/User'
import { bindActionCreators } from '@reduxjs/toolkit'

const actions = {
    ...usersActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}