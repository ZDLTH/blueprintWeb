import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import EmployerRegist from "@/views/EmployerRegist";
import EmployerLogin from "@/views/EmployerLogin";
import EmployEnterpriseMain from "@/views/EmployEnterpriseMain";
import CreateProject from "@/components/employer/enterprise/CreateProject";
import ManageStaff from "@/components/employer/enterprise/ManageStaff";
import StaffApply from "@/components/employer/enterprise/StaffApply";
import CurrentProject from "@/components/employer/CurrentProject";


import DesignerRegist from "@/views/DesignerRegist";
import DesignerLogin from "@/views/DesignerLogin";

import ReviewerRegist from "@/views/ReviewerRegist";
import ReviewerLogin from "@/views/ReviewerLogin";


import BuilderRegist from "@/views/BuilderRegist";
import BuilderLogin from "@/views/BuilderLogin";
import EmployerLeaderMain from "@/views/EmployerLeaderMain";
import MyApply from "@/components/employer/leader/MyApply";
import ReviewerEnterpriseMain from "@/views/ReviewerEnterpriseMain";
import ReviewerBusinessMain from "@/views/ReviewerBusinessMain";
import ReviewerJudgeMain from "@/views/ReviewerJudgeMain";
import DesignerMain from "@/views/DesignerMain";
import BuilderMain from "@/views/BuilderMain";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/employer/regist',
    name: 'EmployerRegist',
    component: EmployerRegist
  },
  {
    path: '/employer/login',
    name: 'EmployerLogin',
    component: EmployerLogin
  },
  {
    path: '/employer/enterprise/main',
    name: 'EmployEnterpriseMain',
    component: EmployEnterpriseMain,
    children:[
      {
        path: '/employer/enterprise/createProject',
        name: 'CreateProject',
        component: CreateProject,
      },
      {
        path: '/employer/enterprise/manageStaff',
        name: 'ManageStaff',
        component: ManageStaff,
      },
      {
        path: '/employer/enterprise/staffApply',
        name: 'StaffApply',
        component: StaffApply,
      },
      {
        path: '/employer/enterprise/currentProject',
        name: 'currentProject',
        component: CurrentProject
      }
    ]
  },
  {
    path: '/employer/leader/main',
    name: 'EmployLeaderMain',
    component: EmployerLeaderMain,
    children: [
      {
        path: '/employer/leader/myProject',
        name: 'currentProject',
        component: CurrentProject
      },
      {
        path: '/employer/leader/myApply',
        name: 'MyApply',
        component: MyApply
      },
    ]
  },

  {
    path: '/designer/regist',
    name: 'DesignerRegist',
    component: DesignerRegist
  },
  {
    path: '/designer/login',
    name: 'DesignerLogin',
    component: DesignerLogin
  },
  {
    path: '/designer/designer/main',
    name:'DesignerMain',
    component: DesignerMain
  },

  {
    path: '/reviewer/regist',
    name: 'ReviewerRegist',
    component: ReviewerRegist
  },
  {
    path: '/reviewer/login',
    name: 'ReviewerLogin',
    component: ReviewerLogin
  },
  {
    path: '/reviewer/enterprise/main',
    name: 'ReviewerEnterpriseMain',
    component: ReviewerEnterpriseMain
  },
  {
    path: '/reviewer/business/main',
    name: 'ReviewerBusinessMain',
    component: ReviewerBusinessMain
  },
  {
    path: '/reviewer/judge/main',
    name: 'ReviewerJudgeMain',
    component: ReviewerJudgeMain
  },

  {
    path: '/builder/regist',
    name: 'BuilderRegist',
    component: BuilderRegist
  },
  {
    path: '/builder/login',
    name: 'BuilderLogin',
    component: BuilderLogin
  },
  {
    path: '/builder/main',
    name: 'BuilderMain',
    component: BuilderMain
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
