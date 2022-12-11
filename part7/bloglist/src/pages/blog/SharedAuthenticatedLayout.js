import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigation from '../../components/Navigation';

const SharedAuthenticatedLayout = () => {
  return (
    <>
      <Navigation />
      <div className='px-5 mt-5'>
        <Outlet />
      </div>
      {/* <div>Footer</div> */}
    </>
  );
}


export default SharedAuthenticatedLayout