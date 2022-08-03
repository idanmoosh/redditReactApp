import './Header.css'
import logo512 from './logo512.png'
import React ,{useState,useEffect} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { HiOutlineSearch } from 'react-icons/hi';
import { setSearchTerm } from '../../slices/redditSlice';


export function Header(){
    const dispatch=useDispatch();
    const searchTerm=useSelector((state)=> state.reddit.searchTerm)

    const [searchTermLocal,setSearchTermLocal]= useState('')
    useEffect(()=>{
        setSearchTermLocal(searchTerm);
    },[searchTerm])


    const onSubmitSearch =(e)=>{
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal))
    }
    return(
        <div className='Header'>
            <img className=' HeaderLogo' src={logo512}/>
            <h1 className='HeaderName'>Reddit-Mini</h1>
            <form className='form' onSubmit={onSubmitSearch}>
                <input className='searchInput'
                type='text' placeholder="search"
                 value={searchTermLocal}
                 onChange={e=>setSearchTermLocal(e.target.value)}
                 aria-label='search input'/>

                <button className='searchButton'
                type='submit'
                onClick={onSubmitSearch}
                aria-label='search'>

                    <HiOutlineSearch/>
                </button>
            </form>
        </div>
    )
}