import React, { useState, useRef, useMemo } from "react";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Player, playersJson } from "./Players";
import { convertStringToNumber } from "../utils/convertStringToNumber";
import { teamsJson } from "../Teams";
import {
  abbrevsToPosition,
  ALL_POSITIONS,
  ALL_TEAMS,
  positionAbrevs,
} from "../constants";
import { data } from "react-router-dom";

const sortStringSalaries: SortingFn<Player> = (
  rowA: Row<Player>,
  rowB: Row<Player>,
  columnId: string
) => {
  return convertStringToNumber(rowA.original.baseSalary) >
    convertStringToNumber(rowB.original.baseSalary)
    ? -1
    : 1;
};

const columnHelper = createColumnHelper<Player>();
const columns = [
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor((row) => row.position, {
    id: "position",
    cell: (info) => info.getValue(),
    header: () => <span>Position</span>,
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("baseSalary", {
    header: () => <span>Base Salary</span>,
    footer: (info) => info.column.id,
    sortingFn: sortStringSalaries,
  }),
  columnHelper.accessor("guaranteedCompensation", {
    header: "Guaranteed Compensation",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("nationality", {
    header: "Player Nationality",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("contractEnd", {
    header: "Contract End",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("club", {
    header: "Club",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
];

function PlayerTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchVal, setSearchVal] = useState("");
  const [filterTeam, setFilterTeam] = useState<string>();
  const [filterPositions, setFilterPosition] = useState<string>();
  const a = useMemo(() => {
    console.log(filterPositions);
    return true;
  }, [filterPositions]);

  // const flatData = useMemo(() => {
  //   //sort data based on s orting state
  //   return playersJson.filter((row) => {
  //     const s = row.combinedRowInfo?.includes(searchVal);
  //     const t =
  //       !filterTeam || filterTeam === ALL_TEAMS || row.club === filterTeam; // default value doesnt really work
  //     const p = filterPositions === ALL_POSITIONS;
  //     console.log(filterPositions);
  //     // TODO add position filtering here -> convert from position to name
  //     return t;
  //   });
  // }, [filterPositions, filterTeam, searchVal]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data: playersJson,
    columns,
    state: { sorting, columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    debugTable: true,
  });

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: setSorting,
  }));

  const rows = useMemo(() => table.getRowModel().rows, [table]);

  return (
    <div
      className="text-center w-full h-full m-1"
      ref={tableContainerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <div className="flex sticky top-0 z-1 gap-2 bg-gray-100 p-1.5">
        <input
          className="border rounded-md text-sm text-black px-1 py-0.5"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="🔍 Search"
        />
        <select
          onChange={(e) => {
            setFilterTeam(e.target.value);
          }}
          value={filterTeam}
          className="border text-sm rounded-md px-1 py-0.5"
        >
          <option value={ALL_TEAMS}> All Teams</option>
          {teamsJson
            .sort((a, b) => a.teamName.localeCompare(b.teamName))
            .map((team) => (
              <option value={team.teamName} className="">
                {team.teamName}
              </option>
            ))}
        </select>

        <select
          onChange={(e) => setFilterPosition(e.target.value)}
          value={filterPositions}
          className="border text-sm rounded-md px-1 mx-4 py-0.5"
          defaultValue={undefined}
        >
          <option value={ALL_POSITIONS}> All Positions</option>
          {positionAbrevs.map((p) => (
            <option value={abbrevsToPosition.get(p)}>{p}</option>
          ))}
        </select>
      </div>
      <table className="w-full p-1">
        <thead style={{ position: "sticky", top: "37px", zIndex: 1 }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-gray-100 w-full border-black"
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

export default PlayerTable;
