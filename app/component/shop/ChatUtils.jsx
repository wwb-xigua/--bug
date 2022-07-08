import React from 'react';
import { U, App } from "../../common";
import { ActionSheet, Modal } from 'antd-mobile-v2';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const operation = Modal.operation;

const ChatUtils = {

    showCSList: () => {
        App.api('usr/chat/cs_list').then((list) => {

            let data = list.map((item) => {
                let { avatar, name, mobile, online } = item;
                console.log(online)
                return {
                    icon: <Avatar shape="square" src={avatar} size={60} icon={<UserOutlined />} style={online == 2 ? { filter: 'grayscale(100%)' } : {}} />, title: name
                };
            })

            ActionSheet.showShareActionSheetWithOptions({
                options: data,
                message: '请选择在线客服',
            },
                (index) => {
                    console.log(index);
                    if (index > -1) {
                        operation([
                            {
                                text: '在线聊天', onPress: () => {
                                    App.go('/chat/chat/' + encodeURIComponent(encodeURIComponent(JSON.stringify(list[index]))))
                                }
                            },
                            {
                                text: '拨打电话', onPress: () => {
                                    location.href = `tel:${list[index].mobile}`;
                                }
                            },
                        ])

                    }
                });
        })
    },

    getHeaders: (options = {}) => {
        let { endpoint = 'ws-cs', topic = '' } = options;
        return {
            'X-Requested-With': 'X-Requested-With',
            'user-token': App.getCookie('user-token'),
            endpoint, topic
        }
    }

}
export default ChatUtils;
