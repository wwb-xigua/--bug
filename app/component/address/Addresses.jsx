import React from 'react';
import {App, U, Utils} from "../../common";
import "../../assets/css/address.scss"


export default class Addresses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        };
    }

    componentDidMount() {
        U.setWXTitle('我的地址');
        this.loadData();
    }

    loadData = () => {
        App.api(`/usr/address/addresses`).then((addresses) => {
            console.log(addresses)
            this.setState({
                addresses
            })
        })
    };

    render() {
        let {addresses = []} = this.state;

        return <React.Fragment>
            {addresses.length !== 0 && <div className="addresses-page">
                {addresses.map((item, index) => {
                    let {id, userId, name, isDefault,location,mobile} = item;
                    let codes = Utils.addr.getPCD(location.code);
                    return <div className='address-item' key={index}>

                        <div className='user-info'>
                            <span className='name'>{name}</span>
                            <span className='mobile'>{mobile}</span>
                            {isDefault === 1 && <span className='default-address'>默认</span>}
                        </div>

                        <div className='addr-line-2'>
                            <div className='address-detail'>
                                <div className='detail' onClick={()=>App.go(`/recycle/${"000000"}/${1}`)}>{codes}&nbsp;{location.detail}</div>
                            </div>

                            <div className='icon-edit' onClick={() => {
                                App.go(`/address-edit/${id}`);
                            }}/>
                        </div>
                    </div>
                })
                }
            </div>}
            <div className='create-address' onClick={() => {
                App.go(`/address-edit/${0}`)
            }}><span>+新建收货地址</span></div>

            {addresses.length === 0 && <div className='address-empty' onClick={() => App.go(`/address-edit/${0}`)}>
                <div className='empty-icon'/>
            </div>}
        </React.Fragment>

    }
}
