import React from 'react';

import { App, Utils } from "../common";
import { CSIcon } from './Comps.jsx';
import SockJsClient from 'react-stomp';
import ChatUtils from './shop/ChatUtils';

const headers = ChatUtils.getHeaders({ endpoint: 'ws-bc' });
export default class PageWrap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCS: true
        }
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            setTimeout(() => {
                Utils.common.scrollTop();
            }, 500);
            this.showCS();

        });
        this.showCS();

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState == 'hidden') {
                this.hiddenTime = new Date().getTime()	//记录页面隐藏时间
            } else {
                let visibleTime = new Date().getTime();
                if ((visibleTime - this.hiddenTime) / 1000 > 10) {	//页面再次可见的时间-隐藏时间>10S,重连
                    this.clientRef.disconnect();
                    console.log('主动关闭连接后重连');
                    setTimeout(function () {
                        this.clientRef.connect();
                    }, 1500);
                } else {
                    console.log('还没有到断开的时间')
                }
            }
        });

    }

    showCS = () => {
        let hash = window.location.hash.split('#')[1];
        this.setState({ showCS: hash.indexOf('chat') === -1 })
    }

    onMessageReceive = (msg) => { }

    render() {
        let { showCS } = this.state;
        return <div>
            {this.props.children}
            {showCS && <CSIcon />}

            <SockJsClient headers={headers} url={App.API_BASE + '/ws-bc'} topics={["/chatroom/broadcast"]}
                ref={(client) => { this.clientRef = client }} onMessage={this.onMessageReceive} debug={false} />

        </div>
    }
}
