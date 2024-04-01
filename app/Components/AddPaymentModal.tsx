"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { postFetch } from "../lib/apiCall";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
export default function AddPaymentModal({
  isOpen,
  setIsOpen,
  singleUser,
}: any) {

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  const [loading, setLoading] = useState(false);

  const [record, setRecord] = useState<any>({
    individual: "",
    date: "",
    amount: "",
    shares: {
      debit: "0",
      credit: "0",
      balance: "0",
    },
    savings: {
      debit: "0",
      credit: "0",
      balance: "0",
    },
    loans: {
      debit: "0",
      credit: "0",
      balance: "0",
      interest: "0",
    },
    building_fund: {
      debit: "0",
      credit: "0",
      balance: "0",
    },
    investment_fund: {
      debit: "0",
      credit: "0",
      balance: "0",
    },
    user: "",
    certified_by: "",
  });

  let individual = singleUser?._id;
  function handleSavePayment() {
    setLoading(true);
    postFetch("/individuals/add-payment-record", {
      ...record,
      individual
    })
      .then((response: any) => {
        setIsOpen(false);
        setLoading(false);
        toast(response?.data.message, {
          theme: "dark",
        });
        // router.push(`/individuals`);
      router.push(`/dashboard/${individual}`);
      // window.location.reload()


      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsOpen(false);
      });
  }

  return (
    <>
    <ToastContainer/>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="lg:w-5/12 md:w-6/12 w-full border overflow-hidden border-[#ccc] transform rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <h4 className="bg-purple-800 text-center font-bold p-2 text-white">
                    {singleUser?.firstname + " "} {singleUser?.lastname}
                  </h4>

                  <div className="p-3">
                    <div className="p-2 h-[500px] overflow-y-scroll pb-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col w-1/2">
                          <label htmlFor="" className="text-[13px] mb-1">
                            Date
                          </label>

                          <input
                            type="date"
                            onChange={(e: any) => {
                              setRecord({
                                ...record,
                                date: e.target.value,
                              });
                            }}
                            className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <label htmlFor="" className="text-[13px] mb-1">
                            Amount
                          </label>
                          <CurrencyInput
                            placeholder="Particulars"
                            prefix="₦"
                            decimalsLimit={2}
                            className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                            onValueChange={(value) => {
                              setRecord({
                                ...record,
                                amount: value,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 px-2 py-[2px]">
                          <label className="font-semibold text-sm">
                            Shares
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-3 mt-1">
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Dr
                            </label>

                            <CurrencyInput
                              placeholder="Debit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  shares: {
                                    ...record.shares,
                                    debit: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Cr
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  shares: {
                                    ...record.shares,
                                    credit: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Balance
                            </label>

                            <CurrencyInput
                              placeholder="Balance Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  shares: {
                                    ...record.shares,
                                    balance: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 px-2 py-[2px]">
                          <label className="font-semibold text-sm">
                            Savings
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-3 mt-1">
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Dr
                            </label>

                            <CurrencyInput
                              placeholder="Debit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  savings: {
                                    ...record.savings,
                                    debit: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Cr
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  savings: {
                                    ...record.savings,
                                    credit: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Balance
                            </label>

                            <CurrencyInput
                              placeholder="Balance Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  savings: {
                                    ...record.savings,
                                    balance: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 px-2 py-[2px]">
                          <label className="font-semibold text-sm">Loans</label>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-5 mt-1">
                          <div className="flex flex-col w-1/4">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Dr
                            </label>

                            <CurrencyInput
                              placeholder="Debit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  loans: {
                                    ...record.loans,
                                    debit: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div className="flex flex-col w-1/4">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Cr
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  loans: {
                                    ...record.loans,
                                    credit: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/4">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Balance
                            </label>

                            <CurrencyInput
                              placeholder="Balance Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  loans: {
                                    ...record.loans,
                                    balance: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/4">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Interest
                            </label>

                            <CurrencyInput
                              placeholder="Interest Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  loans: {
                                    ...record.loans,
                                    interest: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 px-2 py-[2px]">
                          <label className="font-semibold text-sm">
                            investment Fund
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-3 mt-1">
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Dr
                            </label>

                            <CurrencyInput
                              placeholder="Debit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  building_fund: {
                                    ...record.building_fund,
                                    debit: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Cr
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  building_fund: {
                                    ...record.building_fund,
                                    credit: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Balance
                            </label>

                            <CurrencyInput
                              placeholder="Balance Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  building_fund: {
                                    ...record.building_fund,
                                    balance: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 px-2 py-[2px]">
                          <label className="font-semibold text-sm">
                            Investment Fund
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-3 mt-1">
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Dr
                            </label>

                            <CurrencyInput
                              placeholder="Debit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  investment_fund: {
                                    ...record.investment_fund,
                                    debit: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Cr
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  investment_fund: {
                                    ...record.investment_fund,
                                    credit: value,
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-1/3">
                            <label htmlFor="" className="text-[13px] mb-1">
                              Balance
                            </label>

                            <CurrencyInput
                              placeholder="Credit Amount"
                              prefix="₦"
                              decimalsLimit={2}
                              className="text-xs px-2 py-[6px] rounded-[4px] border border-gray-400"
                              onValueChange={(value) => {
                                setRecord((record: any) => ({
                                  ...record,
                                  investment_fund: {
                                    ...record.investment_fund,
                                    balance: value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {loading ? (
                      <div className="bg-purple-900 text-white py-[10px] w-full text-center rounded-md">
                        loading...
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSavePayment()}
                        className="bg-purple-900 text-white py-[10px] w-full text-center rounded-md"
                      >
                        Save & Submit
                      </button>
                    )}
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
