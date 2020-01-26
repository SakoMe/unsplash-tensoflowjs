import React, { useReducer } from 'react';

import unsplash from '../apis/unsplash';

export const UnsplashContext = React.createContext();

const initialState = {
  images: [],
  isLoading: false,
  error: null
};

function unsplashReducer(state, action) {
  switch (action.type) {
    case 'IS_LOADING': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        images: action.payload
      };
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      throw new Error();
  }
}

export default function UnsplashProvider({ children }) {
  const [state, dispatch] = useReducer(unsplashReducer, initialState);

  const handleSearch = async term => {
    try {
      dispatch({ type: 'IS_LOADING' });
      const response = await unsplash.get('/search/photos', {
        params: {
          query: term,
          orientation: 'landscape'
        }
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data.results });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const store = {
    unsplashState: {
      ...state
    },
    unsplashActions: {
      handleSearch
    }
  };

  return (
    <UnsplashContext.Provider value={store}>
      {children}
    </UnsplashContext.Provider>
  );
}
