
const Notification = ({message,type}) => {
    if (message === null) {
        return null
      }
      const alertTypes = {
        error: "error",
        success: "success",
        info: "info"
      };
    return (  
        <div className={`${alertTypes[type]}`}>
            {message}
        </div>
    );
}
 
export default Notification;