import types from '../actions/types';

const initState = {
  topic: {
    news: false,
    earthquake_mx_cdmx: false,
    earthquake_cl_santiago: false
  },
  loading: false,
  historicalEarthquakeLoading: false,
  historicalEarthquake: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.TOPIC_SUBSCRIPTION_LOADING:
      return { ...state, loading: true };
    case types.TOPIC_SUBSCRIPTION_SUCCESS:
      return { ...state, topic: { ...state.topic, ...action.payload }, loading: false };
    case types.TOPIC_SUBSCRIPTION_FAIL:
      return { ...state };
    case types.GET_HISTORICAL_DATA: 
      return { ...state, historicalEarthquakeLoading: true };
    case types.GET_HISTORICAL_DATA_SUCCESS: 
      return { ...state, historicalEarthquakeLoading: false, historicalEarthquake: action.payload };
    case types.GET_SUBSCRIBED_TOPICS:
      return { ...state, loading: true };
    case types.GET_SUBSCRIBED_TOPICS_SUCCESS:
      return { ...state, loading: false, topic: { ...state.topic, ...action.payload } };
    default:
      return state;
  }
};
