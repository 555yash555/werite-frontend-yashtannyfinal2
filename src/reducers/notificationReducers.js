export const getNotificationsReducer = (state= { },action)=>{
    switch(action.type)
    {
        case 'GET_NOTIFICATIONS_REQUEST':
            return { loading: true }
        case 'GET_NOTIFICATIONS_SUCCESS':
            return { loading: false, notifications: action.payload }
        case 'GET_NOTIFICATIONS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
