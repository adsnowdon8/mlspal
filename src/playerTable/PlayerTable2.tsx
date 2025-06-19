import React, { useState } from "react";

import "../index.css";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// import { makeData, Person } from "./makeData";
import { Player, playersJson } from "./Players";
import { abbrevsToPosition, positionAbrevs } from "../constants";
import { teamsJson } from "../Teams";
import { NavLink, useNavigate } from "react-router-dom";
import { TeamLogoViewer } from "./TeamLogoViewer";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | "text"
      | "range"
      | "select"
      | "position"
      | "club"
      | "rosterDesignation";
  }
}

export const PlayerTable2 = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const navigate = useNavigate();

  const columns = React.useMemo<ColumnDef<Player, any>[]>(
    () => [
      {
        accessorKey: "Shirt_Number",
        header: "Shirt Number",
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorKey: "Name",
        header: "Name",
        cell: (info) => info.getValue(),
        // enableColumnFilter: false ,
      },
      // {
      //   accessorKey: "First_Name",
      //   header: "First Name",
      //   cell: (info) => info.getValue(),
      //   // enableColumnFilter: false ,
      // },
      // {
      //   // accessorFn: (row) => row.lastName,
      //   accessorKey: "Last_Name",
      //   id: "lastName",
      //   cell: (info) => info.getValue(),
      //   header: () => <span>Last Name</span>,
      //   // enableColumnFilter: false,
      // },
      {
        accessorKey: "Position",
        header: () => "Position",
        meta: {
          filterVariant: "position",
        },
      },
      {
        accessorKey: "Team",
        header: "Club",
        meta: {
          filterVariant: "club",
        },
        // cell: (info) => info.getValue(),
        cell: (info) => <TeamLogoViewer club={info.getValue()} />,
      },
      {
        accessorKey: "Age",
        header: () => "Age",
        enableColumnFilter: false,
      },
      {
        accessorKey: "Contract_End",
        header: () => "Contract End",
        enableColumnFilter: false,

        // meta: {
        //   filterVariant: "range",
        // },
      },
      // {
      //   accessorKey: "Option_Years",
      //   header: () => "Option Years",
      //   enableColumnFilter: false,

      //   // meta: {
      //   //   filterVariant: "range",
      //   // },
      // },

      {
        accessorKey: "Roster_Designation",
        header: "Roster Designation",
        enableColumnFilter: false,
        meta: {
          filterVariant: "rosterDesignation",
        },
      },
      {
        accessorKey: "Nationality",
        header: "Nationality",
        enableColumnFilter: false,
        // meta: {
        //   filterVariant: "range",
        // },
      },
      // {
      //   accessorKey: "Domestic_or_International",
      //   header: "Domestic or International",
      //   enableColumnFilter: false,

      //   meta: {
      //     filterVariant: "range",
      //   },
      // },
      {
        accessorKey: "Minutes_Played",
        header: "Minutes Played",
        enableColumnFilter: false,
        // meta: {
        //   filterVariant: "range",
        // },
      },
    ],
    []
  );

  const [data, setData] = useState<Player[]>(() => playersJson);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    initialState: {
      sorting: [
        {
          id: "Minutes_Played",
          desc: true, // sort by name in descending order by default
        },
      ],
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div
      className="w-full h-full text-center min-w-0 px-1 text-sm"
      style={{
        overflow: "auto",
        // position: "relative",
        height: "100%",
      }}
    >
      <table className="w-full">
        <thead
          style={{
            position: "sticky",
            top: "0",
            zIndex: 1, // background: "white",
          }}
          className="bg-gray-100 h-20"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full border-b border-gray-100"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
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
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => {
                  console.log(row);
                  navigate(`/players/${row.original.Name.trim()}`);
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />

      {/* <pre>
        {JSON.stringify(
          { columnFilters: table.getState().columnFilters },
          null,
          2
        )}
      </pre> */}
    </div>
  );
};

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : filterVariant === "position" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="font-normal"
    >
      <option value={""}> All Positions</option>
      {positionAbrevs.map((p) => (
        <option value={abbrevsToPosition.get(p)}>{p}</option>
      ))}
      {/* See faceted column filters example for dynamic select options */}
      {/* <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option> */}
    </select>
  ) : filterVariant === "club" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="font-normal max-w-24"
    >
      <option value={""}> All Teams</option>
      {teamsJson
        .sort((a, b) => a.Team.localeCompare(b.Team))
        .map((team) => (
          <option value={team.Team} className="">
            {team.Team}
          </option>
        ))}
      {/* See faceted column filters example for dynamic select options */}
      {/* <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option> */}
    </select>
  ) : filterVariant === "rosterDesignation" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="font-normal"
    >
      <option value={""}> All</option>
      {positionAbrevs.map((p) => (
        <option value={abbrevsToPosition.get(p)}>{p}</option>
      ))}
      {/* See faceted column filters example for dynamic select options */}
      {/* <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option> */}
    </select>
  ) : (
    <DebouncedInput
      // className="w-36 border shadow rounded"
      className="border rounded-md text-sm font-normal text-black px-1 py-0.5"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
