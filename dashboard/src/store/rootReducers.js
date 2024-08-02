import { combineReducers } from '@reduxjs/toolkit';
import OrderReducer from "./Reducers/OrderReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatReducer from "./Reducers/chatReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import productReducer from './Reducers/productReducer';
import sellerReducer from './Reducers/sellerReducer';

const rootReducer = combineReducers({
    order: OrderReducer,
    payment: PaymentReducer,
    auth: authReducer,
    category: categoryReducer,
    chat: chatReducer,
    dashboard: dashboardReducer,
    product:productReducer,
    seller:sellerReducer
});

export default rootReducer;