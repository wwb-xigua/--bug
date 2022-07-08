import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

// import PageWrap from './component/PageWrap';
import Signin from './component/signin/Signin';
import HomeWrap from './component/HomeWrap';
import Dachboard from './component/dachboard/Dachboard';
import Classify from './component/classify/Classify';
import Profile from './component/Profile';








const routes = (
    <HashRouter>
         <Route path='/' children={() => (
        // <PageWrap>
            <Switch>
                <Redirect exact from='/' to='/signin' />

                <Route path='/signin' component={Signin} />

                <Route path='/' children={() => (
                    <HomeWrap>
                        <Switch>
                            <Route path='/dachboard' component={Dachboard} />
                            <Route path='/classify' component={Classify} />
                            <Route path='/profile' component={Profile} />
                        </Switch>
                    </HomeWrap>
                )}>
                </Route>
            </Switch>
        // </PageWrap>
        )}></Route>
    </HashRouter>
);

export default routes;
