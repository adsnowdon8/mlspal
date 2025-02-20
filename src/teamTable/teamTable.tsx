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
  columnHelper.accessor("teamName", {
    header: () => "Team Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("coach", {
    header: () => "Coach",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => row.rosterSlotsFilled, {
    id: "Roster Slots Filled",
    cell: (info) => info.getValue(),
    header: () => <span>Position</span>,
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("position2024", {
    header: () => "2024 Position",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("madePlayoffs", {
    header: () => <span>Made Playoffs</span>,
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("gm", {
    header: "GM",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("foundingYear", {
    header: "Founding Year",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("location", {
    header: "Location",
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
    const filteredData = data.filter((row) => {
      //   const s = row.combinedRowInfo?.includes(searchVal);
      //   const t =
      // !filterTeam || filterTeam === ALL_TEAMS || row.club === filterTeam; // default value doesnt really work
      //   const p = filterPositions === ALL_POSITIONS;
      // TODO add position filtering here -> convert from position to name
      return true;
    });
    return filteredData?.flatMap((page) => page) ?? [];
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
      className="text-center w-full h-ful"
      ref={tableContainerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <table className="w-full">
        <thead style={{ position: "sticky", top: "0", zIndex: 1 }}>
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
            <tr key={row.id} className="border-b border-grey-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
