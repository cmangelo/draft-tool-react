import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { getDraftId } from '../reducers/draft';

export const Sidebar: React.FC<{ isLoggedIn: boolean }> = (props: { isLoggedIn: boolean }) => {
    const draftId: string = useSelector(getDraftId);
    const location = useLocation();

    const inDraft = () => {
        const arr = location.pathname.split('/');
        console.log(arr)
        if (arr[1] === 'drafts' && arr.length > 2)
            return true;
        return false;
    }

    const getLinks = () => {
        if (props.isLoggedIn) {
            if (inDraft()) {
                return (
                    <nav>
                        <Link to={`/drafts/${draftId}/rankings`}>
                            <FontAwesomeIcon icon="list-ol" className="icon" />
                            <div>Ranks</div>
                        </Link>

                        <Link to={`/drafts/${draftId}/board`}>
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
                        <Link to="/drafts">
                            <FontAwesomeIcon icon="list" className="icon" />
                            <div>Drafts</div>
                        </Link>
                        <Link to="/fileUpload">
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