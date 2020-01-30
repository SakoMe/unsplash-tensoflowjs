import React, { useReducer } from 'react';

import unsplash from '../apis/unsplash';
import history from '../history';

export const UnsplashContext = React.createContext();

const initialState = {
  images: [],
  image: null,
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
    case 'FETCH_ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case 'SEARCH_IMAGES': {
      return {
        ...state,
        isLoading: false,
        images: action.payload
      };
    }
    case 'FETCH_SINGLE_IMAGE': {
      return {
        ...state,
        isLoading: false,
        image: action.payload
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
          orientation: 'landscape',
          per_page: 6
        }
      });
      dispatch({ type: 'SEARCH_IMAGES', payload: response.data.results });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const getSingleImage = async id => {
    try {
      dispatch({ type: 'IS_LOADING' });
      const response = await unsplash.get(`/photos/${id}`);
      dispatch({ type: 'FETCH_SINGLE_IMAGE', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
    history.push(`/images/${id}`);
  };

  const store = {
    unsplashState: {
      ...state
    },
    unsplashActions: {
      handleSearch,
      getSingleImage
    }
  };

  return (
    <UnsplashContext.Provider value={store}>
      {children}
    </UnsplashContext.Provider>
  );
}
