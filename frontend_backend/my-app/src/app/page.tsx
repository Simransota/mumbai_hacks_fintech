import  FinancialHealthDashboard  from '../app/dashboard/page'
// import FinancialAdvisorChatbot from '../../app/chatbot/page'
import SignUp from './student-profile-setup/page';
import PredictiveModel from './farmer-predictive-model/page';
import Login from '../login/page';
import Link from 'next/link';
export default function Home() {
  const searchParams = { message: "" }; 
  return (
    <div>
      {/* <SignUp/> */}
      {/* <Login searchParams={searchParams}/> */}
      <PredictiveModel/>
      {/* <FinancialHealthDashboard/> */}
      {/* <FinancialAdvisorChatbot/> */}
    </div>
  );
}