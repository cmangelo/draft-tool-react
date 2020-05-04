import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { getDraftId } from '../reducers/draft';

export const Sidebar: React.FC<{ isLoggedIn: boolean }> = (props: { isLoggedIn: boolean }) => {
    const draftId: string = useSelector(getDraftId);
    const location = useLocation();
    const locationSegments = location.pathname.split('/');

    const inDraft = () => {
        return locationSegments[1] === 'drafts' && locationSegments.length > 2 && locationSegments[2] !== 'create';
    }

    const isActiveLink = (link: string) => {
        return locationSegments[locationSegments.length - 1] === link;
    }

    const getLinks = () => {
        if (props.isLoggedIn) {
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
                        <Link to="/drafts" className={isActiveLink('drafts') ? 'active' : ''}>
                            <FontAwesomeIcon icon="list" className="icon" />
                            <div>Drafts</div>
                        </Link>
                        <Link to="/drafts/create" className={isActiveLink('create') ? 'active' : ''}>
                            <FontAwesomeIcon icon={["far", "plus-square"]} className="far icon" />
                            <div>New Draft</div>
                        </Link>
                        <Link to="/fileUpload" className={isActiveLink('fileUpload') ? 'active' : ''}>
                            <FontAwesomeIcon icon="file-upload" className="icon" />
                            <div>Upload</div>
                        </Link>
                    </nav>
                );
            }
        } else {
            return (
                <nav>
                    <Link to="/login">
                        <FontAwesomeIcon icon="sign-in-alt" className="icon" />
                    </Link>
                </nav>
            );
        }
    }

    return (
        <div className="Sidebar">
            {getLinks()}
        </div>
    );
}