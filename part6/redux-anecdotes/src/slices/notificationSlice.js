import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
  }
}

const initialState = {
  'notifications':[]
}

const notificationSlice = createSlice({
  name:'notifications',
  initialState,
  reducers:{
    addNotification(state,action){
      state.notifications.push((action.payload))
    },

    removeNotification(state,action){
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload )
    }
  }
})


const setNotification = (content,displayTime=1) => {
  return dispatch => {
    const notification = asObject(content)
    dispatch(addNotification(notification))

    setTimeout(() => {
      dispatch(removeNotification(notification.id))
    }, displayTime*1000)
  }
}
export default notificationSlice.reducer
export const { addNotification,removeNotification } = notificationSlice.actions

export { setNotification }