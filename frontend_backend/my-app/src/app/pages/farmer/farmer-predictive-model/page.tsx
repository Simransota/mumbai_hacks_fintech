import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Activity, BarChart2, BookOpen, DollarSign, GraduationCap, LineChart, Smartphone, User, Zap } from "lucide-react";

export default function FarmerPredictiveModel() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Predictive Analytics for Agricultural Success</h1>
        <p className="text-muted-foreground">Comprehensive Farm Risk Assessment</p>
      </header>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle>Farm Sustainability Score</CardTitle>
          <CardDescription>Overall sustainability and risk score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">76%</div>
          <Progress value={76} className="mt-2" />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Yield Potential</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Health Index</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Usage Efficiency</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72/100</div>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livestock Health Rating</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weather Monitoring</CardTitle>
            <CardDescription>Analysis of weather patterns affecting farming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Temperature</span>
              <span className="font-semibold">75°F</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Rainfall Prediction</span>
              <span className="font-semibold">5 mm this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Insights on pricing and demand</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Current Crop Prices</span>
              <span className="font-semibold">$200/ton</span>
            </div>
            <div className="flex items-center">
              <LineChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Projected Demand</span>
              <span className="font-semibold">Increasing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Health Overview</CardTitle>
            <CardDescription>Analysis of income and expenditures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Revenue Growth Rate</span>
              <span className="font-semibold">15% YoY</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Debt to Income Ratio</span>
              <span className="font-semibold">20%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Family Financial Health</CardTitle>
            <CardDescription>Insights into household financial stability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">800</div>
              <p className="text-sm text-muted-foreground">Strong Family Credit Score</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">This score indicates:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Good financial management</li>
                <li>Timely loan repayments</li>
                <li>Low credit utilization</li>
                <li>Strong credit history</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
