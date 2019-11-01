import React from 'react'
import Lottie from 'lottie-react-web'
import animation from '../../images/animation.json';

const Loader = props => {
  return (
    <div style={props.style}>
      <Lottie
        options={{
          animationData: animation
        }}
      />
    </div>
  )
}

export default Loader;
