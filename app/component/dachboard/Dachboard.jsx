import React,{ useRef, useState } from 'react';
import { CTYPE, U, App, Utils } from "../../common";
import '../../assets/css/home.scss';
import {Tabs} from 'antd-mobile'
import {DachList} from './Dachboard.H'
import classNames from 'classnames';
import {ChartWarp} from './Chart/chart'
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            activeKey:'Production',
            // isScrTopFlod:'noflod',

        };
    }
    

    componentDidMount() {
        U.setWXTitle('Dashboard');
        window.addEventListener('hashchange', () => {
            setTimeout(() => {
                Utils.common.scrollTop();
            }, 500);
        });
        var scrTop=document.querySelector('.page-value-slide')
        scrTop.addEventListener('scroll', this.handleScroll);
    }
   

    renderBoard(item,index){
        var {type='' , number=0,planNumber=0,RevisedNumber=0} =item
        var hint=CTYPE.hint ||''
        number=U.number_format(number)
        planNumber=U.number_format(planNumber)
        RevisedNumber=U.toPercent(RevisedNumber)
        return <div key={index} className={classNames(
        'board-value',
        {'board-value-noRight':index ===1 || index ===3},
        {'boand-underValue':index ===4},
        {'boand-underValue-noRight':index ===5})}>
        <div className='board-type'>{type}</div>
        <div className='board-number'>{number}</div>
        <div className='hint'>{hint}</div>
        <div className='board-footer'><div className='board-footer-left'>{planNumber}</div><div className='boart-footer-right'>{RevisedNumber}</div></div>
    </div>
    }
    renderTabTitle(name){
        var {activeKey} =this.state
        return <div className={classNames('tab-title',{'tab-title-active': activeKey === name})}>{name}</div>
    }
    handleScroll = (event)=>{
        var scrollTop  = event.srcElement.scrollTop || 0; 
        var admTabDom=document.querySelector('.adm-tabs-header') || null;
        var pageTitle = document.querySelector('.page-title') || null;
        var pageValue = document.querySelector('.page-value') || null;
        var valueContent  = document.querySelector('.value-content ') || null;
        var pageValueSlide = document.querySelector('.page-value-slide') || null;
        if (scrollTop>=410){
            if(admTabDom && pageTitle &&pageValue&& pageValueSlide&&valueContent){
                admTabDom.style.width='100vw'
                admTabDom.style.position='fixed'
                admTabDom.style.top='20vh'
                admTabDom.style.background='linear-gradient(100.55deg, #a681f4 0%, #9485f7 100%)'
                pageTitle.style.position='fixed'
                pageTitle.style.background='linear-gradient(100.55deg, #a681f4 0%, #9485f7 100%)'
                pageValue.style.height='100vh'
                pageValueSlide.style.height='100vh'
                valueContent.style.paddingTop='27.5vh'
            }
        }else{
            if(admTabDom && pageTitle &&pageValue&& pageValueSlide&&valueContent){
                admTabDom.style.width=''
                admTabDom.style.position=''
                admTabDom.style.top=''
                admTabDom.style.background=''
                pageTitle.style.position=''
                pageTitle.style.background=''
                pageValue.style.height='80vh'
                pageValueSlide.style.height='80vh'
                valueContent.style.paddingTop='40px'
            }
        }
    }

    render() {
        var TsNumber =U.number_format (133303) || 0
        var List = DachList() || []
        return <div className='home-page'>
                <div className='page-title'>
                    <div className='title-bar'>
                        <span>Dashboard</span>
                    </div>
                    <div className='TCO-STOCK'>
                        <div className='TS-Title'>
                            <div>TCO</div>
                            <div>STOCK</div>
                        </div>
                        <div className='TS-Number'>
                            {TsNumber}
                        </div>
                    </div>
                </div>
                <div className='page-value'>
                    <div className='page-value-slide'>
                        <div className='from'>
                            {List.map((item,index)=>this.renderBoard(item,index))}
                        </div>
                        <div className='tab-value'>
                        <Tabs  
                            onChange = {(e)=>this.setState ({activeKey:e})}
                            style={{ 
                                '--title-font-size': '20px',
                                '--active-title-color':'white',
                                '--active-line-color':'white',
                                '--active-line-border-radius':'50px',
                                '--active-line-height':'3px'
                                }}>
                            <Tabs.Tab title={this.renderTabTitle('Production')} key='Production' destroyOnClose={true}>
                                <div className='value-content'>
                                   <div className='value-content-cart'>
                                       <ChartWarp type={'form'}></ChartWarp>
                                   </div>
                                   <div className='value-content-cart'>
                                   <ChartWarp type={'filler'}></ChartWarp>
                                   </div>
                                   <div className='value-content-cart'>
                                   <ChartWarp type={'text'}></ChartWarp>
                                   </div>
                                   <div className='value-content-cart'>
                                        <ChartWarp type={'cake'}></ChartWarp>
                                   </div>
                                </div>
                            </Tabs.Tab>
                            <Tabs.Tab title={this.renderTabTitle('Power')} key='Power' destroyOnClose={true}>
                            <div className='value-content'>
                            <div className='value-content-cart'>
                                       <ChartWarp type={'text'}></ChartWarp>
                                   </div>
                                   <div className='value-content-cart'>
                                       <ChartWarp type={'form'}></ChartWarp>
                                   </div> 
                                    <div className='value-content-cart'>
                                       <ChartWarp type={'form'}></ChartWarp>
                                   </div>
                                   <div className='value-content-cart'>
                                       <ChartWarp type={'form'}></ChartWarp>
                                   </div>
                            </div>
                            </Tabs.Tab>
                        </Tabs>
                        </div>
                     </div>
                    </div>
        </div>;
    }
}

