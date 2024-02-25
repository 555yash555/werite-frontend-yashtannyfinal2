// components/AdminPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPools, getAllUsers } from '../../actions/adminActions';
import { getAllReports } from '../../actions/reportActions';
import UserList from './userList';
import { Tabs, Tab } from 'react-bootstrap';
import PoolList from './poolList';
import ReportList from './reportList';

import { getAllPosts } from '../../actions/postsAction';

const AdminPage = () => {
  console.log('AdminPage component rendered');
  const dispatch = useDispatch();
  const { listofusers, loading, error } = useSelector((state) => state.userReducer);
  const{pools,poolloading,errorpool}=useSelector((state)=>state.poolReducer);
  const {reports,reportLoading,errorReport}=useSelector((state)=>state.reportReducer);


  const [key, setKey] = useState('users');

  useEffect(() => {
    console.log('useEffect: before dispatching');
    dispatch(getAllUsers())
      .then(() => console.log('useEffect: after dispatching'))
      .catch((err) => console.error('useEffect: error dispatching', err));
  }, []);
  useEffect(() => {
    console.log('useEffect: before dispatching');
    dispatch(getAllPools())
      .then(() => console.log('useEffect: after dispatching'))
      .catch((err) => console.error('useEffect: error dispatching', err));
  }, []);
  useEffect(() => {
    console.log('useEffect: before dispatching');
    dispatch(getAllReports())
      .then(() => console.log('useEffect: after dispatching'))
      .catch((err) => console.error('useEffect: error dispatching', err));
  },[]);

  console.log('listofusers:', listofusers);
  console.log('loading:', loading);
  console.log('error:', error);
  console.log('pools:', pools);
  console.log('poolloafing',poolloading);
  console.log('reports:',reports);
  console.log('reportLoading:',reportLoading);

  dispatch(getAllPosts());
  // Render your component with the fetched data
  return (
    <div style={{width:'100%'}}>
      
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="users" title="Users">
          {(loading === undefined || loading) ? (
            <p>Loading...</p> // Replace this with a loading spinner or any loading component if you have one
          ) : (
            <UserList users={listofusers} />
          )}
        </Tab>
        <Tab eventKey="pools" title="Pools">
          {/* Render your pools here */}
          {(poolloading === undefined || poolloading) ? (
            <p>Loading...</p> // Replace this with a loading spinner or any loading component if you have one
          ) : (
            <PoolList pools={pools} />
          )}
        </Tab>
        <Tab eventKey="reports" title="Reports">
          {/* Render your reports here */}
          {(reportLoading === undefined || reportLoading) ? (
            <p>Loading...</p> // Replace this with a loading spinner or any loading component if you have one
          ) : (
            <ReportList reports={reports} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPage;