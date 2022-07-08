
import React from 'react';
import { App, CTYPE, U, Utils } from "../common";
import PropTypes from 'prop-types';
import { Modal,Button} from "antd";
import '../assets/css/compsEdit.scss'

class TitleBar extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        type: PropTypes.number,
        more: PropTypes.object,
        salesCallback: PropTypes.func,
        merchantCallback: PropTypes.func
    };

    static defaultProps = {
        type: 1,
    };

    render() {
        let { title, more, type, salesCallback, merchantCallback } = this.props;

        return <div className='title-bar'>
            <p>{title}</p>

            {type !== 0 && <React.Fragment>{(type === 1) ? <React.Fragment>{more &&
                <span className='more' onClick={() => U.redirect.redirectByAction(more)}>更多<div className='arrow'></div></span>}</React.Fragment> :
                <React.Fragment>
                    {(type === 2 && salesCallback) &&
                        <div className='title-bar-right'><span onClick={() => {
                            salesCallback();
                        }}>换一换</span>
                            <div className='icon-more' />
                        </div>}
                    {(type === 2 && merchantCallback) &&
                        <div className='title-bar-right'><span onClick={() => {
                            merchantCallback();
                        }}>换一换</span>
                            <div className='icon-more' />
                        </div>}


                </React.Fragment>}</React.Fragment>}

        </div>;

    }
}
class Sales extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
    };
    render() {
        let { list = [] } = this.props;
        return <ul>
            {list.map((v, i) => {
                let { icon, categorieId } = v;
                return <li key={i}>
                    <img src={icon} />

                </li>
            })}
        </ul>
    }
}

class Flow extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
    };
    render() {
        let { list = [] } = this.props;
        return <ul>
            {list.map((flow, f) => {
                let { icon, name } = flow;
                return <li key={f}>
                    <div className="img">
                        <img src={icon} />
                        <div className="extra">
                            <div className="c"></div>
                            <div className="tri"></div>
                            <div className="c"></div>
                        </div>
                    </div>
                    <p>{name}</p>
                </li>
            })}
        </ul>

    }
}


class Guarantee extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
    };
    render() {
        let { list = [] } = this.props;
        return <ul>
            {list.map((t, i) => {
                let { icon, name, type } = t;
                return <li key={i}>
                    <div className='val'>
                        <p>{name}</p>
                        <div className="desc">
                            {type}
                        </div>
                    </div>
                    <img src={icon} />
                </li>
            })}

            <div className='clearfix' />
        </ul>

    }
}

class ArticleList extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
    };

    render() {

        let { list = [] } = this.props;

        return <React.Fragment>
            <ul className='article-list'>
                {list.map((article, index) => {
                    let { id, img, title, intro } = article;
                    return <li key={index} onClick={() => {
                        App.go(`/article/${id}`);
                    }} className='article-item'>
                        <img className='article-logo' src={img} />
                        <div className='info'>
                            <div className='title'>{title}</div>
                            <div className='intro'>{intro}</div>
                        </div>
                    </li>;
                })}

            </ul>

            <div className='clearfix' />
        </React.Fragment>
    }

}
const id_div_recycle = 'div_recycle_drawer';

const id_div = 'div-dialog-msg-success';

class RecycleSucceed extends React.Component{
    render(){
    return<Modal
            getContainer={() => Utils.common.createModalContainer(id_div)}
            visible={true}
            closable={false}
            maskClosable={false}
            width="80vw"
            footer={null}>
            <div className="cover"></div>
            <div className="txt">您的预约信息已经推送给回收员，为了能尽快与您对接，请保持电话畅通</div>
            <div className="btn">
                <Button type="primary" onClick={() => {
                    Utils.common.closeModalContainer(id_div);
                    App.go(`/indents`)
                }}>我知道了</Button>
            </div>
        </Modal>
    }
}

class Carts extends React.Component {

    static propType = {
        carts: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        let { carts = [], categories = [], isTrade } = this.props;
        console.log(categories);
        return <div className="carts">
            {carts && carts.length > 0 && <ul className="items">
                {carts.map((cartItem, index) => {
                    let { cartSequence = '', count, amount } = cartItem;
                    let category = categories.find(it => it.sequence === (cartSequence.substr(0, 2) + '0000')) || {};
                    let children = category.children || [];

                    let _category = children.find(it => it.sequence === (cartSequence.substr(0, 4) + '00')) || {};

                    let _children = _category.children || [];

                    let __category = _children.find(it => it.sequence === cartSequence) || {};

                    return <li key={index} onClick={() => {
                        Utils.common.renderReactDOM(<ScaleEdit cartItem={cartItem} categories={categories} isTrade={isTrade} />);
                    }}>
                        <div className="img" style={{ backgroundImage: `url(${category.icon})`,width:'40px', height: '40px'}}></div>
                        <div className="content">
                            <div className="title-name">
                                {`${category.name}/${_category.name}/${__category.name}`}
                            </div>
                            <div className="extra-info">
                                <div className='number'>数量：{count}</div>
                                <div className='amount'>预估价：{U.num.formatPrice(amount)}</div>
                            </div>
                        </div>
                    </li>
                })}
            </ul>}
        </div>
    }
}





export {
     TitleBar, ArticleList, Flow, Guarantee, Sales,RecycleSucceed,Carts
};