/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {openInRenting} from '../services/action';
class OpenInRentingPage extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getCurRentInfo();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  openInRenting(){
    openInRenting().then(result=>{
      if(result){
        alert('开门中，请稍后。。。');
      }
    })

  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  renderAction(){
    if(this.props.curRentInfo){
      return(
        <div onClick={()=>{this.openInRenting()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/inservice.jpg)'}}></div>
      )
    }
    else{
      return(
        <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openInRentingError.jpg)'}}></div>
      )
    }
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:()=>{
      dispatch({type:'user/getCurRentInfo'})
    },
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(OpenInRentingPage);