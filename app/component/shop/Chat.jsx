import React from 'react';
import { U, App, CTYPE } from "../../common";
import OSSWrap from '../../common/OSSWrap';
import { Badge } from 'antd';
import SockJsClient from 'react-stomp';
import classnames from 'classnames';

import UserProfile from "../UserProfile";

import '../../assets/css/page/chat/chat.scss'
import { Toast } from 'antd-mobile';
import ChatUtils from './ChatUtils';

const api_messages = '/usr/chat/messages';
const cancelMills = 2 * 60 * 1000;
export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adminWrap: this.props.match.params.adminWrap,
            user: {},
            admin: {},

            baseInfoLoaded: false,

            topic: '',

            clientConnected: false,
            online: false,
            messages: [],

            pagination: { pageSize: 20, current: 1, total: 0 },
            initializing: 1,
            last: true,

            text: '',
            img: ''

        };
        this.chatbox = null;
        this.headers = {};
    }

    componentDidMount() {

        let { adminWrap } = this.state;
        let admin = JSON.parse(decodeURIComponent(decodeURIComponent(adminWrap)));

        this.chatbox = document.getElementById('chatbox');

        U.setWXTitle(`与客服 ${admin.name} 的聊天`);

        UserProfile.get().then((user) => {
            let topic = "cs_" + admin.id + '_' + user.id;
            this.headers = ChatUtils.getHeaders({ topic });
            this.setState({ admin, user, topic, baseInfoLoaded: true, online: admin.online === 1 }, () => {
                this.loadMsgs();
            });
        });

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState == 'hidden') {
                this.hiddenTime = new Date().getTime()	//记录页面隐藏时间
            } else {
                let visibleTime = new Date().getTime();
                if ((visibleTime - this.hiddenTime) / 1000 > 10) {	//页面再次可见的时间-隐藏时间>10S,重连
                    this.clientRef.disconnect();
                    console.log('主动关闭连接后重连');
                    setTimeout(() => {
                        this.clientRef.connect();
                    }, 1500);
                } else {
                    console.log('还没有到断开的时间')
                }
            }
        });
    }

    loadMsgs = () => {

        let { pagination = {}, topic } = this.state;
        this.setState({ loaded: false });

        App.api(api_messages, {
            imQo: JSON.stringify({
                type: 2,
                topic,
                pageNumber: pagination.current,
                pageSize: pagination.pageSize
            })
        }).then((ret) => {
            let { content = [], last } = ret;
            this.forceRead(content);
            this.setState({
                messages: content.reverse(),
                pagination,
                initializing: 2,
                last,
                loaded: true
            }, () => {
                this.doScroll();
            });
        });

    };

    loadPrev = () => {
        let { pagination = {}, topic } = this.state;
        pagination.current = pagination.current + 1;
        this.setState({ loaded: false });
        App.api(api_messages, {
            imQo: JSON.stringify({
                type: 2,
                topic,
                pageNumber: pagination.current,
                pageSize: pagination.pageSize
            })
        }).then(ret => {
            let { content = [], last } = ret;
            this.forceRead(content);
            this.setState((prevState) => ({
                messages: content.reverse().concat(prevState.messages),
                pagination,
                initializing: 2,
                last,
                loaded: true
            }));
        });
    };

    connectChange = (join = true) => {
        this.setState({ clientConnected: join });
    }

    forceRead = (messages) => {
        messages.map((item) => {
            if (item.roleType === 2) {
                item.status = 2;
            }
        })
    }

    sendMsg = (act, oldMsg = {}) => {

        let { text, img, admin = {}, user = {} } = this.state;
        let msg = { act, type: 2, roleType: 3, toId: admin.id };
        if (act === 'push') {
            msg.payload = { text, img };
        } else if (act === 'read') {
            msg.payload = { readed: oldMsg };
        } else if (act === 'cancel') {
            msg.payload = { msgId: oldMsg.id }
        }
        try {
            this.clientRef && this.clientRef.sendMessage("/chat/usr/cs_send", JSON.stringify(msg), this.headers);
            this.setState({ text: '', img: '' });
            return true;
        } catch (e) {
            console.log(e);
            Toast.fail('消息发送失败', 800, null, false);
            return false;
        }
    }

    onMessageReceive = (msg) => {
        let { user = {}, admin = {} } = this.state;
        let { act, roleType, fromId, toId, payload = {} } = msg;
        if (act === 'read') {
            let { readed = {} } = payload;
            if (readed.roleType === 3 && user.id === readed.fromId) {
                let { messages = [] } = this.state;
                messages.map((m) => {
                    if (m.id === readed.id) {
                        m.status = 2;
                    }
                });
                this.setState({ messages });
            }
        } else if (act === 'push') {
            this.setState((prevState) => ({
                messages: [...prevState.messages, msg]
            }), () => {
                this.doScroll();
                !(roleType === 3 && user.id === fromId) && this.sendMsg('read', msg);
            });
        } else if (act === 'cancel') {
            let { msgId } = payload;
            let { messages = [] } = this.state;
            let index = messages.indexOf(messages.find(item => item.id === msgId) || {});
            messages[index].canceled = true;
            this.setState({ messages });
        } else if (act === 'join' || act === 'leave') {
            console.log(payload);
            let { chatUser = {} } = payload;
            if (chatUser.adminType == 'ADMIN') {
                if (admin.id === chatUser.admin.id) {
                    this.setState({ online: act === 'join' });
                }
            }
        }
    }

    doScroll = () => {
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }

    handleNewImage = (e) => {
        let img = e.target.files[0];
        if (!img || img.type.indexOf('image') < 0) {
            Toast.fail('文件类型不正确,请选择图片类型', 800, null, false);
            return;
        }
        Toast.loading('上传中');
        OSSWrap.upload(img, CTYPE.namespace.chat).then((result) => {
            this.setState({ img: result.url }, () => {
                this.sendMsg('push');
                Toast.hide();
            });
        }).catch((err) => {
            Toast.fail(err, 800, null, false);
        });
    };

    viewImgs = (url, imgs) => {
        if (typeof WeixinJSBridge !== 'undefined') {
            WeixinJSBridge.invoke('imagePreview', {
                'current': url,
                'urls': imgs
            });
        } else {
            Toast.info('当前不支放大查看', 1, null, false);
        }
    };

    render() {
        let { user = {}, admin = {}, baseInfoLoaded, messages = [], last, initializing, clientConnected, online, topic, text } = this.state;

        let pubtimes = [];
        let imgs = [];

        return <div className='chat-page'>

            <div className="chatbox" id='chatbox'>

                {!last && <a className='load-prev' onClick={this.loadPrev}>查看更早的消息</a>}
                {messages.map((item, index) => {

                    let { roleType, fromId, toId, payload = {}, createdAt, status, canceled } = item;
                    let { text, img } = payload;

                    console.log(item);

                    let _createdAt = '';
                    if (U.date.isToday(createdAt.toString())) {
                        _createdAt = U.date.format(new Date(createdAt), 'HH:mm');
                    } else {
                        _createdAt = U.date.format(new Date(createdAt), 'MM-dd HH:mm');
                    }

                    let show_time = false;
                    if (!U.array.contains(pubtimes, _createdAt)) {
                        show_time = true;
                        pubtimes.push(_createdAt);
                    }

                    if (img) {
                        imgs.push(img);
                    }

                    let self = roleType === 3 && user.id === fromId;
                    let unread = self && status === 1;
                    let cancelable = !canceled && self && new Date().getTime() - createdAt < cancelMills;

                    return <div key={index}>

                        {show_time && <div className="pub-time">{_createdAt}</div>}

                        <div className={self ? 'line line-user' : "line"}>

                            <div className="avatarblock" >
                                <img src={self ? user.avatar : admin.avatar} className={classnames({ 'offline': !self && !online })} />
                            </div>

                            <div className="msgblock">
                                <div className="uname">{self ? user.nick : admin.name}
                                    {cancelable && <a className="remove_msg"
                                        onClick={() => {
                                            if (new Date().getTime() - createdAt > cancelMills) {
                                                Toast.fail('时间太久了，不能撤销', 800, null, false);
                                                return;
                                            }
                                            this.sendMsg('cancel', item);
                                        }}>撤销</a>}
                                </div>
                                <Badge dot={unread}>
                                    {canceled && <div className='msg-wrapper canceled'>
                                        消息已撤回
                                    </div>}
                                    {!canceled && <React.Fragment>
                                        {text && <div className="msg-wrapper">
                                            <div className={'txt'}>
                                                {text}
                                            </div></div>}

                                        {img &&
                                            <img src={img + '@!120-120'} className="msg-wrapper msg-img" onClick={() => {
                                                this.viewImgs(img, imgs);
                                            }} />}
                                    </React.Fragment>}
                                </Badge>

                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                })}

            </div>


            <div className='replybox'>

                <div className="inputbox">
                    <input value={text} className="input"
                        disabled={!clientConnected}
                        onChange={(e) => {
                            this.setState({
                                text: e.target.value
                            })
                        }} />
                    <div className='add-img'>
                        <input type='file' onChange={(e) => this.handleNewImage(e)} />
                    </div>
                    <div className="btn-submit" onClick={() => this.sendMsg('push')}>发送</div>
                </div>
            </div>

            {baseInfoLoaded && <React.Fragment><SockJsClient headers={this.headers} url={App.API_BASE + '/ws-cs'} topics={["/chatroom/" + topic]}
                onMessage={this.onMessageReceive} onConnect={() => { this.connectChange(true) }}
                onDisconnect={() => { this.connectChange(false) }}
                ref={(client) => { this.clientRef = client }} debug={false} />
            </React.Fragment>}

        </div>
    }

}
