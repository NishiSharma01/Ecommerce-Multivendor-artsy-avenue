// App.js
import { useEffect, useState } from 'react';
import Router from './router/Router'; // Ensure correct import
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_info } from './store/Reducers/authReducer';

function App() {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

    useEffect(() => {
        const routes = getRoutes();
        if (routes && routes.children) {
            setAllRoutes(prevRoutes => [...prevRoutes, routes]);
        } else {
            console.error('Expected routes object but got:', routes);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(get_user_info());
        }
    }, [token, dispatch]);

    return <Router allRoutes={allRoutes} />;
}

export default App;
