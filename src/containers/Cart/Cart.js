import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import CartGoodItem from './CartGoodItem';
import './Cart.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateGoodsToCart, deleteGoodsToCart} from '../../reduxs/cart.redux';
import {message} from 'antd';

@connect(state => state, {updateGoodsToCart, deleteGoodsToCart})
class Cart extends Component {
    componentDidMount() {
        const {username, id} = this.props.userInfo.userAbout;
        if (!username && !id) {
            message.error('请先登陆');
        }
    }
    render() {
        const crumb = [
            {
                name: '购物车'
            }
        ];
        const {cartProductVoList, cartTotalPrice, allChecked, imageHost} = this.props.cartInfo.cartDate;
        const goodsItem = cartProductVoList.length > 0
            ? cartProductVoList.map(el => {
                return (
                    <CartGoodItem 
                        key={el.id}
                        info={el} 
                        host={imageHost}
                        deleteGoodsToCart={this.props.deleteGoodsToCart}
                        updateGoodsToCart={this.props.updateGoodsToCart}
                    ></CartGoodItem>
                )
            })
            : null;
        const hasGoods = cartProductVoList.length > 0
            ? (
                <div className="page-wrap w">
                    {/*heander*/}
                    <div className="cart-header">
                        <table className="cart-table">
                            <tbody>
                                <tr>
                                    <th className="cart-cell cell-check">
                                        <label className="cart-label">
                                            {/*<input type="checkbox" className="cart-select-all" checked/>*/}
                                            <input
                                                type="checkbox"
                                                className="cart-select-all"
                                                checked={allChecked
                                                ? 'checked'
                                                : ''}/>
                                            <span>全选</span>
                                        </label>
                                    </th>
                                    <th className="cart-cell cell-info">商品信息</th>
                                    <th className="cart-cell cell-price">单价</th>
                                    <th className="cart-cell cell-count">数量</th>
                                    <th className="cart-cell cell-total">合计</th>
                                    <th className="cart-cell cell-opera">操作</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/*lists*/}
                    <div className="cart-list">
                        <table className="cart-table">
                            <tbody>
                                {goodsItem}
                            </tbody>
                        </table>
                    </div>

                    {/*footer*/}
                    <div className="cart-footer">
                        <div className="select-con">
                            <label>
                                {/*<input type="checkbox" className="cart-select-all" checked/>*/}
                                <input
                                    type="checkbox"
                                    className="cart-select-all"
                                    checked={allChecked
                                    ? 'checked'
                                    : ''}/>
                                <span>全选</span>
                            </label>
                        </div>
                        <div className="delete-con">
                            <span className="link delete-selected">
                                <i className="fa fa-trash-o"></i>
                                <span>删除选中</span>
                            </span>
                        </div>
                        <div className="submit-con">
                            <span>总价：</span>
                            <span className="submit-total">￥{cartTotalPrice}</span>
                            <span className="btn btn-submit">去结算</span>
                        </div>
                    </div>
                </div>
            )
            : (
                <p className="err-tip">
                    <span>您的购物车空空如也，</span>
                    <Link to='/' className='link'>立即去购物</Link>
                </p>
            )
        return (
            <div className='cart-container'>
                <Nav></Nav>
                <Header></Header>
                <Crumb crumbs={crumb}></Crumb>
                {hasGoods}
            </div>
        );
    }
}
export default Cart;