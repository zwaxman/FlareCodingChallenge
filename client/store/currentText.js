import axios from 'axios'
import {addPrevText} from './prevTexts'

/**
 * ACTION TYPES
 */
const SET_CURRENT_TEXT = 'SET_CURRENT_TEXT'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
export const setCurrentText = currentText => ({
  type: SET_CURRENT_TEXT,
  currentText
})

/**
 * THUNK CREATORS
 */
export const postCurrentText = currentText => async dispatch => {
  try {
    const postedText = await axios.post('/api/texts', currentText)
    dispatch(setCurrentText(postedText))
    const postedTextForPrev = {id: postedText.id, createdAt: postedText.createdAt, fileName: postedText.fileName}
    dispatch(addPrevText(postedTextForPrev))
  } catch (err) {
    console.error('Unable to post current text analysis to database')
  }
}

export const fetchCurrentText = id => async dispatch => {
  try {
    const currentText = await axios.get(`api/texts/${id}`)
    dispatch(setCurrentText(currentText))
  } catch (error) {
    console.error('Unable to fetch selected text analysis from database')
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TEXT:
      return action.currentText
    default:
      return state
  }
}