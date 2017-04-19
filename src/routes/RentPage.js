/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
class RentPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {

    this['props'].checkNeedBind(()=>{
      setCurPath('/rent');
      this['props'].getCurRentInfo();
    })
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  //{curRentInfo['chestLogicId']}_
  renderAction(){
    var curRentInfo = this['props'].curRentInfo;
    if(curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentinservice.jpg!w640)'}}>
          <span style = {{fontSize:30,color:'white',marginBottom:'28vh'}}>亲的柜号是{curRentInfo['boxId']}号
          </span>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentwarning.jpg!w640)'}}>
          <div onClick={()=>{this.checkAuthority()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }

  checkAuthority(){
    this.props.checkUserAuthority();
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispatchToProps = function(dispatch){
  return {
    getCurRentInfo:()=>{
      dispatch({type:'user/getCurRentInfo'})
    },
    checkUserAuthority:()=>{
      dispatch({type:'user/checkAuthority'})
    },
    checkNeedBind:(callback)=>{
      dispatch({type:'user/checkNeedBind',callback:callback})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RentPage);


