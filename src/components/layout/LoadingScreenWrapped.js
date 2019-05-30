import React from 'react'
import LoadingScreen from 'react-loading-screen'
import logo from '../../logo.png'


const LoadingScreenWrapped = () => {
    return (
        <LoadingScreen
            loading={true}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            logoSrc={logo}
            text='Just A Moment'
        ></LoadingScreen>
    )
}

export default LoadingScreenWrapped
