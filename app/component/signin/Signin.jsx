import React from 'react';
import { App, U } from "../../common";
import classnames from 'classnames';
import { UserOutlined ,EyeInvisibleOutlined,EyeTwoTone,CopyrightOutlined} from '@ant-design/icons';
import { Button, message ,Input} from 'antd';

import '../../assets/css/page/signin.scss'

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 60,
            paswordType:true,
            disabled: false,
        };
        this.timerID = 0;
    }

    componentDidMount() {
        U.setWXTitle('登录');
    }

    sendValCode = () => {
        let { valCode = {} } = this.state;
        let { account } = valCode;
        let key = new Date().getTime();
        account = U.str.trim(account);
        valCode.key = key;
        App.api("common/gen_valCode", {
            valCode: JSON.stringify({
                ...valCode,
                account,
            })
        }).then(() => {
            this.startTimer();
            this.setState({
                disabled: true, valCode
            });
            message.success("验证码发送成功请注意查收");
        });
    };
    startTimer = () => {
        this.timerId = setInterval(() => {

            let { count } = this.state;

            if (count - 1 <= 0) {
                this.setState({
                    disabled: false,
                    count: 60
                });
                clearInterval(this.timerId);
            } else {
                this.setState({
                    disabled: true,
                    count: count - 1
                });
            }
        }, 1000);
    };

    codein = () => {
        let { valCode = {} } = this.state;
        let { account, code } = valCode;
        // if (!U.str.isChinaMobile(account)) {
        //     message.warn("请填写正确的手机号");
        //     return;
        // }else {
            message.success('登录成功，欢迎使用');
            setTimeout(() => {
                       App.go('/dachboard');
                    }, 1000)
        // }
        // App.api('usr/user/codein', {
        //     valCode: JSON.stringify(valCode)
        // }).then((result) => {
        //     let { merchantRecycler = {}, userSession = {} } = result;
        //     message.success('登录成功，欢迎使用');
        //     App.saveCookie('merchantRecycler-profile', JSON.stringify(merchantRecycler));
        //     App.saveCookie('user-token', userSession.token);
        //     setTimeout(() => {
        //         App.go('');
        //     }, 1000)
        // })
    };
    modValCoe = (field, val) => {
        let { valCode = {} } = this.state;
        valCode[field] = val;
        this.setState({ valCode });
    }
    EyeInvisibleOutlined (){
        return (<div onClick={this.onPsType} className='code-Eye-icon'><EyeInvisibleOutlined /></div>)
    }
    EyeTwoTone (){
        return <div onClick={this.onPsType} className='code-Eye-icon'><EyeTwoTone /></div>
    }
    onPsType = () =>{
        let { paswordType } = this.state;
        var coeeInput=document.querySelector('.code-input')
        if (paswordType){
            coeeInput.type = 'text'
            this.setState({paswordType:false})
        }else{
            coeeInput.type = 'password'
            this.setState({paswordType:true})
        }
    }
    



    render() {

        let { valCode = {}, disabled, count,paswordType } = this.state;
        let { account = "", code=""} = valCode;
        let isMobile = U.str.isChinaMobile(account);
        let isCode=U.str.isValCode(code);
        return <div className="signin-page">
            <div className='bg'>
            <div className="bg-cover">
                <div className="circle"></div>
                <div className="circle small"></div>
            </div>

                <div className='signin-top-on'>Welcome to</div>
                <div className='signin-top-under'>PT.SERVINDO JAYA UTAMA</div>


                <div className="form">
                    <div className="wrap-id">
                    <div className='us-icon'><UserOutlined style={{ color: '#08c' }}/></div>
                        <input placeholder="Userld" value={account} onChange={(e) => {
                            this.modValCoe('account', e.target.value);
                        }} /><div className='arrow'></div>

                    </div>
                    <div className='wrap-password'>
                        <div className='code-left'>
                        <div className='ps-icon'><UserOutlined style={{color: '#08c' }}/></div>
                            <input className="code-input" placeholder="Password" type='password' value={code} onChange={(e) => {
                                    this.modValCoe('code', e.target.value)
                                }} />
                                {paswordType ?this.EyeInvisibleOutlined() : this.EyeTwoTone()}
                        </div>
                        
                    </div>

                    <div className="btn" onClick={this.codein}>登录</div>
                </div>
            </div>

            <div className='slogan'><CopyrightOutlined /> 2019 , Salim Mining Group</div>
        </div>
    }
}

