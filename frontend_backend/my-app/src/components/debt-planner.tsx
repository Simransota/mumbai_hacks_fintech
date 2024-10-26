import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import image_1 from "../../public/images/What-is-Financial-Wellness-and-how-to-achieve-it-.jpg"
import image_2 from '../../public/images/debt_snowball.jpg'
import image_3 from "../../public/images/avalanche.jpg"
import Image from 'next/image'
import FinancialCalculator from '../components/debt-calculator'

export default function DebtReductionPage() {
  const [customDebt, setCustomDebt] = useState('')
  const [customInterest, setCustomInterest] = useState('')
  const [customPlan, setCustomPlan] = useState('')

  const generateCustomPlan = (e: React.FormEvent) => {
    e.preventDefault()
    // This is a placeholder function. In a real application, you'd implement
    // actual debt reduction calculations here.
    setCustomPlan(`Based on your $${customDebt} debt at ${customInterest}% interest, 
    we recommend allocating X amount monthly to pay off your debt in Y months.`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      {/* <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Debt Reduction and Credit Utilization</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Achieve financial freedom with customized plans and smart credit management tips.
        </p>
        <div className="relative h-80 mb-8">
          <Image
            src= {image_1}
            alt="Financial wellness banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </header> */}

      {/* Debt Reduction Plans Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Debt Reduction Plans Tailored for You</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Reducing your debt is crucial for improving your credit score and overall financial health. 
          Choose a plan that works best for your situation.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Snowball Method Card */}
          <Card>
            <CardHeader>
              <CardTitle>Snowball Method</CardTitle>
              <CardDescription>
                Start by paying off your smallest debts first while maintaining minimum payments on larger debts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-100 mb-4">
                <Image
                  src={image_2}
                  alt="Snowball method diagram"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p>Gain momentum as you go!</p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>

          {/* Avalanche Method Card */}
          <Card>
            <CardHeader>
              <CardTitle>Avalanche Method</CardTitle>
              <CardDescription>
                Focus on paying debts with the highest interest rates first, saving money on interest in the long run.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-100 mb-4">
                <Image
                  src={image_3}
                  alt="Avalanche method comparison"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p>Maximize your interest savings!</p>
            </CardContent>
            <CardFooter>
              <Button>Start Planning</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Custom Plan Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Plan Generator</CardTitle>
            <CardDescription>
              Input your current debts and let us create a personalized repayment strategy for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={generateCustomPlan} className="space-y-4">
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="debt-amount">Total Debt Amount</Label>
                  <Input
                    id="debt-amount"
                    placeholder="e.g., 10000"
                    value={customDebt}
                    onChange={(e) => setCustomDebt(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Average Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    placeholder="e.g., 15"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                  />
                </div>
              </div> */}
              <FinancialCalculator/>
              {/* <Button type="submit">Generate My Plan</Button> */}
            </form>
          </CardContent>
          {customPlan && (
            <CardFooter>
              <p className="text-sm text-muted-foreground">{customPlan}</p>
            </CardFooter>
          )}
        </Card>
      </section>
    </div>
  )
}