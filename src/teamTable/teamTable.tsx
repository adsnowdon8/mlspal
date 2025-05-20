import React, { useState, useRef, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Team, teamsJson } from "../Teams";

const columnHelper = createColumnHelper<Team>();
const columns = [
  columnHelper.accessor("Team", {
    header: () => "Team",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Coach", {
    header: () => "Coach",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  // columnHelper.accessor((row) => row.rosterSlotsFilled, {
  //   id: "Roster Slots Filled",
  //   cell: (info) => info.getValue(),
  //   header: () => <span>Position</span>,
  //   footer: (info) => info.column.id,
  //   sortingFn: "alphanumeric",
  // }),
  columnHelper.accessor("Owner", {
    header: () => "Owner",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("GM", {
    header: () => <span>GM</span>,
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("City", {
    header: "Owner",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Position_End_Last_Season", {
    header: "2024 Position",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("MLS_Playoffs", {
    header: "Made 2024 Playoffs",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Roster_Model", {
    header: "Roster Model",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Number_of_Roster_Slots_Filled", {
    header: "Number of Roster Slots Filled",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("International_Slots_Filled", {
    header: "International Slots Filled",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
];

function TeamTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = teamsJson;
  const flatData = useMemo(() => {
    //sort data based on s orting state
    return data?.flatMap((page) => page) ?? [];
  }, [data]);

  const isLoading = false;

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: setSorting,
  }));

  const { rows } = table.getRowModel();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div
      className="text-center w-full h-full px-1 border"
      ref={tableContainerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <table className="">
        <thead
          style={{
            position: "sticky",
            top: "0",
            zIndex: 1,
            // background: "white",
          }}
          className="bg-gray-100"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full border-b border-gray-100"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-grey-200  hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;
