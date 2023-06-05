import { SET_ALERT, REMOVE_ALERT } from "../reducers/alert";

/**
 * Establece una alerta en el estado global durante un período de tiempo especificado.
 *
 * @param {string} msg - El mensaje de la alerta.
 * @param {string} alertType - El tipo de alerta ('success', 'error', 'warning', etc.).
 * @param {number} [timeout=5000] - El tiempo en milisegundos durante el cual se mostrará la alerta. Por defecto, es 5000 (5 segundos).
 * @returns {Function} Una función de envío de Redux que establece y elimina la alerta después del tiempo especificado.
 */
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    dispatch(SET_ALERT({ msg, alertType }));
    setTimeout(() => dispatch(REMOVE_ALERT()), timeout);
  };