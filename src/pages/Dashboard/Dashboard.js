import React, { Component } from 'react';
import './Dashboard.scss';

import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

import { Redirect } from 'react-router-dom';

const SERVER_ADDRESS = 'http://178.128.233.31'

class Dashboard extends Component {
   constructor(props) {
      super(props);

      this.state = {
         referralCode: ''
      }

      this.fetchReferralCode(this.props.username)
   }
   fetchReferralCode(username) {
      fetch(SERVER_ADDRESS + '/frontend/user_data/' + username)
         .then(res => res.json())
         .then(json => {
            if (json.code === "success") {
               this.setState({ referralCode: json.ref_code })
            } else {
               // Error
               console.log(json.msg + ": " + json.error)
            }
         });
   }
   render() {
      if (!this.props.isAuthenticated) {
         return <Redirect to='/signIn' />
      }
      return (
         <div className="dashboard-container">
            <div className="navigation">
               <LeftSidebar referralCode={this.state.referralCode}/>
            </div>
            <div className="content-wrapper" id="content-div">
               <div className="overview-container">
                  <div className="overview-table"><ChartTable /></div>
                  <div className="overview-graph"><DoughnutChart /></div>
               </div>
               <div className="graph-container"><LineChart /></div>
               <div className="table-container"><TransactionTable /></div>
               <div className="transfer-modal-container"><TransferModal /></div>
               <div className="footer-container"><Footer /></div>
            </div>
         </div>
      );
   }



}

export default Dashboard;
