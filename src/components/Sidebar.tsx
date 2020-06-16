import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { getDraftId } from '../reducers/draft';
import { getIsUserLoggedIn } from '../reducers/user';

export const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const draftId: string = useSelector(getDraftId);
    const isUserLoggedIn: boolean = useSelector(getIsUserLoggedIn);
    const location = useLocation();
    const locationSegments = location.pathname.split('/');

    const inDraft = () => {
        return locationSegments[1] === 'drafts' && locationSegments.length > 2 && locationSegments[2] !== 'create';
    }

    const isActiveLink = (link: string, lastOnly?: boolean) => {
        if (lastOnly)
            return locationSegments[locationSegments.length - 1] === link;
        return locationSegments.some(segment => segment === link);
    }

    const logoutUser = () => {
        dispatch(logoutUser());
    }

    const getLinks = () => {
        if (inDraft()) {
            return (
                <nav>
                    <Link to={`/drafts/${draftId}/rankings`} className={isActiveLink('rankings') ? 'active' : ''}>
                        <FontAwesomeIcon icon="list-ol" className="icon" />
                        <div>Ranks</div>
                    </Link>

                    <Link to={`/drafts/${draftId}/board`} className={isActiveLink('board') ? 'active' : ''}>
                        <FontAwesomeIcon icon="th" className="icon" />
                        <div>Board</div>
                    </Link>

                    <Link to="/drafts">
                        <FontAwesomeIcon icon="door-open" className="icon" />
                        <div>Exit</div>
                    </Link>
                </nav>
            );
        } else {
            return (
                <nav>
                    <Link to="/drafts" className={isActiveLink('drafts', true) ? 'active' : ''}>
                        <FontAwesomeIcon icon="list" className="icon" />
                        <div>Drafts</div>
                    </Link>
                    <Link to="/drafts/create" className={isActiveLink('create', true) ? 'active' : ''}>
                        <FontAwesomeIcon icon={["far", "plus-square"]} className="far icon" />
                        <div>New Draft</div>
                    </Link>
                    <Link to="/players" className={isActiveLink('players') ? 'active' : ''}>
                        <FontAwesomeIcon icon="pencil-alt" className="icon" />
                        <div>My Ranks</div>
                    </Link>
                    {/* <Link to="/fileUpload" className={isActiveLink('fileUpload') ? 'active' : ''}>
                            <FontAwesomeIcon icon="file-upload" className="icon" />
                            <div>Upload</div>
                        </Link> */}
                    <Link to="/login" onClick={logoutUser}>
                        <FontAwesomeIcon icon="sign-out-alt" className="icon" />
                        <div>Log Out</div>
                    </Link>
                </nav>
            );
        }
    }

    return isUserLoggedIn ? (
        <div className="Sidebar">
            {getLinks()}
        </div>
    ) : (
            <div></div>
        );
}