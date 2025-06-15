
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator } from "lucide-react";

// Conversion rates and unit factors (février 2024, fixes pour offline)
const CURRENCY_RATES = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  DZD: 145,
  MAD: 11,
};

const LENGTH_FACTORS = {
  m: 1,
  cm: 100,
  km: 0.001,
  ft: 3.28084,
  in: 39.3701,
};

const TEMP_TYPES = [
  { label: "Celsius", value: "C" },
  { label: "Fahrenheit", value: "F" },
  { label: "Kelvin", value: "K" },
];

const DATE_FORMATS = [
  { label: "JJ/MM/AAAA", value: "FR" },
  { label: "MM/DD/YYYY", value: "US" },
  { label: "YYYY-MM-DD", value: "ISO" },
];

// Utils
function convertCurrency(amount: number, from: string, to: string) {
  if (CURRENCY_RATES[from] && CURRENCY_RATES[to]) {
    return (amount / CURRENCY_RATES[from]) * CURRENCY_RATES[to];
  }
  return 0;
}
function convertLength(amount: number, from: string, to: string) {
  if (LENGTH_FACTORS[from] && LENGTH_FACTORS[to]) {
    return (amount * LENGTH_FACTORS[to]) / LENGTH_FACTORS[from];
  }
  return 0;
}
function convertTemp(amount: number, from: string, to: string) {
  if (from === to) return amount;
  let k: number;
  if (from === "C") k = amount + 273.15;
  else if (from === "F") k = (amount - 32) * (5 / 9) + 273.15;
  else k = amount;
  if (to === "C") return k - 273.15;
  if (to === "F") return (k - 273.15) * (9 / 5) + 32;
  return k;
}
function convertDate(str: string, from: string, to: string) {
  // Support basic conversions for known formats only
  let y, m, d;
  if (from === "FR") [d, m, y] = str.split(/[^\d]/);
  else if (from === "US") [m, d, y] = str.split(/[^\d]/);
  else if (from === "ISO") [y, m, d] = str.split(/[^\d]/);
  const year = y?.padStart(4, "20");
  const month = m?.padStart(2, "0");
  const day = d?.padStart(2, "0");
  if (!day || !month || !year) return "";
  if (to === "FR") return `${day}/${month}/${year}`;
  if (to === "US") return `${month}/${day}/${year}`;
  if (to === "ISO") return `${year}-${month}-${day}`;
  return "";
}

const CONVERTER_TYPES = [
  { key: "currency", label: "Monnaie" },
  { key: "length", label: "Longueur" },
  { key: "temperature", label: "Température" },
  { key: "date", label: "Date" },
];

interface UniversalConverterToolProps {
  userProfile: any;
  diagnostic: any;
  onBack: () => void;
}

const UniversalConverterTool: React.FC<UniversalConverterToolProps> = ({ onBack }) => {
  const [type, setType] = useState<"currency" | "length" | "temperature" | "date">("currency");

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <Card>
        <CardHeader className="flex-row items-center gap-2 flex pb-2">
          <Calculator className="h-7 w-7 text-gray-800" />
          <CardTitle className="text-2xl">Convertisseur Universel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {CONVERTER_TYPES.map(({ key, label }) => (
              <Button
                key={key}
                variant={type === key ? "default" : "outline"}
                className="w-full"
                onClick={() => setType(key as any)}
              >
                {label}
              </Button>
            ))}
          </div>
          <div>
            {type === "currency" && <CurrencyConverter />}
            {type === "length" && <LengthConverter />}
            {type === "temperature" && <TemperatureConverter />}
            {type === "date" && <DateConverter />}
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-gray-500 pt-6 text-center">
        Outil 100% hors-ligne. <b>Les taux/facteurs sont fournis à titre indicatif : vérifiez pour des montants importants.</b>
      </div>
    </div>
  );
};

// --- Sous-composants ---

function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [from, setFrom] = useState<keyof typeof CURRENCY_RATES>("EUR");
  const [to, setTo] = useState<keyof typeof CURRENCY_RATES>("USD");
  const num = parseFloat(amount) || 0;
  const res = convertCurrency(num, from, to);
  return (
    <form
      className="space-y-3"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Label htmlFor="amount">Montant</Label>
      <Input
        id="amount"
        type="number"
        min={0}
        value={amount}
        onChange={e => setAmount(e.target.value.replace(",", "."))}
        className="w-full"
        inputMode="decimal"
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="from-currency">De</Label>
          <select
            id="from-currency"
            className="w-full border rounded px-2 py-1"
            value={from}
            onChange={e => setFrom(e.target.value as any)}
          >
            {Object.keys(CURRENCY_RATES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label htmlFor="to-currency">Vers</Label>
          <select
            id="to-currency"
            className="w-full border rounded px-2 py-1"
            value={to}
            onChange={e => setTo(e.target.value as any)}
          >
            {Object.keys(CURRENCY_RATES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-lg font-semibold text-blue-700">
        Résultat : {num > 0 ? res.toFixed(2) : "--"} {to}
      </div>
    </form>
  );
}

function LengthConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState<keyof typeof LENGTH_FACTORS>("m");
  const [to, setTo] = useState<keyof typeof LENGTH_FACTORS>("ft");
  const num = parseFloat(amount) || 0;
  const res = convertLength(num, from, to);
  return (
    <form
      className="space-y-3"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Label htmlFor="length-amount">Mesure</Label>
      <Input
        id="length-amount"
        type="number"
        min={0}
        value={amount}
        onChange={e => setAmount(e.target.value.replace(",", "."))}
        className="w-full"
        inputMode="decimal"
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="from-length">De</Label>
          <select
            id="from-length"
            className="w-full border rounded px-2 py-1"
            value={from}
            onChange={e => setFrom(e.target.value as any)}
          >
            {Object.keys(LENGTH_FACTORS).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label htmlFor="to-length">Vers</Label>
          <select
            id="to-length"
            className="w-full border rounded px-2 py-1"
            value={to}
            onChange={e => setTo(e.target.value as any)}
          >
            {Object.keys(LENGTH_FACTORS).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-lg font-semibold text-blue-700">
        Résultat : {num > 0 ? res.toLocaleString(undefined, { maximumFractionDigits: 5 }) : "--"} {to}
      </div>
    </form>
  );
}

function TemperatureConverter() {
  const [amount, setAmount] = useState<string>("25");
  const [from, setFrom] = useState("C");
  const [to, setTo] = useState("F");
  const num = parseFloat(amount) || 0;
  const res = convertTemp(num, from, to);
  return (
    <form
      className="space-y-3"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Label htmlFor="temp-amount">Température</Label>
      <Input
        id="temp-amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value.replace(",", "."))}
        className="w-full"
        inputMode="decimal"
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="from-temp">De</Label>
          <select
            id="from-temp"
            className="w-full border rounded px-2 py-1"
            value={from}
            onChange={e => setFrom(e.target.value)}
          >
            {TEMP_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label htmlFor="to-temp">Vers</Label>
          <select
            id="to-temp"
            className="w-full border rounded px-2 py-1"
            value={to}
            onChange={e => setTo(e.target.value)}
          >
            {TEMP_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-lg font-semibold text-blue-700">
        Résultat : {isFinite(res) ? res.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "--"} {TEMP_TYPES.find(t => t.value === to)?.label}
      </div>
    </form>
  );
}

function DateConverter() {
  const [raw, setRaw] = useState("");
  const [from, setFrom] = useState("FR");
  const [to, setTo] = useState("ISO");
  const result = convertDate(raw, from, to);

  // Placeholder helpers
  function getPlaceholder(fmt: string) {
    if (fmt === "FR") return "31/12/2024";
    if (fmt === "US") return "12/31/2024";
    if (fmt === "ISO") return "2024-12-31";
    return "";
  }

  return (
    <form
      className="space-y-3"
      onSubmit={e => e.preventDefault()}
    >
      <Label htmlFor="date-amount">Date</Label>
      <Input
        id="date-amount"
        type="text"
        spellCheck={false}
        value={raw}
        onChange={e => setRaw(e.target.value)}
        placeholder={getPlaceholder(from)}
        className="w-full"
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="from-date">Format d’origine</Label>
          <select
            id="from-date"
            className="w-full border rounded px-2 py-1"
            value={from}
            onChange={e => setFrom(e.target.value)}
          >
            {DATE_FORMATS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label htmlFor="to-date">Format désiré</Label>
          <select
            id="to-date"
            className="w-full border rounded px-2 py-1"
            value={to}
            onChange={e => setTo(e.target.value)}
          >
            {DATE_FORMATS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 text-lg font-semibold text-blue-700">
        Résultat : {result || "--"}
      </div>
    </form>
  );
}

export default UniversalConverterTool;
