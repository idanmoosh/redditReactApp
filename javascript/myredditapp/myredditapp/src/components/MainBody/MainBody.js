import './MainBody.css'
import React,{useEffect} from 'react'
import { fetchPosts, setSearchTerm, fetchComments, selectFilteredPosts } from '../../slices/redditSlice'
import { useSelector, useDispatch } from 'react-redux';
import {Post} from '../Post/Post'


export function MainBody(){
    const reddit = useSelector((state)=> state.reddit);
    const {isLoading, error, searchTerm, selectedSubreddit} =reddit;
    const posts=useSelector(selectFilteredPosts);
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(fetchPosts(selectedSubreddit))
    },[selectedSubreddit]);

    const onToggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index,permalink));
        };
        return getComments;
    }
    if (isLoading) {
        return <div className='Loading'>
            <h2>Please wait while loading</h2>
        </div>
    }
    if (error) {
        return (
          <div className="error">
            <h2>Failed to load posts.</h2>
            <button
              type="button"
              onClick={() => dispatch(fetchPosts(selectedSubreddit))}
            >
              Try again
            </button>
          </div>
        );
      }

    if (posts.length === 0) {
        return (
        <div className="error">
            <h2>No posts matching "{searchTerm}"</h2>
            <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
            Go home
            </button>
        </div>
        );
    }



    return (
        <div className='mainContainer'>
          {posts.map((post, index) => (
            <Post
              key={post.id}
              post={post}
              onToggleComments={onToggleComments(index)}
            />
          ))}
        </div>
      );
}