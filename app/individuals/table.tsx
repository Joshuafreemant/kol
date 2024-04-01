import React, { useEffect, useState } from "react";
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
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";

import { columns, users } from "./data";
import { capitalize } from "./utils";
import AddPaymentModal from "../Components/AddPaymentModal";
import Link from "next/link";
import { postFetch } from "../lib/apiCall";
import { useDispatch } from "react-redux";
import { setAllUser } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/hooks";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

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
  console.log("allUsers", allUsers);

  const [filterValue, setFilterValue] = React.useState("");
  const [singleUser, setSingleUser] = React.useState<any>();
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
    // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status),
    //   );
    // }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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
      case "id":
        return <p>{allUsers.indexOf(user) + 1}.</p>;
      case "firstname":
        return (
          <div className="flex  items-center gap-2">
            <div className="bg-purple-600 text-white font-semibold h-10 w-10 rounded-full p-3 flex items-center justify-center">
              {user?.firstname[0]?.toUpperCase()}
            </div>
            <p className="font-normal text-small capitalize">{cellValue}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );

      case "status":
        return (
          <>
            {cellValue === "unapproved" ? (
              <div className="bg-red-400 text-white rounded text-center p-1">
                <p className="text-bold text-xs capitalize">{cellValue}</p>
              </div>
            ) : (
              <div className="bg-green-300 text-center rounded p-1">
                <p className="text-bold text-xs capitalize">{cellValue}</p>
              </div>
            )}
          </>
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
                {user?.status !== "approved" ? (
                  <DropdownItem
                    onClick={() => {
                      handleApprove(user);
                      console.log(user);
                    }}
                  >
                    Approve
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      handleUnApprove(user);
                      console.log(user);
                    }}
                  >
                    UnApprove
                  </DropdownItem>
                )}

                <DropdownItem>
                  <Link href={`dashboard/${user?._id}`}>View Dashboard</Link>
                </DropdownItem>
                <DropdownItem
                  onClick={(e: any) => {
                    setIsOpen(true);
                    handleAddRecord(user);
                  }}
                >
                  Add Payment Record
                </DropdownItem>
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

  const handleAddRecord = (data: any) => {
    setSingleUser(data);
  };
  const dispatch = useDispatch();

  const handleApprove = (data: any) => {
    // setLoading(true);
    postFetch("/authentication/change-status", {
      id: data._id,
      status: "approved",
    })
      .then((response: any) => {
        // setLoading(false);
        console.log(response?.data);
        dispatch(
          setAllUser(
            response?.data?.data.filter((data: any) => {
              return data.role !== "superuser";
            })
          )
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnApprove = (data: any) => {
    // setLoading(true);
    postFetch("/authentication/change-status", {
      id: data._id,
      status: "unapproved",
    })
      .then((response: any) => {
        // setLoading(false);

        dispatch(
          setAllUser(
            response?.data?.data.filter((data: any) => {
              return data.role !== "superuser";
            })
          )
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
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
            Total {allUsers?.length} users
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
    users.length,
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
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
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
