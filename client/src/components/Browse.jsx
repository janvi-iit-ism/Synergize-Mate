import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Member from './Member';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/authSlice';
import useGetAllUsers from '@/hooks/useGetAllUsers';


const Browse = () => {
    useGetAllUsers();
    const {allUsers} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results({allUsers.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allUsers.map((auth) => {
                            return (
                                <Member key={auth._id} auth={auth}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default Browse
