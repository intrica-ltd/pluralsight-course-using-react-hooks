const speakersReducer = (state, action) => {
  function updateFavorite(favoriteValue) {
    return state.speakerList.map((item) => {
      if (item.id === action.id) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  }
  switch (action.type) {
    case 'setSpeakerList': {
      return { ...state, speakerList: action.data, isLoading: false, hasErrored: false };
    }
    case 'favorite': {
      return { ...state, speakerList: updateFavorite(true) };
    }
    case 'unfavorite': {
      return { ...state, speakerList: updateFavorite(false)};
    }
    case 'incrementFavoriteClickCount': {
      return { ...state, favoriteClickCount: state.favoriteClickCount + 1};
    }
    case 'errored': {
      return { ...state, hasErrored: true, error: action.error};
    }
    case 'forceImageRerender': {
      return { ...state, imageRerenderIdentifier: new Date().getTime()};
    }
    default:
      return state;
  }
};
export default speakersReducer;
