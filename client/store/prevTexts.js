import axios from 'axios'

const numPrevTextsToSave = 10

/**
 * ACTION TYPES
 */
const ADD_PREV_TEXT = 'ADD_PREV_TEXT'
const SET_PREV_TEXTS = 'SET_PREV_TEXTS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const addPrevText = prevText => ({
  type: ADD_PREV_TEXT,
  prevText
})

const setPrevTexts = prevTexts => ({
  type: SET_PREV_TEXTS,
  prevTexts
})

/**
 * THUNK CREATORS
 */
export const fetchPrevTexts = () => async dispatch => {
  try {
    const prevTexts = await axios.get('/api/texts')
    dispatch(setPrevTexts(prevTexts))
  } catch (error) {
    console.error('Unable to fetch previous text analyses')
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PREV_TEXTS:
      return action.prevTexts
    case ADD_PREV_TEXT:
      return state.length<numPrevTextsToSave ? [action.prevText, ...state] : [action.prevText, ...state.slice(0, numPrevTextsToSave-1)]
    default:
      return state
  }
}