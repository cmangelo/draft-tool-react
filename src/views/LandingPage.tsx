import React from 'react';

import { Login } from './Login';

export const LandingPage: React.FC = (props: any) => {
    return (
        <div className="LandingPage">
            <div className="images">
                <img className="laptop" src={process.env.PUBLIC_URL + 'img/laptopranks.png'} alt="img" />
                <img className="phone" src={process.env.PUBLIC_URL + 'img/iphone8userRanks.png'} alt="img" />
                <div className="text">
                    <h1>Drafting made easy</h1>
                    <span>Take control of your next fantasy draft with the best tiered ranking draft tracker on the market</span>
                </div>
            </div>
            <Login {...props} />
        </div>
    );
}