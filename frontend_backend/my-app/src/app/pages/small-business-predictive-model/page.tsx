import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Activity, BarChart2, BookOpen, CreditCard, DollarSign, LineChart, ShoppingBag, Zap } from "lucide-react";

export default function SmallBusinessAnalytics() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Small Business Analytics Dashboard</h1>
        <p className="text-muted-foreground">Insights into Financial Health and Performance</p>
      </header>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle>Business Credit Score</CardTitle>
          <CardDescription>Overall creditworthiness score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">75%</div>
          <Progress value={75} className="mt-2" />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20%</div>
            <Progress value={20} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <Progress value={88} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Debt-to-Income Ratio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30%</div>
            <Progress value={30} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Health Analysis</CardTitle>
            <CardDescription>Insights from revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Monthly Revenue</span>
              <span className="font-semibold">$10,000</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Monthly Expenses</span>
              <span className="font-semibold">$7,500</span>
            </div>
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Profit Margin</span>
              <span className="font-semibold">25%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Insights</CardTitle>
            <CardDescription>Efficiency and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <LineChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Inventory Turnover</span>
              <span className="font-semibold">4x</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Return Rate</span>
              <span className="font-semibold">2%</span>
            </div>
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Customer Retention Rate</span>
              <span className="font-semibold">90%</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Average Order Value</span>
              <span className="font-semibold">$150</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Competitive Insights</CardTitle>
            <CardDescription>Market positioning and advantages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Competitive Advantage</span>
              <span className="font-semibold">Product Quality</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Brand Recognition</span>
              <span className="font-semibold">High</span>
            </div>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Customer Base Growth</span>
              <span className="font-semibold">Steady</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Projections</CardTitle>
            <CardDescription>Future financial outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">$120,000</div>
              <p className="text-sm text-muted-foreground">Projected Annual Revenue</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">Key projections include:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>15% growth in sales</li>
                <li>10% reduction in costs</li>
                <li>Improvement in cash flow</li>
                <li>Increased market share</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
