import React from "react";
const columns = [
  {name: "Date", uid: "date", sortable: true},
  {name: "Particulars", uid: "particulars", sortable: true},
  {name: "Shares", uid: "shares", sortable: true},
  {name: "Savings", uid: "savings", sortable: true},
  {name: "Loans", uid: "loans"},
  {name: "Building Fund", uid: "building_fund"},
  {name: "Investment Funds", uid: "investment_fund"},
  {name: "Actions", uid: "actions"},
];


const records = [
  {
    individual:1,
    date: "02/03/2024",
    particulars: "40000",
    shares: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    savings: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    loans: {
        debit:"2000",
        credit:"4000",
        balance:"2000",
        interest:"0"
    },
    building_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    investment_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
  },
  {
    individual:1,
    date: "02/03/2024",
    particulars: "40000",
    shares: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    savings: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    loans: {
        debit:"2000",
        credit:"4000",
        balance:"2000",
        interest:"0"
    },
    building_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    investment_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
  },
  {
    individual:1,
    date: "02/03/2024",
    particulars: "40000",
    shares: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    savings: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    loans: {
        debit:"2000",
        credit:"4000",
        balance:"2000",
        interest:"0"
    },
    building_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
    investment_fund: {
        debit:"2000",
        credit:"4000",
        balance:"2000"
    },
  },
];  



export {columns,records};



















