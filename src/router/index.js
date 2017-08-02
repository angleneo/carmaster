import Vue from 'vue'
import Router from 'vue-router'
import BoundPhone from '@/pages/BoundPhone'
import Re from '@/pages/Re'
import Home from '@/pages/Home'
import Booking from '@/pages/Booking'
import MyCenter from '@/pages/ucenter/MyCenter'
import EditMyInfo from '@/pages/ucenter/EditMyInfo'
import OrderManagement from '@/pages/order/OrderManagement'
import OrderArchive from '@/pages/order/OrderArchive'
import OrderDetail from '@/pages/order/OrderDetail'
import PayResult from '@/pages/order/PayResult'
import VehicleManagement from '@/pages/vehicle/VehicleManagement'
import OrderMentaining from '@/pages/order/OrderManagementRouter/OrderMentaining'
import OrderCompleted from '@/pages/order/OrderManagementRouter/OrderCompleted'
import NewVehicle from '@/pages/vehicle/NewVehicle'
import Step1 from '@/pages/vehicle/newvehicle/Step1'
import Step2 from '@/pages/vehicle/newvehicle/Step2'
import Step21 from '@/pages/vehicle/newvehicle/Step21'
import Step22 from '@/pages/vehicle/newvehicle/Step22'
import Step3 from '@/pages/vehicle/newvehicle/Step3'
import EditVehicle from '@/pages/vehicle/EditVehicle'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test/:id',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/re/:name/:id',
      name: 'Re',
      component: Re
    },
    {
      path: '/bound',
      name: 'Bound',
      component: BoundPhone
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/mycenter',
      name: 'MyCenter',
      component: MyCenter
    },
    {
      path: '/editmyinfo',
      name: 'EditMyInfo',
      component: EditMyInfo
    },
    {
      path: '/ordermanagement',
      name: 'OrderManagement',
      component: OrderManagement,
      children: [
        {
          path: 'ordermentaining',
          name: 'OrderMentaining',
          component: OrderMentaining
        },
        {
          path: 'ordercompleted',
          name: 'OrderCompleted',
          component: OrderCompleted
        }
      ]
    },
    {
      path: '/order',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/orderarchive',
      name: 'OrderArchive',
      component: OrderArchive
    },
    {
      path: '/payresult',
      name: 'PayResult',
      component: PayResult
    },
    {
      path: '/vehiclemanagement',
      name: 'VehicleManagement',
      component: VehicleManagement
    },
    {
      path: '/newvehicle',
      name: 'NewVehicle',
      component: NewVehicle,
      children: [
        {
          path: 'step1',
          name: 'Step1',
          component: Step1
        },
        {
          path: 'step2',
          name: 'Step2',
          component: Step2
        },
        {
          path: 'step21',
          name: 'Step21',
          component: Step21
        },
        {
          path: 'step22',
          name: 'Step22',
          component: Step22
        },
        {
          path: 'step3',
          name: 'Step3',
          component: Step3
        }
      ]
    },
    {
      path: '/editvehicle',
      name: 'EditVehicle',
      component: EditVehicle
    }
  ]
})
