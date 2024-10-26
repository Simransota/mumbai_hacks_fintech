import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Activity, BarChart2, BookOpen, CreditCard, DollarSign, GraduationCap, LineChart, ShoppingBag, Smartphone, User, Zap } from "lucide-react"

export default function PredictiveModel() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Predictive Analytics for Credit Worthiness</h1>
        <p className="text-muted-foreground">Comprehensive Risk Assessment </p>
      </header>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
            <CardTitle >Risk Assessment / Credit Worthiness</CardTitle>
            <CardDescription>Overall creditworthiness score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Footprint Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professional Stability</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Credit Score</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72/100</div>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parents' CIBIL Score</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Digital Footprint Analysis</CardTitle>
            <CardDescription>Insights from digital transactions and behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">UPI Transaction Patterns</span>
              <span className="font-semibold">Consistent</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Mobile Recharge History</span>
              <span className="font-semibold">Regular</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Utility Bill Payments</span>
              <span className="font-semibold">On-time</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Online Shopping Behavior</span>
              <span className="font-semibold">Moderate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Stability</CardTitle>
            <CardDescription>Career and income analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Employment Duration</span>
              <span className="font-semibold">3 years</span>
            </div>
            <div className="flex items-center">
              <LineChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Income Pattern</span>
              <span className="font-semibold">Stable growth</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Professional Certifications</span>
              <span className="font-semibold">2 recent</span>
            </div>
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Skill Development</span>
              <span className="font-semibold">Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Credit Score Features</CardTitle>
            <CardDescription>Academic and financial performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Fee Payment Timeliness</span>
              <span className="font-semibold">90% on-time</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">GPA Trend</span>
              <span className="font-semibold">Improving</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Project Completion Rate</span>
              <span className="font-semibold">95%</span>
            </div>
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">MOOC Completion Rate</span>
              <span className="font-semibold">3 courses</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parents' CIBIL Score Analysis</CardTitle>
            <CardDescription>Family financial health insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">750</div>
              <p className="text-sm text-muted-foreground">Excellent Credit Score</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">This score indicates:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Strong financial stability</li>
                <li>Consistent bill payments</li>
                <li>Low credit utilization</li>
                <li>Long credit history</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}