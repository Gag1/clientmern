


export function userInfoReducer(state={},action){
    if(action.type === "authenticatedUserData"){
      return {
        ...state,
        name:action.payload.name
      }
    }
    return state;
}

export function userInfoData(state) {
  return state;
}
