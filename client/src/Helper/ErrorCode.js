export const ErrorCodes = (error,setMessage) => {
    if(error.message === 'Network Error'){
        setMessage(error.message)
    }else if(error.response.status === 504){
        setMessage('Couldnt connect to server, Please contact website developer')
    }
    else{
        setMessage(error.response.data)
    }
  };