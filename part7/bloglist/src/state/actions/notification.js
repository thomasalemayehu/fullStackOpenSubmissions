const addNewNotificationAction = (type,info) =>{
    return {
      type: "notifications/addNew",
      payload: {
        'type':type,
        content: info,
      },
    };
}

const removeNotificationAction = (id) => {
  return {
    type: "notifications/remove",
    payload: id,
  };
};


export { addNewNotificationAction, removeNotificationAction };