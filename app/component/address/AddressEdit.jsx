import React from 'react';
import { App, U, Utils } from "../../common";
import "../../assets/css/address-edit.scss"

import { InputItem, List, Modal, Picker, Switch, TextareaItem, Toast } from 'antd-mobile';

const alert = Modal.alert;
import { EnvironmentOutlined } from '@ant-design/icons';


export default class AddressEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),
            regions: [],
            address: {},
            visible: false,
        }
    }

    componentDidMount() {
        U.setWXTitle('地址管理');
        this.loadData();
    }

    loadData = () => {
        let { id } = this.state;
        if (id && id > 0) {
            App.api('/usr/address/address', { id }).then((address) => {
                let { location } = address;
                let { code } = location;
                let codes = Utils.addr.getCodes(code);
                this.setState({ address, pickerValue: codes });
            });
        }
    };

    submit = () => {
        let { address, id } = this.state;
        address.id = id > 0 ? id : null;

        let { mobile, name, isDefault, location = {} } = address;
        let { code, detail } = location;
        if (U.str.isEmpty(name)) {
            Toast.fail("请输入收件人姓名！");
            return;
        }
        if (U.str.isEmpty(mobile)) {
            Toast.fail("请输入手机号！");
            return;
        }
        if (!U.str.isChinaMobile(mobile)) {
            Toast.fail("请输入正确手机号！");
            return;
        }
        if (U.str.isEmpty(code)) {
            Toast.fail("请输入收件人所在地区！");
            return;
        }
        if (U.str.isEmpty(detail)) {
            Toast.fail("请输入收件人详细地址");
            return;
        }
        if (detail.length > 50) {
            Toast.fail("收货地址过长");
            return;
        }
        if (U.str.isEmpty(isDefault)) {
            address.isDefault = 2;
        }
        App.api('/usr/address/save', { address: JSON.stringify(address) }).then(() => {
            Toast.success('保存成功！', 1, null, false);
            window.history.back();
        });
    };

    changeCode = (pickerValue) => {
        let { address } = this.state;
        let _code = pickerValue[2];
        this.setState({
            address: {
                ...address,
                code: _code
            },
            pickerValue
        });
    };
    syncLocation = (loc, _code) => {

        let { address = {} } = this.state;
        let { latlng = {}, poiaddress, poiname, code } = loc;

        let { location = {} } = address;
        let { detail } = location;

        location = {
            ...location,
            lat: latlng.lat,
            lng: latlng.lng,
            poiaddress, poiname, code: _code || code,
            detail: poiname || detail
        };


        this.setState({
            address: {
                ...address,
                location
            }
        });

    };

    remove = (id, index) => {
        App.api('/usr/address/remove', { id }).then(() => {
            let { list = [] } = this.state;
            list = U.array.remove(list, index);
            this.setState({ list });
            Toast.success('删除成功', 1, null, false);
            window.history.back();
        });
    };

    render() {
        let { address = {}, regions = [] } = this.state;

        let { id = 0, name, mobile, isDefault, location = {} } = address;
        let { code, detail, lat, lng, poiaddress = '', poiname = '' } = location;
        let codes = Utils.addr.getCodes(code);
        return <div className="address-edit">

            <div className='user-info'>
                <List className='name'>
                    <InputItem maxLength={10} clear={true} placeholder="收货人姓名" value={name} onChange={(e) => {
                        this.setState({
                            address: {
                                ...address,
                                name: e
                            }
                        });
                    }} />
                </List>

                <List className='address-mobile'>
                    <InputItem maxLength={11} clear={true} type={"number"} maxLength="11" value={mobile}
                        placeholder="联系方式"
                        onChange={(e) => {
                            this.setState({
                                address: {
                                    ...address,
                                    mobile: e
                                }
                            });
                        }} />

                </List>
                <List className='address' >
                    <InputItem value={poiaddress} disabled={true} placeholder="所在地区" extra={<EnvironmentOutlined onClick={() => {
                        Utils.common.locationPicker(this.syncLocation);
                    }} />}>
                    </InputItem>
                </List>
                <List className='detail'>
                    <TextareaItem rows={3} clear={true} value={detail} maxLength="50"
                        placeholder="详细地址（街道、楼牌号等）"
                        onChange={(e) => {
                            location = {
                                ...location,
                                detail: e
                            };
                            this.setState({
                                address: {
                                    ...address,
                                    location
                                }
                            })

                        }} />
                </List>

                <List.Item className='default'
                    extra={<Switch
                        color='#c4381b'
                        checked={isDefault === 1}
                        size='default'
                        onChange={(e) => {
                            this.setState({
                                address: {
                                    ...address,
                                    isDefault: e ? 1 : 2
                                }
                            });
                        }}
                    />}
                >设为默认地址</List.Item>

            </div>

            <div className='edit-bottom'>
                {id !== 0 && <div className='delete-address' onClick={() =>
                    alert('删除', '确认删除？', [
                        { text: '取消' },
                        { text: '确认', onPress: () => this.remove(id) }
                    ])
                }><span>删除</span></div>}
                <div className='save-address' onClick={() => {
                    this.submit();
                }}><span>保存</span></div>
            </div>
        </div>
    }

}
