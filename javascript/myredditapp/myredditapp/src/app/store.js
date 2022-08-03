import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../slices/redditSlice'
import subRedditReducer from '../slices/subRedditSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    subreddits: subRedditReducer,
  },
});
