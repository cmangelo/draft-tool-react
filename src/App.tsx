import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faBars,
    faCheckSquare,
    faChevronDown,
    faChevronLeft,
    faDoorOpen,
    faFileUpload,
    faList,
    faListOl,
    faPencilAlt,
    faSignInAlt,
    faSignOutAlt,
    faSquare,
    faTh,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import Modal from 'react-modal';
import { Route, Switch } from 'react-router-dom';

import { Player } from './components/Player';
import { Sidebar } from './components/Sidebar';
import { screenSizes } from './services/window';
import { history } from './store/storeConfig';
import CreateDraft from './views/CreateDraft';
import DraftArena from './views/DraftArena';
import DraftsLists from './views/DraftsList';
import { FileUpload } from './views/FileUpload';
import { Login } from './views/Login';
import UserRanks from './views/UserRanks';

library.add(faBars,
	faList,
	faFileUpload,
	faSignInAlt,
	faListOl,
	faTh,
	faDoorOpen,
	faPlusSquare,
	faSquare,
	faCheckSquare,
	faEdit,
	faPencilAlt,
	faChevronLeft,
	faChevronDown,
	faTimes,
	faSignOutAlt);

const routes = [
	{
		path: '/login',
		main: (props: any) => <Login {...props} />
	},
	{
		path: '/drafts/create',
		main: (props: any) => <CreateDraft {...props} />
	},
	{
		path: '/drafts/:draftId',
		main: (props: any) => <DraftArena {...props} />
	},
	{
		path: '/drafts',
		main: (props: any) => <DraftsLists {...props} />
	},
	{
		path: '/fileUpload',
		main: (props: any) => <FileUpload {...props} />
	},
	{
		path: '/players/:playerId',
		onlyMobile: true,
		main: (props: any) => <Player {...props} />
	},
	{
		path: '/players',
		main: (props: any) => <UserRanks {...props} />
	}
];

Modal.setAppElement('#root');

const App: React.FC = () => {
	return (
		<div className="App container">
			<ConnectedRouter history={history} >
				<Sidebar />
				<div className="content">
					<Switch>
						{routes.filter(route => !route.onlyMobile || window.innerWidth < screenSizes.S)
							.map((route, index) => (
								<Route
									key={index}
									path={route.path}
									render={(props: any) => route.main(props)} />
							))}
					</Switch>
				</div>
			</ConnectedRouter>
		</div>
	);
}

export default App;