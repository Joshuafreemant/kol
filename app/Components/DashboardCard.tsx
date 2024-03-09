import React from "react";

const DashboardCard = ({ data, label }: any) => {
  let totalSharesDebit = 0;
  let totalSharesCredit = 0;

  let totalSavingsDebit = 0;
  let totalSavingsCredit = 0;

  let totalLoansDebit = 0;
  let totalLoansCredit = 0;

  let totalBuildingDebit = 0;
  let totalBuildingCredit = 0;

  let totalInvestmentDebit = 0;
  let totalInvestmentCredit = 0;
  // Iterate over each object in the data array
  data.forEach((item: any) => {
    // Extract debit and credit values from the "shares" object of each item
    const { debit, credit } = item.shares;
    const { debit: savingsDebit, credit: savingsCredit } = item.savings;
    const { debit: loansDebit, credit: loansCredit } = item.loans;
    const { debit: buildingDebit, credit: buildingCredit } = item.building_fund;
    const { debit: investmentDebit, credit: investmentCredit } =
      item.investment_fund;
    // Convert debit and credit values to numbers and add them to the totals
    totalSharesDebit += parseInt(debit);
    totalSharesCredit += parseInt(credit);

    totalSavingsDebit += parseInt(savingsDebit);
    totalSavingsCredit += parseInt(savingsCredit);

    totalLoansDebit += parseInt(loansDebit);
    totalLoansCredit += parseInt(loansCredit);

    totalBuildingDebit += parseInt(buildingDebit);
    totalBuildingCredit += parseInt(buildingCredit);

    totalInvestmentDebit += parseInt(investmentDebit);
    totalInvestmentCredit += parseInt(investmentCredit);
  });
  return (
    <>
      {label === "shares" && (
        <div className="w-[30%] bg-purple-300  rounded-md p-3 md:p-4">
        <h1 className="md:text-2xl font-bold text-xl">Shares</h1>
        <div className="flex md:items-center justify-between lg:flex-row flex-col">
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Credit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalSharesCredit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Debit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalSharesDebit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
          </div>
        </div>
      )}
      {label === "savings" && (
         <div className="w-[30%] bg-blue-300  rounded-md p-3 md:p-4">
        <h1 className="md:text-2xl font-bold text-xl">Savings</h1>
        <div className="flex md:items-center justify-between lg:flex-row flex-col">
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Credit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalSavingsCredit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Debit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalSavingsDebit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
          </div>
        </div>
      )}
      {label === "loans" && (
        <div className="w-[30%] bg-red-300  rounded-md p-3 md:p-4">
          <h1 className="md:text-2xl font-bold text-xl">Loans</h1>
          <div className="flex md:items-center justify-between lg:flex-row flex-col">
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs ">
                Total Credit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalLoansCredit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Debit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalLoansDebit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
          </div>
        </div>
      )}

      {label === "building_fund" && (
         <div className="w-[30%] bg-black  rounded-md p-3 md:p-4">
         <h1 className="md:text-2xl font-bold text-xl text-white">Building</h1>
         <div className="flex md:items-center justify-between lg:flex-row flex-col">
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs  text-white">
                Total Credit
              </label>
              <h4 className="font-semibold  text-white text-sm">
                {" "}
                ₦
                {`${Number(totalBuildingCredit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
            <div className="flex flex-col mt-2  text-white">
              <label htmlFor="" className="text-xs">
                Total Debit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalBuildingDebit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
          </div>
        </div>
      )}

      {label === "investment_fund" && (
        <div className="w-[65%] md:w-[30%] bg-green-300  rounded-md p-3 md:p-4">
        <h1 className="md:text-2xl font-bold text-xl">Investment</h1>
        <div className="flex md:items-center justify-between lg:flex-row flex-col">
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Credit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalInvestmentCredit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-xs">
                Total Debit
              </label>
              <h4 className="font-semibold text-sm">
                {" "}
                ₦
                {`${Number(totalInvestmentDebit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCard;
