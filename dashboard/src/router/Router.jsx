// router/Router.js

import PropTypes from 'prop-types';
import { useRoutes } from 'react-router-dom';

const Router = ({ allRoutes }) => {
    const defaultRoutes = [
        {
            path: '*',
            element: <div>404 Not Found</div>, // A fallback component or page
        },
    ];
    
    const routes = useRoutes(allRoutes.length ? allRoutes : defaultRoutes);
    return routes;
};

Router.propTypes = {
    allRoutes: PropTypes.array.isRequired,
};

export default Router;
