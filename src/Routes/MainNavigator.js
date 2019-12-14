import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../Screens/Login/Index'
import Register from '../Screens/Register/Index'
import Engineer from '../Screens/Form/Engineer'
import Index from '../Screens/Home/Index'
import Card from '../Screens/Profile/Card'
import FormC from '../Screens/Form/Company'
import FormE from '../Screens/Form/Engineer'
import Headers from '../Screens/Page/Header'
import Footers from '../Screens/Page/Footer'
import ProfileC from '../Screens/Company/Profile'
import Detail from '../Screens/Engineer/Detail'
import Hiring from '../Screens/Company/Hiring'
import addProject from '../Screens/Company/addProject'
import ListP from '../Screens/Company/Listproject'
import Project from '../Screens/Company/Project'


const HomeNavigation = createStackNavigator({
    Home,
    Register,
    Engineer,
    Index,
    Card,
    FormE,
    FormC,
    Headers,
    Footers,
    ProfileC,
    Detail,
    Hiring,
    addProject,
    ListP,
    Project
    
}, {
  headerMode: 'none',
  initialRouteName: 'Home'

})
export default createAppContainer(HomeNavigation)