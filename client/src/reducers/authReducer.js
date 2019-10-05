import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // si el payload es un string vacio retorna false
      // si es el objeto con los datos del usuario logeado, retorna el objeto (user model)
      return action.payload || false;
    default:
      return state;
  }
};
