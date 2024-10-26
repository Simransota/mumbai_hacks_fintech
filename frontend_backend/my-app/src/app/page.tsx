import  FinancialHealthDashboard  from '../app/pages/dashboard/page'
// import FinancialAdvisorChatbot from '../../app/chatbot/page'
import SignUp from './pages/students/student-profile-setup/page';
import PredictiveModel from './pages/farmer/farmer-predictive-model/page';
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
