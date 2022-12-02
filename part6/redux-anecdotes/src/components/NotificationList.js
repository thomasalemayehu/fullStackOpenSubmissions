import { useSelector } from 'react-redux'


import Notification from './Notification'
const NotificationList = () => {
  console.log('Notification List render')
  const notifications = useSelector((state) => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {notifications.notifications.length > 0 ? (
        <div style={style}>
          {notifications.notifications.map((notification) => (
            <Notification key={notification.id} id={notification.id} content={notification.content}/>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default NotificationList