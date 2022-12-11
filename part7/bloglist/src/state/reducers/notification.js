const initialState = {
  allNotifications: [],
};
const getID = () => {
  return Math.floor((1 + Math.random() * 100) * 0x10000000000).toString(16);
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "notifications/addNew":
      return {
        allNotifications: state.allNotifications.concat({
          ...action.payload,
          id: getID(),
        }),
      };

    case "notifications/remove":
      const nots = state.allNotifications.filter(
        (notification) => notification.id !== action.payload
      );

      return { allNotifications: nots };

    default:
      return state;
  }
};

export default notificationReducer;
