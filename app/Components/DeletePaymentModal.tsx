"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { postFetch } from "../lib/apiCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DeletePaymentModal({
  isDelOpen,
  setIsDelOpen,
  paymentData,
}: any) {
  function closeModal() {
    setIsDelOpen(false);
  }
  const [loading, setLoading] = useState(false);

  
  console.log("...paymentData",paymentData)
  function handleDeletePayment() {
    const singleUserId = paymentData?.individual;
    setLoading(true);
    postFetch("/individuals/delete-payment-record", {
      ...paymentData,
    })
      .then((response: any) => {
        setIsDelOpen(false);
        setLoading(false);
        toast(response?.data.message, {
          theme: "dark",
        });
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <ToastContainer />
      <Transition appear show={isDelOpen} as={Fragment}>
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
                <Dialog.Panel className="lg:w-3/12 md:w-4/12 w-full border overflow-hidden border-[#ccc] transform rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="px-7 py-6">
                    <p>Are you sure you want to Delete this payment details</p>
                    {loading ? (
                      <div className="bg-purple-900 text-white py-[10px] w-full text-center rounded-md">
                        Loading...
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center mt-6">
                        <button
                          onClick={() => setIsDelOpen(false)}
                          className="bg-gray-200 text-black py-[10px] w-full text-center rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeletePayment()}
                          className="bg-purple-900 text-white py-[10px] w-full text-center rounded-md"
                        >
                          Delete
                        </button>
                      </div>
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
