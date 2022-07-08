import React from 'react';
import {App, U} from '../../common';
import classnames from 'classnames';
import { MySearchBar } from '../CompsEdit';
import '../../assets/css/Classify.scss'

export default class Classify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        U.setWXTitle('全部分类');
    }
   


    render() {
       

        return <div className='classify-page'>
           
        </div>;
    }
}