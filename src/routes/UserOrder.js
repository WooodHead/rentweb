/**
 * Created by magiclizi on 2017/4/7.
 */
import React from 'react';
import {connect} from 'dva';
import UserOrderCss from './UserOrder.css';
import moment from 'moment';
class UserOrder extends React.Component{
  componentWillMount() {
    this['props'].getOrders();
  }

  render(){
    return(
      <div className = {UserOrderCss['container']}>
        {this.renderRows()}
        <span style = {{marginBottom:'2vh',marginTop:'2vh',fontSize:13,color:'rgb(110,109,113)',fontWeight:400}}>没有更多订单信息了～</span>
      </div>
    )
  }

  renderRows(){
    var rows = this.props.orders.map((data,i)=>{
      var payState = data['payState'];
      var payStr = '未付款';
      if(payState === 1){
        payStr = '已付款';
      }
      else if(payState === 2){
        payStr = '已退款';
      }
      else if(payState === 3){
        payStr = '退款中（大约10个工作日）';
      }
      if(data['orderType'] === 'authority'){
        return(
          <div key = {i} style = {{width:'94vw',borderRadius:4,backgroundColor:'white',display:'flex',marginTop:'4vw',flexDirection:'column'}}>
            <span style = {{marginTop:'2vh',marginLeft:'3vw',color:'rgb(38,38,38)',fontSize:14}}>订单编号 : {data.orderId.split('_')[1]}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单类型 : 押金</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单金额 : {(data.orderPrice/100).toFixed(2)}元</span>
            <span style = {{marginTop:'1vh',marginBottom:'2vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单状态 : {payStr}</span>
          </div>
        )
      }
      else if(data['orderType'] === 'recharge'){
        return(
          <div key = {i} style = {{width:'94vw',borderRadius:4,backgroundColor:'white',display:'flex',marginTop:'4vw',flexDirection:'column'}}>
            <span style = {{marginTop:'2vh',marginLeft:'3vw',color:'rgb(38,38,38)',fontSize:14}}>订单编号 : {data.orderId.split('_')[1]}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单类型 : 充值</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单金额 : {(data.orderPrice/100).toFixed(2)}元</span>
            <span style = {{marginTop:'1vh',marginBottom:'2vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单状态 : {payStr}</span>
          </div>
        )
      }
      else if(data['orderType'] === 'rechargeRent'){
        return(
          <div key = {i} style = {{width:'94vw',borderRadius:4,backgroundColor:'white',display:'flex',marginTop:'4vw',flexDirection:'column'}}>
            <span style = {{marginTop:'2vh',marginLeft:'3vw',color:'rgb(38,38,38)',fontSize:14}}>订单编号 : {data.orderId.split('_')[1]}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单类型 : 余额支付</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单金额 : {(data.orderPrice/100).toFixed(2)}元</span>
            <span style = {{marginTop:'1vh',marginBottom:'2vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单状态 : {payStr}</span>
          </div>
        )
      }
    })
    return rows;
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispatchToProps = function(dispatch){
  return{
    getOrders:()=>{
      dispatch({
        type:'user/getUserOrders'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserOrder);
