import  FinancialHealthDashboard  from '../app/pages/dashboard/page'
// import FinancialAdvisorChatbot from '../../app/chatbot/page'
import SignUp from './pages/students/student-profile-setup/page';
// import PredictiveModel from './pages/farmer/farmer-predictive-model/page';
import PredictiveModel from '../app/pages/small-business-predictive-model/page';
import Login from './pages/login/page';
import Link from 'next/link';
import { HeroSection } from '../components/herosection';
import { FeaturedSolutions } from '../components/featuredsolutions';
import { HowItWorks } from '../components/howitworks';
import NavbarDemo  from "../components/Navbar";
export default function Home() {
  const searchParams = { message: "" }; 
  return (
    <div className='dark'>
      <SignUp/>
      {/* <NavbarDemo/>
      <HeroSection/>
      <FeaturedSolutions/>
      <HowItWorks/> */}
      {/* <PredictiveModel/> */}
    </div>
  );
}
