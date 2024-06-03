import { useActions } from '../hooks/action'
import {useAppSelector} from '../hooks/redux'
import { Link } from 'react-router-dom';
function Home() {
    const users = useAppSelector(state => state.users)
    const {deleteUser} = useActions()
    const handleDelete = (id:number) => {
        deleteUser({id: id})
    }
    return (
        <div className='container w-full m-auto'>
            <h2 className='font-bold text-4xl mt-5 mb-5'>Crud app</h2>
            <Link to='/create' className='inline-block py-2 px-4 bg-green-500 rounded-md font-medium transition-all mt-2 mb-5 hover:text-white hover:shadow-md'>Create New User</Link>
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">ID</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Email</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{user.id}</td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{user.name}</td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">{user.email}</td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <Link to={`/edit/${user.id}`}
                                        className='px-3 py-1 rounded transition-all bg-green-400 hover:shadow-md hover:text-white ml-2'>Edit</Link>

                                    <button
                                        className='px-3 py-1 rounded transition-all bg-red-400 hover:shadow-md hover:text-white ml-2' 
                                        onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Home;