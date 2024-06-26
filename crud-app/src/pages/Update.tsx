import { useState } from 'react'
import { IInput } from '../models/input'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
    const params = useParams()
    const id = Number(params.id)
    const users = useAppSelector(state => state.users)
    const existingUser = users.filter(user => user.id === Number(id))
    const {name, email} = existingUser[0]
    const navigate = useNavigate()
    const [input, setInput] = useState<IInput>({
        name: name,
        email: email
    })
    
    const [error, setError] = useState({
        minLengthError: false,
        maxLengthError: false,
    })

    const validateForm = (name:string, email:string) => {
        if (name.length === 0 || email.length === 0) {
            setError({
                ...error,
                minLengthError: true
            })
        } else {
            setError({
                ...error,
                minLengthError: false
            })
        }

        if (name.length > 30 || email.length > 30) {
            setError({
                ...error,
                maxLengthError: true
            })
        } else {
            setError({
                ...error,
                maxLengthError: false
            })
        }
    }

    const {updateUser} = useActions()

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setInput({
                ...input,
                name: e.target.value
            })
        } else {
            setInput({
                ...input,
                email: e.target.value
            })
        }
        validateForm(input.name, input.email)
    }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.name.length === 0 || input.email.length === 0) {
            setError({...error, minLengthError: true})
            return
        } 
        updateUser({
            id: id,
            name: input.name,
            email: input.email
        })
        navigate('/')
    }

    return (
        <div className='flex w-full justify-center items-center h-screen'>
            <div
                className='bg-green-400 py-11 px-14 w-5/12 flex justify-center items-center gap-3 flex-col text-white rounded-md'>
                <h2 className='font-medium text-2xl'>Update User</h2>
                <form onSubmit={handleUpdate} className='flex flex-col gap-4 justify-between items-center w-full'>
                    <div className='w-full'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name='name'
                            className='ml-3 border border-gray-300 rounded outline-none transition-all py-1 px-2 
                            text-black focus:border-black w-full'
                            placeholder='Enter name'
                            value={input.name}
                            onChange={handleChangeInput}
                            />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name='email'
                            className='ml-3 border border-gray-300 rounded outline-none transition-all py-1 px-2 text-black focus:border-black w-full'
                            placeholder='Enter email'
                            value={input.email}
                            onChange={handleChangeInput}
                            />
                    </div>
                    {error.maxLengthError ? <p className='text-red-600'>Max length 30</p>: ''}
                    {error.minLengthError ? <p className='text-red-600'>Min length 1</p>: ''}
                    <button className='py-2 px-3 bg-gray-500 rounded-md hover:shadow-md'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update