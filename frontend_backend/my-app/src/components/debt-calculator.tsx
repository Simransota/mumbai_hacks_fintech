import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import DebtPayoffPlan from './debt-payoff-plan';

// Define types for the state
type Debt = {
  name: string;
  balance: number;
  payment: number;
  rate: number;
};

type ExtraPayments = {
  perMonth: number;
  perYear: number;
  oneTime: number;
  month: string;
};

export default function FinancialCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: '', balance: 0, payment: 0, rate: 0 },
    { name: '', balance: 0, payment: 0, rate: 0 },
    { name: '', balance: 0, payment: 0, rate: 0 },
  ]);

  const [extraPayments, setExtraPayments] = useState<ExtraPayments>({
    perMonth: 0,
    perYear: 0,
    oneTime: 0,
    month: '1',
  });

  const [fixedTotal, setFixedTotal] = useState('no');
  const [selectedMethod, setSelectedMethod] = useState("snowball");
  const [planGenerated, setPlanGenerated] = useState(false); // State to manage plan visibility

  const handleDebtChange = (index: number, field: keyof Debt, value: string) => {
    const newDebts = [...debts];
    if (field === 'name') {
      newDebts[index][field] = value; // Assign string to name
    } else {
      newDebts[index][field] = Number(value) || 0; // Assign number to numeric fields
    }
    setDebts(newDebts);
  };

  const handleExtraPaymentChange = (field: keyof ExtraPayments, value: string) => {
    setExtraPayments({ ...extraPayments, [field]: Number(value) || 0 }); // Handle conversion safely
  };

  const handleClear = () => {
    setDebts([
      { name: '', balance: 0, payment: 0, rate: 0 },
      { name: '', balance: 0, payment: 0, rate: 0 },
      { name: '', balance: 0, payment: 0, rate: 0 },
    ]);
    setExtraPayments({
      perMonth: 0,
      perYear: 0,
      oneTime: 0,
      month: '1',
    });
    setFixedTotal('no');
    setPlanGenerated(false); // Reset the plan visibility
  };

  const handleGeneratePlan = () => {
    // Logic for generating the plan can be added here if needed
    setPlanGenerated(true); // Set to true to show the plan
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Calculator</h1>

      {/* Debt Details Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Debt Details</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Debt Name</TableHead>
              <TableHead>Remaining Balance</TableHead>
              <TableHead>Monthly or Minimum Payment</TableHead>
              <TableHead>Interest Rate (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts.map((debt, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={debt.name}
                    onChange={(e) => handleDebtChange(index, 'name', e.target.value)}
                    placeholder="e.g., Credit Card"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={debt.balance}
                    onChange={(e) => handleDebtChange(index, 'balance', e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={debt.payment}
                    onChange={(e) => handleDebtChange(index, 'payment', e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={debt.rate}
                    onChange={(e) => handleDebtChange(index, 'rate', e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Extra Payments Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Extra Payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Per Month Input */}
          <div>
            <Label htmlFor="perMonth">Per Month</Label>
            <Input
              id="perMonth"
              value={extraPayments.perMonth}
              onChange={(e) => handleExtraPaymentChange('perMonth', e.target.value)}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          {/* Per Year Input */}
          <div>
            <Label htmlFor="perYear">Per Year</Label>
            <Input
              id="perYear"
              value={extraPayments.perYear}
              onChange={(e) => handleExtraPaymentChange('perYear', e.target.value)}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          {/* One-time Payment Input */}
          <div>
            <Label htmlFor="oneTime">One-time Payment</Label>
            <Input
              id="oneTime"
              value={extraPayments.oneTime}
              onChange={(e) => handleExtraPaymentChange('oneTime', e.target.value)}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          {/* Month Select */}
          <div>
            <Label htmlFor="month">Month</Label>
            <Select
              value={extraPayments.month}
              onValueChange={(value) => handleExtraPaymentChange('month', value)}
            >
              <SelectTrigger id="month">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Fixed Total Amount Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <Label className="text-base font-semibold">
              Fixed Total Amount Towards Monthly Payment?
            </Label>
            <RadioGroup
              value={fixedTotal}
              onValueChange={setFixedTotal}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="fixed-yes" />
                <Label htmlFor="fixed-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="fixed-no" />
                <Label htmlFor="fixed-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              If set to "Yes", the total amount paid towards debts each month will remain constant.
              As debts are paid off, the extra amount will be redistributed to remaining debts.
              If set to "No", your total monthly payment will decrease as debts are paid off.
            </p>
          </div>
        </div>
      </div>

      {/* Debt Payoff Method Selection */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Choose Your Method</CardTitle>
          <CardDescription>Select the debt payoff method you prefer</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="snowball" id="snowball" />
              <Label htmlFor="snowball">Snowball Method</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="avalanche" id="avalanche" />
              <Label htmlFor="avalanche">Avalanche Method</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleGeneratePlan}>
            Generate {selectedMethod === "snowball" ? "Snowball" : "Avalanche"} Plan
          </Button>
        </CardFooter>
      </Card>

      {/* Conditionally Render DebtPayoffPlan Component */}
      {planGenerated && (
        <DebtPayoffPlan
          debts={debts}
          extraPayments={extraPayments}
          fixedTotal={fixedTotal}
          selectedMethod={selectedMethod} // Corrected prop name
        />
      )}
    </div>
  );
}

