import {createStore} from "effector";

export const $userInfo = createStore(Telegram.WebApp.initDataUnsafe);

