import React from 'react';
import {useRoutes} from 'hookrouter';
import HomePage from './HomePage/HomePage';
import MoviePage from './MoviePage/MoviePage';
import LikesPage from './LikesPage';
import NotFoundPage from './NotFoundPage';

// Перечень маршрутов в приложения
const ROUTES = {
    '/': () => <HomePage/>,
    '/page/:id': ({id}) => <HomePage id={id} />,
    '/movie/:id': ({id}) => <MoviePage id={id}/>,
    '/likes': () => <LikesPage/>,
};
	
const Router = () => {
    const routeResult = useRoutes(ROUTES);
    return routeResult || <NotFoundPage/>;
}

export default Router;
