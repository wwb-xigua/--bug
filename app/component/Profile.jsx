import React from 'react';
import '../assets/css/profile.scss';
import { App, U } from '../common';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        U.setWXTitle("个人中心");
        this.loadProfile();
    }

    loadProfile = () => {
        App.api('usr/user/profile').then(profile => {
            this.setState({ profile });
        });
    }


    render() {
        let { profile = {} } = this.state;
        console.log(profile);
        let { nick, img, balance = 0 } = profile;
        return <div className='profile-page'>
            

        </div>;
    }
}