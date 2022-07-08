import React from 'react';
import { App, CTYPE, U } from "../common";
import PropTypes from 'prop-types';
import '../assets/css/comps.scss';
import ChatUtils from './shop/ChatUtils';
import Draggable from 'react-draggable';
import classnames from 'classnames';
//  import RoomUtils from "./room/RoomUtils";

class TitleBar extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        more: PropTypes.object
    };

    render() {
        let { title, more = {} } = this.props;
        let { label = '更多' } = more;
        return <div className='title-bar'>
            <p>{title}</p>
            {more && <a onClick={() => U.redirect.redirectByAction(more)}>{label}</a>}
        </div>;
    }
}

class NavBar extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        num: PropTypes.number.isRequired
    };

    render() {
        let { list = [], num } = this.props;
        let style = num ? { width: `${100 / num}%` } : {};
        return <div className={'nav-bar'}>
            {list.map((item, index) => {
                let { icon, label, path } = item;
                return <div className='item' key={index} style={style} onClick={() => {
                    path && App.go(path);
                }}>
                    <img src={icon} />
                    <p>{label}</p>
                </div>;
            })}
        </div>;
    }
}

class HorizonalScrollContainer extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        width: PropTypes.number.isRequired,
        _render: PropTypes.func
    };

    static defaultProps = {
        _render: function RenderScrollItem(item, index) {
            let { icon } = item;
            return <li key={index}>
                <img src={icon} />
            </li>;
        }
    };

    render() {
        let { list = [], width, _render } = this.props;
        return <div className='horizonal-scroll-container'>
            <ul style={{ width: `${list.length * width}px` }}>
                {list.map((item, index) => {
                    return _render(item, index);
                })}
            </ul>
        </div>;
    }
}

class MyRate extends React.Component {

    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render() {
        let { score } = this.props;

        if (score < 0) {
            score = 0;
        } else if (score > 5) {
            score = 5;
        }

        let full = parseInt(score);
        let half = score % 1 !== 0;
        let empty = 5 - full - half;

        let stars = [];
        while (full > 0) {
            stars.push(<li className='full' />);
            full--;
        }
        if (half) {
            stars.push(<li className='half' />);
        }
        while (empty > 0) {
            stars.push(<li className='empty' />);
            empty--;
        }

        return <div className='my-rate'>
            <ul>
                {stars.map((item, index) => {
                    return <React.Fragment key={index}>{item}</React.Fragment>;
                })}
            </ul>
            <span>{score} 分</span>
        </div>;
    }

}

class MyTag extends React.Component {

    render() {
        let { list = [] } = this.props;
        return <ul className='my-tags'>
            {list.map((s, index) => {
                return <li key={index}>{s}</li>;
            })}
        </ul>;
    }
}

class HouseList extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        style: PropTypes.symbol
    };

    static defaultProps = {
        style: CTYPE.houseStyles.box
    };

    render() {

        let { list = [], style } = this.props;
        let isFlat = style === CTYPE.houseStyles.flat;

        return <ul className={isFlat ? 'house-list-flat' : 'house-list'}>
            {list.map((item, index) => {

                let { id, estate = {}, apartment = {}, prices = [], showDate, date } = item;
                let { location = {} } = estate;
                let addr = location.detail;

                let isShare = item.hasOwnProperty('apartment');

                let { _name, price, imgs = [], props = [], _roomInfo = {} } = item;

                return <React.Fragment key={index}>

                    {showDate && <React.Fragment>
                        <div className='clearfix' />
                        <a className="anchor-date" />
                        <div className="gutter-date" style={{ zIndex: index + 2 }}>{date}</div>
                    </React.Fragment>}

                    <li onClick={() => App.go(`/house/${id}?rentType=${isShare ? 2 : 1}`)}>

                        <img src={imgs[0] + '@!400-300'} />
                        <div className='info'>
                            <div className='title'>{_name}</div>
                            <div className='props'> {props.join(' | ')}</div>
                            {isFlat && <div className='addr'>{addr}</div>}
                            {isShare && _roomInfo}
                            <div className='price'
                                dangerouslySetInnerHTML={{ __html: price ? `${price.name}<em>￥</em>${price.price}` : '未配置' }} />
                        </div>
                    </li>
                </React.Fragment>;
            })}
            <div className='clearfix' />
        </ul>;
    }

}

class RentHouseItem extends React.Component {

    static propTypes = {
        rent: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            rent: this.props.rent
        };
    }

    render() {

        let { rent = {} } = this.state;

        let { roomId, estate = {}, room = {}, apartment = {}, prices = [], showDate, date } = rent;

        let item = { ...room, ...apartment, estate };
        if (roomId) {
            item.apartment = apartment;
        }

        console.log(item);

        // let { _name, price, imgs = [] } = RoomUtils.getHouseTitleProps(item);
        
        // return <div className='rent-house-item'>

        //     <img src={imgs[0] + '@!400-300'} />
        //     <div className='info'>
        //         <div className='title'>{_name}</div> */}
        //          <div className='price'
        //             dangerouslySetInnerHTML={{ __html: price ? `${price.name}<em>￥</em>${price.price}` : '未配置' }} />
        //     </div> 
        // </div>
    }
}

class PickBar extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        showPopup: PropTypes.func.isRequired
    };

    render() {
        let { title, label, showPopup } = this.props;
        return <div className='common-pickedr-bar' onClick={() => showPopup(true)}>
            <p>{title}</p>
            <label>{label}</label>
        </div>;
    }
}

class CommonPopup extends React.Component {

    static propTypes = {
        header: PropTypes.string,
        okBtn: PropTypes.element,
        onClose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            close: false
        };
    }

    close = () => {
        this.setState({ close: true });
        setTimeout(() => {
            this.props.onClose();
        }, 400);
    };

    render() {
        let { close } = this.state;
        let { header, okBtn, children } = this.props;
        return <React.Fragment>
            <div className={classnames('overlay', { 'overlay-fade-out': close })} onClick={this.close} />
            <div className={classnames('common-popup', { 'common-popup-close': close })}>
                {header && <div className='header'><p>{header}</p><div className='close' onClick={this.close} /></div>}
                <div className='container'>
                    {children}
                </div>
                {okBtn}
            </div>
        </React.Fragment>;
    }
}

class CommonTabs extends React.Component {

    static propTypes = {
        tabs: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            index: 0
        };
    }

    render() {
        let { tabs = [], onChange } = this.props;
        let { index } = this.state;

        let left = 100 / tabs.length / 2;

        left += index * left * 2;

        return <ul className='common-tab'>
            {tabs.map((tab, i) => {

                let isActive = index === i;

                return <li key={i} className={classnames({ 'active': isActive })} onClick={() => {
                    if (!isActive) {
                        this.setState({ index: i });
                        onChange(i);
                    }
                }}>{tab}</li>;
            })}

            <div className='underline' style={{ left: `${left}vw` }} />

        </ul>;
    }
}

class Developing extends React.Component {

    render() {

        return <div className="developing">
            <img src={require('../assets/image/common/developing.jpg')} />
            <p>功能升级中，敬请期待...</p>
        </div>;
    }
}

class NoData extends React.Component {
    static propTypes = {
        loaded: PropTypes.bool,//
        type: PropTypes.string,
        loadTime: PropTypes.number,
        initContent: PropTypes.node,
    };

    state = {
        type: this.props.type || '',
        loaded: this.props.loaded || false,
        loadTime: this.props.loadTime || 15000,
        initContent: this.props.initContent,
    };

    componentWillReceiveProps(newProps) {
        if (newProps.loaded !== undefined) {
            this.setState({
                loaded: newProps.loaded,
            });
        }
    }

    componentDidMount() {
        this.loadedTimer = setTimeout(() => {
            this.setState({
                loaded: true,
            });
        }, this.state.loadTime);
        this.loadTimer = setTimeout(() => {
            this.setState({
                load: true,
            });
        }, 60);
    }

    componentWillUnmount() {
        clearTimeout(this.loadedTimer);
        clearTimeout(this.loadTimer);
    }

    render() {
        let { loaded, initContent, load } = this.state;
        if (loaded) {
            return initContent ||
                <div className="nodata"><img src={require('../assets/image/common/nodata.png')} /><p>暂无内容</p></div>;
        } else {
            return load ? <LoadMore /> : null;
        }
    }
}


function Loading() {
    return <div className='loading-spin'>
       
        <p>加载中...</p>
    </div>;
}

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ list: nextProps.list })
    }

    render() {
        let { list = [] } = this.state;

        return <div className='article-list'>
            <ul>
                {list.map((article, index) => {
                    let { id, img, title, intro } = article;
                    return <li key={index} onClick={() => App.go(`/article/${id}`)}>
                        <img src={img} className='img' />
                        <div className='right'>
                            <div className='title'>{title}</div>
                            <div className='intro'>{intro}</div>
                        </div>
                    </li>
                })}
            </ul>
            <div className='clearfix' />
        </div>
    }

}

function CommonLoadMore(props) {
    return <div className='load-more' onClick={() => props.loadMore()}>加载更多</div>
}

class CSIcon extends React.Component {
    render() {
        return <Draggable bounds="body">
            <div className="float-cs-icon" onClick={() => {
                ChatUtils.showCSList();
            }} />
        </Draggable>;
    }
}


class Favor extends React.Component {

    static propTypes = {
        type: PropTypes.number.isRequired,
        referId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            favored: 2,
            type: this.props.type,
            referId: this.props.referId
        };
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        let { type, referId } = this.state;
        App.api('usr/favor/is_favored', { favor: JSON.stringify({ type, referId }) }).then(favored => {
            this.setState({ favored });
        });
    };

    favor = () => {
        let { favored, type, referId } = this.state;
        App.api('usr/favor/favor', { favor: JSON.stringify({ type, referId }) }).then(() => {
            this.setState({
                favored: favored === 1 ? 2 : 1
            })
        })
    };

    render() {
        let { favored } = this.state;
        let tf = favored === 1;
        return <div className={tf ? 'favored' : 'favor'} onClick={this.favor}>
            <i />
            <p>{tf ? '取消收藏' : '收藏'}</p>
        </div>
    }
}

export {
    TitleBar,
    NavBar,
    CSIcon,
    HorizonalScrollContainer,
    MyRate,
    MyTag,
    HouseList,
    PickBar,
    CommonPopup,
    CommonTabs,
    Developing, NoData, ArticleList, CommonLoadMore, Favor, RentHouseItem
};
