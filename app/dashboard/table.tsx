import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";

import { columns, records } from "./data";
import { capitalize } from "./utils";
import AddPaymentModal from "../Components/AddPaymentModal";
import EditPaymentModal from "../Components/EditPaymentModal";
import DashboardCard from "../Components/DashboardCard";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const userData: any = localStorage.getItem("kol_user");
const user = JSON.parse(userData) || {};
const INITIAL_VISIBLE_COLUMNS = [
  "date",
  "particulars",
  "shares",
  "savings",
  "loans",
  "building_fund",
  "investment_fund",
  user?.role === "member" ? "" : "actions",
];

type User = (typeof records)[0];

export default function IndividualPaymentTable({
  record,
  isOpen,
  setIsOpen,
}: any) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [userId, setUserId] = React.useState("");
  const [paymentData, setPaymentData] = React.useState<any>();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...record];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        console.log(user);
        return user.date.toLowerCase().includes(filterValue.toLowerCase());
      });
    }
    // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status),
    //   );
    // }

    return filteredUsers;
  }, [record, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];

    switch (columnKey) {
      case "date":
        return <p className="text-xs">{cellValue}</p>;
      case "particulars":
        return (
          <p className="text-xs">
            ₦
            {`${Number(user?.amount)?.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}`}
          </p>
        );

      case "shares":
        return (
          <div className="flex  items-center gap-4">
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Dr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.debit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Cr</p>
              <p className="text-xs">
                {" "}
                ₦
                {`${Number(cellValue?.credit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Bal</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.balance)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        );

      case "savings":
        return (
          <div className="flex  items-center gap-4">
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Dr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.debit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Cr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.credit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Bal</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.balance)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        );
      case "loans":
        return (
          <div className="flex  items-center gap-4">
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Dr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.debit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Cr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.credit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Bal</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.balance)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>

            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Interest</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.interest)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        );

      case "building_fund":
        return (
          <div className="flex  items-center gap-4">
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Dr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.debit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Cr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.credit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Bal</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.balance)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        );
      case "investment_fund":
        return (
          <div className="flex  items-center gap-4">
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Dr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.debit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Cr</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.credit)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
            <div className="">
              <p className="text-xs text-gray-400 font-semibold">Bal</p>
              <p className="text-xs">
                ₦
                {`${Number(cellValue?.balance)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}`}
              </p>
            </div>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <HiOutlineDotsVertical className="text-gray-700 font-semibold" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={(e: any) => {
                    setIsOpen(true);
                    setPaymentData(user);
                  }}
                >
                  Edit Payment Record
                </DropdownItem>
                {/* <DropdownItem>Delete Payment Record</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by date YYYY-MM-DD..."
            startContent={<IoSearchSharp />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          {/* <div className="flex gap-3">
            <Button color="primary" endContent={<CiSquarePlus />}>
              Add New
            </Button>
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {record.length} Payment Record
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    record.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <div className="mt-24 md:mt-0 lg:justify-between mb-4  w-full flex md:gap-6 gap-3 flex-wrap lg:flex-nowrap">
        
        <DashboardCard data={record} label="shares"/>
        <DashboardCard data={record} label="savings"/>
        <DashboardCard data={record} label="loans"/>
        <DashboardCard data={record} label="building_fund"/>
        <DashboardCard data={record} label="investment_fund"/>
      </div>
      <Table
        aria-label="KOL Cooperative society"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[500px]",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
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
        <TableBody emptyContent={"No Record found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.individual}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditPaymentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paymentData={paymentData}
      />
    </>
  );
}
