import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

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

type PayoffPlan = {
  month: number;
  remainingBalance: number;
  payment: number;
  interest: number;
  principal: number;
};

type DebtPayoffPlanProps = {
  debts: Debt[];
  extraPayments: ExtraPayments;
  fixedTotal: string;
  selectedMethod: string;
};

export default function DebtPayoffPlan({ debts, extraPayments, fixedTotal, selectedMethod }: DebtPayoffPlanProps) {
  const [payoffPlan, setPayoffPlan] = useState<PayoffPlan[]>([]);

  useEffect(() => {
    generatePayoffPlan();
  }, [debts, extraPayments, fixedTotal, selectedMethod]);

  const generatePayoffPlan = () => {
    let sortedDebts = [...debts];
    sortedDebts.sort(selectedMethod === 'snowball' 
      ? (a, b) => a.balance - b.balance 
      : (a, b) => b.rate - a.rate
    );

    const totalMonthlyPayment = sortedDebts.reduce((sum, debt) => sum + debt.payment, 0) + extraPayments.perMonth;
    let remainingDebts = [...sortedDebts];
    let month = 1;
    let plan: PayoffPlan[] = [];

    while (remainingDebts.length > 0) {
      let monthlyExtraPayment = extraPayments.perMonth + (month === parseInt(extraPayments.month) ? extraPayments.oneTime : 0);
      if (month % 12 === 1) {
        monthlyExtraPayment += extraPayments.perYear;
      }

      remainingDebts = remainingDebts.map(debt => {
        const interest = (debt.rate / 100 / 12) * debt.balance;
        let availablePayment = debt.payment + monthlyExtraPayment;

        // Ensure available payment does not exceed total due (balance + interest)
        if (availablePayment > debt.balance + interest) {
          availablePayment = debt.balance + interest; 
        }

        const principal = Math.min(availablePayment - interest, debt.balance);
        const newBalance = debt.balance - principal;

        plan.push({
          month,
          remainingBalance: newBalance,
          payment: principal + interest,
          interest,
          principal,
        });

        return { ...debt, balance: newBalance };
      });

      remainingDebts = remainingDebts.filter(debt => debt.balance > 0);

      if (fixedTotal === 'yes' && remainingDebts.length > 0) {
        const extraToDistribute = totalMonthlyPayment - remainingDebts.reduce((sum, debt) => sum + debt.payment, 0);
        remainingDebts[0].payment += extraToDistribute;
      }

      month++;
    }

    setPayoffPlan(plan);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Debt Payoff Plan</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Your debt payoff plan using the {selectedMethod} method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Total Debt:</h3>
              <p>${debts.reduce((sum, debt) => sum + debt.balance, 0).toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Payoff Time:</h3>
              <p>{Math.ceil(payoffPlan.length / 12)} years {payoffPlan.length % 12} months</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Interest Paid:</h3>
              <p>${payoffPlan.reduce((sum, month) => sum + month.interest, 0).toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Method:</h3>
              <p>{selectedMethod === 'snowball' ? 'Snowball' : 'Avalanche'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Payoff Plan</CardTitle>
          <CardDescription>Month-by-month breakdown of your debt payoff journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoffPlan.map((month, index) => (
                <TableRow key={index}>
                  <TableCell>{month.month}</TableCell>
                  <TableCell>${month.payment.toFixed(2)}</TableCell>
                  <TableCell>${month.principal.toFixed(2)}</TableCell>
                  <TableCell>${month.interest.toFixed(2)}</TableCell>
                  <TableCell>${month.remainingBalance.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button onClick={generatePayoffPlan}>Recalculate Plan</Button>
      </div>
    </div>
  );
}
