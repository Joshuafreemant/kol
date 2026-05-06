"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { getFetch, postFetch } from "../lib/apiCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const inputCls =
  "w-full text-[13px] px-3 py-2.5 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-[#534AB7] focus:bg-white transition-colors";

const labelCls = "text-[12px] font-medium text-gray-500 mb-1 block";

const fmt = (val: number) =>
  `₦${Number(val)?.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

// ── Reusable section ──────────────────────────────────────────────────────────
const FundSection = ({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) => (
  <div className="mt-5">
    <div className={`flex items-center gap-2 px-1 mb-3`}>
      <div className={`w-2.5 h-2.5 rounded-full ${accent}`} />
      <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-500">
        {title}
      </p>
    </div>
    <div className="grid grid-cols-3 gap-2">{children}</div>
  </div>
);

// ── DrCrBal field group ───────────────────────────────────────────────────────
const DrCrField = ({
  label,
  hint,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  onChange: (val: number) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col">
    <label className={labelCls}>
      {label}
      {hint && (
        <span className="ml-1 text-[#534AB7] font-normal normal-case tracking-normal">
          ({hint})
        </span>
      )}
    </label>
    <CurrencyInput
      prefix="₦"
      decimalsLimit={2}
      placeholder={placeholder || "₦0"}
      className={inputCls}
      onValueChange={(value) => onChange(Number(value) || 0)}
    />
  </div>
);

export default function AddPaymentModal({
  isOpen,
  setIsOpen,
  singleUser,
}: any) {
  const router = useRouter();
  const [allRecords, setAllRecords] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const sharesBalance = Number(allRecords[0]?.shares?.balance) || 0;
  const savingsBalance = Number(allRecords[0]?.savings?.balance) || 0;
  const loansBalance = Number(allRecords[0]?.loans?.balance) || 0;
  const buildingBalance = Number(allRecords[0]?.building_fund?.balance) || 0;
  const investmentBalance =
    Number(allRecords[0]?.investment_fund?.balance) || 0;
  const devBalance = Number(allRecords[0]?.development?.balance) || 0;

  const emptyFund = { debit: 0, credit: 0, balance: 0 };

  const [record, setRecord] = useState<any>({
    individual: "",
    date: "",
    amount: 0,
    shares: { ...emptyFund },
    savings: { ...emptyFund },
    loans: { ...emptyFund, interest: 0 },
    building_fund: { ...emptyFund },
    investment_fund: { ...emptyFund },
    development: { ...emptyFund },
    user: "",
    certified_by: "",
  });

  const individual = singleUser?._id;

  const setFund = (key: string, field: string, value: number) => {
    setRecord((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const projectedBal = (current: number, key: string) =>
    fmt(current + (record[key]?.credit || 0) - (record[key]?.debit || 0));

  function handleSavePayment() {
    // Validate before submitting
    if (!record.date) {
      toast("Please select a date before saving.", { theme: "dark" });
      return;
    }
    if (!record.amount || record.amount === 0) {
      toast("Please enter an amount before saving.", { theme: "dark" });
      return;
    }

    setLoading(true);
    postFetch("/individuals/add-payment-record", { ...record, individual })
      .then((response: any) => {
        setLoading(false);

        // Handle API-level errors returned in the response body
        if (response?.response?.data?.error) {
          toast(response.response.data.error, { theme: "dark" });
          return;
        }
        if (response?.response?.data?.message) {
          toast(response.response.data.message, { theme: "dark" });
          return;
        }

        toast(response?.data?.message || "Record saved successfully.", {
          theme: "dark",
        });
        setIsOpen(false);
        router.push(`/dashboard/${individual}`);
        router.refresh();
      })
      .catch((error: any) => {
        setLoading(false);
        // Surface the actual error message
        const msg =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "An error occurred. Please try again.";
        toast(msg, { theme: "dark" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!individual) return;
    getFetch(`/individuals/${individual}`).then((response: any) => {
      setAllRecords(response?.data?.data);
    });
  }, [individual]);

  return (
    <>
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-[#1a1433] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#534AB7] flex items-center justify-center text-white text-[14px] font-semibold shrink-0">
                        {singleUser?.firstname?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p
                          className="text-white text-[15px] font-semibold leading-tight"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {singleUser?.firstname} {singleUser?.lastname}
                        </p>
                        <p className="text-white/40 text-[11px]">
                          Add payment record
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 max-h-[72vh] overflow-y-auto">
                    {/* Date + Amount */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>
                          Date
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setRecord({ ...record, date: e.target.value })
                          }
                          className={`${inputCls} ${!record.date ? "border-red-200" : "border-gray-200"}`}
                        />
                        {!record.date && (
                          <p className="text-[11px] text-red-400 mt-1">
                            Required
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelCls}>
                          Amount (Particulars)
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <CurrencyInput
                          prefix="₦"
                          decimalsLimit={2}
                          placeholder="₦0"
                          className={inputCls}
                          onValueChange={(value) =>
                            setRecord({ ...record, amount: Number(value) || 0 })
                          }
                        />
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-5" />

                    {/* Shares */}
                    <FundSection title="Shares" accent="bg-[#534AB7]">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("shares", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) => setFund("shares", "credit", v)}
                      />
                      <DrCrField
                        label="Balance"
                        hint={projectedBal(sharesBalance, "shares")}
                        onChange={(v) => setFund("shares", "balance", v)}
                        placeholder={projectedBal(sharesBalance, "shares")}
                      />
                    </FundSection>

                    {/* Savings */}
                    <FundSection title="Savings" accent="bg-[#378ADD]">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("savings", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) => setFund("savings", "credit", v)}
                      />
                      <DrCrField
                        label="Balance"
                        hint={projectedBal(savingsBalance, "savings")}
                        onChange={(v) => setFund("savings", "balance", v)}
                        placeholder={projectedBal(savingsBalance, "savings")}
                      />
                    </FundSection>

                    {/* Loans */}
                    <FundSection title="Loans" accent="bg-[#E24B4A]">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("loans", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) => setFund("loans", "credit", v)}
                      />
                      <DrCrField
                        label="Balance"
                        hint={fmt(loansBalance)}
                        onChange={(v) => setFund("loans", "balance", v)}
                      />
                      {/* Interest spans full width */}
                      <div className="col-span-3">
                        <DrCrField
                          label="Interest"
                          onChange={(v) => setFund("loans", "interest", v)}
                          placeholder="₦0"
                        />
                      </div>
                    </FundSection>

                    {/* Building Fund */}
                    <FundSection title="Building Fund" accent="bg-gray-700">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("building_fund", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) => setFund("building_fund", "credit", v)}
                      />
                      <DrCrField
                        label="Balance"
                        hint={projectedBal(buildingBalance, "building_fund")}
                        onChange={(v) => setFund("building_fund", "balance", v)}
                        placeholder={projectedBal(
                          buildingBalance,
                          "building_fund",
                        )}
                      />
                    </FundSection>

                    {/* Investment Fund */}
                    <FundSection title="Investment Fund" accent="bg-[#639922]">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("investment_fund", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) =>
                          setFund("investment_fund", "credit", v)
                        }
                      />
                      <DrCrField
                        label="Balance"
                        hint={projectedBal(
                          investmentBalance,
                          "investment_fund",
                        )}
                        onChange={(v) =>
                          setFund("investment_fund", "balance", v)
                        }
                        placeholder={projectedBal(
                          investmentBalance,
                          "investment_fund",
                        )}
                      />
                    </FundSection>

                    {/* Development Levy */}
                    <FundSection title="Development Levy" accent="bg-[#BA7517]">
                      <DrCrField
                        label="Debit (Dr)"
                        onChange={(v) => setFund("development", "debit", v)}
                      />
                      <DrCrField
                        label="Credit (Cr)"
                        onChange={(v) => setFund("development", "credit", v)}
                      />
                      <DrCrField
                        label="Balance"
                        hint={projectedBal(devBalance, "development")}
                        onChange={(v) => setFund("development", "balance", v)}
                        placeholder={projectedBal(devBalance, "development")}
                      />
                    </FundSection>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={handleSavePayment}
                      disabled={loading}
                      className={`w-full py-3.5 text-[15px] font-semibold text-white rounded-xl tracking-wide transition-all ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#3C3489] hover:bg-[#534AB7] active:scale-[0.99]"
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <span className="w-[16px] h-[16px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving record...
                        </span>
                      ) : (
                        "Save & Submit"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
