import React from 'react';
import { Link } from 'react-router-dom'
import Nav from "../components/Nav";
import { connect } from 'react-redux'
import TweetsContainer  from '../containers/TweetsContainer'
import TopicsContainer  from '../containers/TweetsContainer'
// import Layouts from '../layouts'



const HomePage = props => {

    return (
      <div>
    <TweetsContainer />
    </div>
  )
  }


export default HomePage
  // export default connect(mapStateToProps, null)(HomePage)


//       />
