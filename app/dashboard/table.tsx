// IndividualPaymentTable (table.tsx)
"use client";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Pagination, Selection, SortDescriptor, ChipProps,
} from "@nextui-org/react";
import { columns, records } from "./data";
import AddPaymentModal from "../Components/AddPaymentModal";
import EditPaymentModal from "../Components/EditPaymentModal";
import DashboardCard from "../Components/DashboardCard";
import DeletePaymentModal from "../Components/DeletePaymentModal";
import { useAppSelector } from "@/redux/hooks";

type RecordType = (typeof records)[0];

const fmt = (value: any) =>
  `₦${Number(value)?.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const DrCrBal = ({ cellValue, extra }: { cellValue: any; extra?: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <div>
      <p className="text-[10px] text-gray-400 font-semibold uppercase">Dr</p>
      <p className="text-[12px] text-gray-700">{fmt(cellValue?.debit)}</p>
    </div>
    <div>
      <p className="text-[10px] text-gray-400 font-semibold uppercase">Cr</p>
      <p className="text-[12px] text-gray-700">{fmt(cellValue?.credit)}</p>
    </div>
    <div>
      <p className="text-[10px] text-gray-400 font-semibold uppercase">Bal</p>
      <p className="text-[12px] font-semibold text-[#3C3489]">{fmt(cellValue?.balance)}</p>
    </div>
    {extra}
  </div>
);

export default function IndividualPaymentTable({
  record, isOpen, setIsOpen, setIsDelOpen, isDelOpen,
}: any) {
  const userData: any = useAppSelector((state) => state.user);
  const userDetail = userData?.user;

  const INITIAL_VISIBLE_COLUMNS = [
    "date", "particulars", "shares", "savings", "loans",
    "building_fund", "investment_fund", "development",
    userDetail?.role === "member" ? "" : "actions",
  ];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age", direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [paymentData, setPaymentData] = React.useState<any>();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => Array.from(visibleColumns).includes(col.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...record];
    if (hasSearchFilter) {
      filtered = filtered.filter((r) =>
        r.date.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filtered;
  }, [record, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first  = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];
    switch (columnKey) {
      case "date":
        return <p className="text-[12px] text-gray-500 whitespace-nowrap">{cellValue}</p>;
      case "particulars":
        return <p className="text-[12px] font-medium text-gray-700">{fmt(user?.amount)}</p>;
      case "shares":
        return <DrCrBal cellValue={cellValue} />;
      case "savings":
        return <DrCrBal cellValue={cellValue} />;
      case "building_fund":
        return <DrCrBal cellValue={cellValue} />;
      case "investment_fund":
        return <DrCrBal cellValue={cellValue} />;
      case "development":
        return <DrCrBal cellValue={cellValue} />;
      case "loans":
        return (
          <DrCrBal
            cellValue={cellValue}
            extra={
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Interest</p>
                <p className="text-[12px] text-red-500">{fmt(cellValue?.interest)}</p>
              </div>
            }
          />
        );
      case "actions":
        return (
          <div className="flex justify-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <HiOutlineDotsVertical className="text-gray-500" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  className="text-red-500"
                  onClick={() => { setIsDelOpen(true); setPaymentData(user); }}
                >
                  Delete record
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <span className="text-[12px] text-gray-600">{cellValue}</span>;
    }
  }, []);

  const topContent = React.useMemo(() => (
    <div className="flex flex-col gap-3 mb-2">
      <div className="flex justify-between items-center gap-3">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by date (YYYY-MM-DD)..."
          startContent={<IoSearchSharp className="text-gray-400" />}
          value={filterValue}
          onClear={() => { setFilterValue(""); setPage(1); }}
          onValueChange={(v) => { setFilterValue(v || ""); setPage(1); }}
        />
        <span className="text-[13px] text-gray-400 whitespace-nowrap">
          {filteredItems.length} record{filteredItems.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="flex justify-end">
        <label className="flex items-center text-[13px] text-gray-400 gap-2">
          Rows per page:
          <select
            className="bg-transparent outline-none text-gray-500 text-[13px]"
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </label>
      </div>
    </div>
  ), [filterValue, filteredItems.length]);

  const bottomContent = React.useMemo(() => (
    <div className="py-3 px-2 flex justify-between items-center border-t border-gray-100 mt-2">
      <Pagination
        isCompact showControls showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex gap-2">
        <Button isDisabled={page === 1} size="sm" variant="flat"
          onPress={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </Button>
        <Button isDisabled={page === pages} size="sm" variant="flat"
          onPress={() => setPage((p) => Math.min(pages, p + 1))}>
          Next
        </Button>
      </div>
    </div>
  ), [page, pages]);

  return (
    <>
      {/* Balance cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 mt-20 md:mt-0">
        {["shares", "savings", "loans", "building_fund", "investment_fund", "development"].map((label) => (
          <DashboardCard key={label} data={record} label={label} />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_12px_rgba(60,52,137,0.06)] p-4">
        <Table
          aria-label="KOL Cooperative Society payment records"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[500px] shadow-none border border-gray-100 rounded-xl",
            th: "bg-[#f5f4f9] text-[#3C3489] text-[11px] font-semibold uppercase tracking-wide",
            td: "py-2.5",
          }}
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No records found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.individual} className="hover:bg-[#f5f4f9] transition-colors">
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditPaymentModal isOpen={isOpen} setIsOpen={setIsOpen} paymentData={paymentData} />
      <DeletePaymentModal isDelOpen={isDelOpen} setIsDelOpen={setIsDelOpen} paymentData={paymentData} />
    </>
  );
}