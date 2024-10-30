"use client"
import React from 'react';
import Layout from '../dashboard/layout';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/tabsdashboard';
// import ThemeSwitch from '../../components/theme-switch';
import { UserNav } from '../../../components/user-nav';
import { RecentSales } from '../../../components/recent-sales';
import  Overview  from '../../../components/overview';
import { Calendar } from '../../../components/ui/calendar';
import DebtReductionPage from "../../../components/debt-planner"

const topNav = [
  {
    title: 'Credit Overview',
    href: '/dashboard/overview',
    isActive: true,
  },
  {
    title: 'Credit Score Improvement',
    href: '/dashboard/score-improvement',
    isActive: false,
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    isActive: false,
  },
];

function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
          {/* <ThemeSwitch /> Assuming ThemeSwitch is for theme toggling */}
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight text-white'>Creditworthiness Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button className='bg-white'>Download Credit Report</Button>
          </div>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2 text-white'>
            <TabsList>
              <TabsTrigger value='overview'>Credit Overview</TabsTrigger>
              <TabsTrigger value='score-improvement'>Credit Score Improvement</TabsTrigger>
              {/* <TabsTrigger value='calendar'>Calendar</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-white'>Credit Score</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-white'>720</div>
                  <p className='text-xs text-muted-foreground text-white'>Your current credit score</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-white'>Pending Payments</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-white'>₹15,000</div>
                  <p className='text-xs text-muted-foreground text-white'>Pending payments this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-white'>Upcoming Loan Payments</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-white'>₹25,000</div>
                  <p className='text-xs text-muted-foreground text-white'>Loan payments due this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-white'>Recent Transactions</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-white'>+₹5,000</div>
                  <p className='text-xs text-muted-foreground text-white'>Recent credits in your account</p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4 text-white'>
                <CardHeader>
                  <CardTitle>Historical Credit Score Trends</CardTitle>
                <CardDescription>
                  

                This chart shows your historical credit scores compared to the average credit scores over the past several months.
                Monitoring these trends can help you understand how your financial behavior impacts your credit score.
                  
                </CardDescription>
                </CardHeader>
                
                <CardContent >
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3 text-white'>
                <CardHeader>
                  <CardTitle>Recent Credit Reports</CardTitle>
                  <CardDescription>Your credit history for the past month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='score-improvement' className='space-y-4'>
            <div className='p-4'>
              <DebtReductionPage /> {/* Using the Schedule-X calendar */}
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}

export default Dashboard;
