
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowLeft, PiggyBank, Plus, Trash2, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetAssistantToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

type ExpenseCategory = {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
};

type Income = {
  id: string;
  source: string;
  amount: number;
};

const DEFAULT_CATEGORIES: Omit<ExpenseCategory, 'id' | 'spent'>[] = [
  { name: "Logement", budgeted: 800, color: "bg-blue-500" },
  { name: "Alimentation", budgeted: 400, color: "bg-green-500" },
  { name: "Transport", budgeted: 150, color: "bg-yellow-500" },
  { name: "Santé", budgeted: 100, color: "bg-red-500" },
  { name: "Loisirs", budgeted: 200, color: "bg-purple-500" },
  { name: "Autres", budgeted: 100, color: "bg-gray-500" }
];

const BudgetAssistantTool: React.FC<BudgetAssistantToolProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [newIncome, setNewIncome] = useState({ source: "", amount: "" });
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedBudget = localStorage.getItem('budget_data');
    if (savedBudget) {
      const data = JSON.parse(savedBudget);
      setIncomes(data.incomes || []);
      setCategories(data.categories || DEFAULT_CATEGORIES.map((cat, idx) => ({
        ...cat,
        id: `cat-${idx}`,
        spent: 0
      })));
    } else {
      setCategories(DEFAULT_CATEGORIES.map((cat, idx) => ({
        ...cat,
        id: `cat-${idx}`,
        spent: 0
      })));
    }
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (incomes.length > 0 || categories.length > 0) {
      localStorage.setItem('budget_data', JSON.stringify({ incomes, categories }));
      toast({
        title: "Budget sauvegardé",
        description: "Vos données ont été sauvegardées automatiquement",
      });
    }
  }, [incomes, categories, toast]);

  const addIncome = () => {
    if (newIncome.source.trim() && parseFloat(newIncome.amount) > 0) {
      setIncomes([...incomes, {
        id: `income-${Date.now()}`,
        source: newIncome.source,
        amount: parseFloat(newIncome.amount)
      }]);
      setNewIncome({ source: "", amount: "" });
    }
  };

  const removeIncome = (id: string) => {
    setIncomes(incomes.filter(inc => inc.id !== id));
  };

  const addExpense = () => {
    const categoryId = newExpense.category;
    const amount = parseFloat(newExpense.amount);
    if (categoryId && amount > 0) {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, spent: cat.spent + amount }
          : cat
      ));
      setNewExpense({ category: "", amount: "" });
    }
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalIncome - totalSpent;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      
      <h1 className="text-2xl font-bold flex items-center gap-2 mt-6">
        <PiggyBank className="h-7 w-7 text-gray-800" />
        Assistant Budget Familial
      </h1>
      
      {/* Vue d'ensemble */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Revenus totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncome.toFixed(2)}€
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Dépenses actuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalSpent.toFixed(2)}€
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Solde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {remaining.toFixed(2)}€
            </div>
            {remaining < 0 && (
              <div className="flex items-center text-red-600 text-sm mt-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Budget dépassé
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenus */}
        <Card>
          <CardHeader>
            <CardTitle>Revenus</CardTitle>
            <CardDescription>Gérez vos sources de revenus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Source (salaire, allocations...)"
                value={newIncome.source}
                onChange={e => setNewIncome({...newIncome, source: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Montant"
                value={newIncome.amount}
                onChange={e => setNewIncome({...newIncome, amount: e.target.value})}
              />
              <Button onClick={addIncome} disabled={!newIncome.source.trim() || !newIncome.amount}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {incomes.map(income => (
                <div key={income.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>{income.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{income.amount}€</span>
                    <Button size="sm" variant="ghost" onClick={() => removeIncome(income.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dépenses */}
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une dépense</CardTitle>
            <CardDescription>Enregistrer une nouvelle dépense</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <select
                className="flex-1 border rounded px-3 py-2"
                value={newExpense.category}
                onChange={e => setNewExpense({...newExpense, category: e.target.value})}
              >
                <option value="">Choisir une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Montant"
                value={newExpense.amount}
                onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
              />
              <Button onClick={addExpense} disabled={!newExpense.category || !newExpense.amount}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catégories de budget */}
      <Card>
        <CardHeader>
          <CardTitle>Catégories de budget</CardTitle>
          <CardDescription>Suivi par catégorie de dépenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => {
              const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0;
              const isOverBudget = category.spent > category.budgeted;
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${category.color}`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {category.spent.toFixed(2)}€ / {category.budgeted.toFixed(2)}€
                      </span>
                      {isOverBudget ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      )}
                      <Button size="sm" variant="ghost" onClick={() => removeCategory(category.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{percentage.toFixed(1)}%</span>
                    {isOverBudget && (
                      <span className="text-red-600">
                        Dépassement: {(category.spent - category.budgeted).toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetAssistantTool;
