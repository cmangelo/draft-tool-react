import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faBars,
    faCheckSquare,
    faDoorOpen,
    faFileUpload,
    faList,
    faListOl,
    faPencilAlt,
    faSignInAlt,
    faSquare,
    faTh,
} from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
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
	faPencilAlt);

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
		path: '/players',
		main: (props: any) => <UserRanks {...props} />
	}
]


const App: React.FC = () => {
	const loggedIn = !!localStorage.getItem('token');

	return (
		<div className="App container">
			<ConnectedRouter history={history} >
				<Sidebar isLoggedIn={loggedIn}></Sidebar>
				<div className="content">
					<Switch>
						{routes.map((route, index) => (
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