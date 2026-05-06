"use client";
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
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
  Pagination,
  Selection,
  SortDescriptor,
  ChipProps,
} from "@nextui-org/react";
import { columns, users } from "./data";
import AddPaymentModal from "../Components/AddPaymentModal";
import { postFetch } from "../lib/apiCall";
import { useDispatch } from "react-redux";
import { setAllUser } from "@/redux/slices/userSlice";

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "firstname",
  "lastname",
  "phone_number",
  "email",
  "status",
  "role",
  "actions",
];

type User = (typeof users)[0];

export default function IndividualTables({ allUsers, isOpen, setIsOpen }: any) {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = React.useState("");
  const [singleUser, setSingleUser] = React.useState<any>();
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...allUsers];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.firstname.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [allUsers, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleApprove = (data: any) => {
    postFetch("/authentication/change-status", { id: data._id, status: "approved" })
      .then((response: any) => {
        dispatch(
          setAllUser(
            response?.data?.data.filter((d: any) => d.role !== "superuser")
          )
        );
        window.location.reload();
      })
      .catch(console.log);
  };

  const handleUnApprove = (data: any) => {
    postFetch("/authentication/change-status", { id: data._id, status: "unapproved" })
      .then((response: any) => {
        dispatch(
          setAllUser(
            response?.data?.data.filter((d: any) => d.role !== "superuser")
          )
        );
        window.location.reload();
      })
      .catch(console.log);
  };

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];
    switch (columnKey) {
      case "id":
        return (
          <p className="text-[13px] text-gray-400 font-medium">
            {allUsers.indexOf(user) + 1}.
          </p>
        );
      case "firstname":
        return (
          <div className="flex items-center gap-3">
            <div className="bg-[#3C3489] text-white text-[13px] font-semibold h-9 w-9 rounded-full flex items-center justify-center shrink-0">
              {user?.firstname[0]?.toUpperCase()}
            </div>
            <p className="text-[14px] font-medium text-gray-800 capitalize">
              {cellValue}
            </p>
          </div>
        );
      case "role":
        return (
          <span className="text-[13px] text-gray-600 capitalize bg-gray-100 px-2.5 py-1 rounded-full">
            {cellValue}
          </span>
        );
      case "status":
        return cellValue === "unapproved" ? (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-[12px] font-medium px-2.5 py-1 rounded-full capitalize">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {cellValue}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-[12px] font-medium px-2.5 py-1 rounded-full capitalize">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {cellValue}
          </span>
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
                {user?.status !== "approved" ? (
                  <DropdownItem
                    onClick={() => handleApprove(user)}
                    className="text-green-600"
                  >
                    Approve member
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => handleUnApprove(user)}
                    className="text-red-500"
                  >
                    Revoke approval
                  </DropdownItem>
                )}
                <DropdownItem>
                  <a href={`dashboard/${user?._id}`}>View dashboard</a>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setIsOpen(true);
                    setSingleUser(user);
                  }}
                >
                  Add payment record
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return (
          <span className="text-[13px] text-gray-700">{cellValue}</span>
        );
    }
  }, [allUsers]);

  const onSearchChange = React.useCallback((value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => (
    <div className="flex flex-col gap-4 mb-2">
      <div className="flex justify-between gap-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<IoSearchSharp className="text-gray-400" />}
          value={filterValue}
          onClear={() => { setFilterValue(""); setPage(1); }}
          onValueChange={onSearchChange}
        />
        <span className="text-[13px] text-gray-400">
          {filteredItems.length} member{filteredItems.length !== 1 ? "s" : ""} found
        </span>
      </div>
      <div className="flex justify-end">
        <label className="flex items-center text-[13px] text-gray-400 gap-2">
          Rows per page:
          <select
            className="bg-transparent outline-none text-gray-500 text-[13px]"
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value="50">50</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
    </div>
  ), [filterValue, filteredItems.length, onSearchChange]);

  const bottomContent = React.useMemo(() => (
    <div className="py-3 px-2 flex justify-between items-center border-t border-gray-100 mt-2">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex gap-2">
        <Button
          isDisabled={page === 1}
          size="sm"
          variant="flat"
          onPress={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <Button
          isDisabled={page === pages}
          size="sm"
          variant="flat"
          onPress={() => setPage((p) => Math.min(pages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  ), [page, pages]);

  return (
    <>
      <Table
        aria-label="KOL Cooperative Society members"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[520px] shadow-none border border-gray-100 rounded-xl",
          th: "bg-[#f5f4f9] text-[#3C3489] text-[13px] font-semibold uppercase tracking-wide",
          td: "py-3",
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
        <TableBody emptyContent={"No members found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id} className="hover:bg-[#f5f4f9] transition-colors">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddPaymentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        singleUser={singleUser}
      />
    </>
  );
}