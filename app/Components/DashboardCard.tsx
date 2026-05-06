// DashboardCard.tsx
import React from "react";

const formatAmount = (value: number) => {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return value < 0 ? `-₦${formatted}` : `₦${formatted}`;
};

const cardConfig: Record<string, { label: string; color: string; textColor: string; accent: string }> = {
  shares:          { label: "Shares",        color: "bg-[#eeedfe]", textColor: "text-[#3C3489]", accent: "bg-[#534AB7]" },
  savings:         { label: "Savings",        color: "bg-[#e6f1fb]", textColor: "text-[#185FA5]", accent: "bg-[#378ADD]" },
  loans:           { label: "Loans",          color: "bg-[#fcebeb]", textColor: "text-[#A32D2D]", accent: "bg-[#E24B4A]" },
  building_fund:   { label: "Building Fund",  color: "bg-[#1a1433]", textColor: "text-white",     accent: "bg-[#534AB7]" },
  investment_fund: { label: "Investment",     color: "bg-[#eaf3de]", textColor: "text-[#3B6D11]", accent: "bg-[#639922]" },
  development:     { label: "Development",    color: "bg-[#faeeda]", textColor: "text-[#854F0B]", accent: "bg-[#BA7517]" },
};

const DashboardCard = ({ data, label }: any) => {
  const cfg = cardConfig[label];
  if (!cfg) return null;

  const item = data[0];
  const balance   = Number(item?.[label]?.balance)  || 0;
  const interest  = label === "loans" ? Number(item?.[label]?.interest) || 0 : null;

  const isLight = label !== "building_fund";

  return (
    <div className={`flex-1 min-w-[140px] ${cfg.color} rounded-2xl p-4 border ${
      label === "building_fund" ? "border-white/10" : "border-black/5"
    }`}>

      {/* Accent dot + label */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${cfg.accent}`} />
        <p className={`text-[12px] font-semibold uppercase tracking-widest ${
          label === "building_fund" ? "text-white/50" : "text-gray-500"
        }`}>
          {cfg.label}
        </p>
      </div>

      {/* Balance */}
      <div className="mb-1">
        <p className={`text-[11px] mb-0.5 ${
          label === "building_fund" ? "text-white/40" : "text-gray-400"
        }`}>
          Balance
        </p>
        <p className={`text-[20px] font-semibold leading-tight ${cfg.textColor}`}>
          {formatAmount(balance)}
        </p>
      </div>

      {/* Interest (loans only) */}
      {interest !== null && (
        <div className="mt-3 pt-3 border-t border-black/10">
          <p className="text-[11px] text-gray-400 mb-0.5">Interest</p>
          <p className="text-[15px] font-semibold text-[#A32D2D]">
            {formatAmount(interest)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;