import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  METAMASK_SUCCESS,
} from "../reducers/auth";
import { setAlert } from "./alert";
import axios from "axios";
import APP_URL_SERVIDOR from "../../globals";

/*import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);*/


export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/api/token/verify/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch(AUTHENTICATED_SUCCESS(null));
      } else {
        dispatch(AUTHENTICATED_FAIL(null));
      }
    } catch (err) {
      dispatch(AUTHENTICATED_FAIL(null));
    }
  } else {
    dispatch(AUTHENTICATED_FAIL(null));
  }
};

export const signup =
  (name, email, password, re_password, wallet_address) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
      wallet_address,
    });
    //console.log(body);
    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/user/register/`,
        body,
        config
      );

      if (res.status === 201) {
        dispatch(SIGNUP_SUCCESS(res.data));
        dispatch(
          setAlert("Te enviamos un correo, porfavor activa tu cuenta", "green")
        );
      } else {
        dispatch(SIGNUP_FAIL());
        dispatch(setAlert("Error al crear cuenta", "red"));
      }
    } catch (err) {
      dispatch(SIGNUP_FAIL());
      dispatch(setAlert("Error con el servidor, intenta mas tarde", "red"));
    }
  };

export const login = (email, wallet_address, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    wallet_address,
    password,
  });
  console.log(body);
  try {
    const res = await axios.post(
      `${APP_URL_SERVIDOR}/api/token/`,
      body,
      config
    );

    if (res.status === 200) {
      dispatch(LOGIN_SUCCESS(res.data));
      dispatch(setAlert("Inicio de sesión con éxito", "green"));
    } else {
      dispatch(LOGIN_FAIL());

      dispatch(setAlert("Error al iniciar sesion", "red"));
    }
  } catch (err) {
    dispatch(LOGIN_FAIL());
    dispatch(setAlert("Error al iniciar sesion. Intenta mas tarde", "red"));
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/api/token/refresh/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch(REFRESH_SUCCESS(res.data));
      } else {
        dispatch(REFRESH_FAIL());
      }
    } catch (err) {
      dispatch(REFRESH_FAIL());
    }
  } else {
    dispatch(REFRESH_FAIL());
  }
};

export const logout = () => (dispatch) => {
  console.log("cerrado actions");
  dispatch(LOGOUT());
  dispatch(setAlert("Succesfully logged out", "green"));
};

/*export const loginMetamask = () => async (dispatch) => {
  try {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];
    dispatch(METAMASK_SUCCESS(userAccount));
    console.log(userAccount);
  } catch (err) {
    console.error(err);
  }
};*/
