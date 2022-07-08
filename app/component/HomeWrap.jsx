import React from 'react';

import '../assets/css/home-wrap.scss';
import { Utils } from "../common";
import NavLink from "../common/NavLink";

    export default class HomeWrap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            setTimeout(() => {
                Utils.common.scrollTop();
            }, 500);
        });
    }

    render() {

        return <div className='home-wrap'>
            <div className='inner-page'>
                {this.props.children}
            </div>

            <div className='btm-menu'>

                <ul>
                    <li>
                        <NavLink to='/dachboard'>
                            <div className='cursor' />
                            <i className='dachboard' />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/houses'>
                            <div className='cursor' />
                            <i className='store' />
                            <p>Power</p>
                        </NavLink>
                    </li>
                    <li className='sale-wrap'>
                    <div className='left' />
                    <div className='inner'>
                        <NavLink to='/classify'>
                            <i className='sale' /><p>message</p>
                        </NavLink>
                    </div>
                    <div className='left' />
                    </li>
                    <li>
                        <NavLink to='/service'>
                            <div className='cursor' />
                            <i className='cart' />
                            <p>configuration</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile'>
                            <div className='cursor' />
                            <i className='profile' />
                            <p>profile</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>;
    }
}
