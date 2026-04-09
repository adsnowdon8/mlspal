import React from "react";

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
import { fetchPlayers, PlayerStat } from "./Players";
import { abbrevsToPosition, positionAbrevs } from "../constants";
import { teamsJson } from "../Teams";
import { useNavigate } from "react-router-dom";
import { TeamLogoViewer } from "./TeamLogoViewer";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const PlayerTable = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const navigate = useNavigate();

  const columns = React.useMemo<ColumnDef<PlayerStat, any>[]>(
    () => [
      {
        accessorKey: "shirt_number",
        header: "Shirt Number",
        cell: (info) => info.getValue() ?? "-",
        enableColumnFilter: false,
      },
      {
        id: "name", // Unique ID for combined column
        header: "Name",
        // Combine first and last name for display
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "position",
        header: "Position",
        meta: {
          filterVariant: "position",
        },
        cell: (info) => info.getValue() ?? "N/A",
      },
      {
        accessorKey: "team",
        header: "Club",
        meta: {
          filterVariant: "club",
        },
        cell: (info) => <TeamLogoViewer club={info.getValue()} />,
      },
      {
        accessorKey: "minutes",
        header: "Minutes Played",
        cell: (info) => info.getValue()?.toLocaleString() ?? "0",
        enableColumnFilter: false,
      },
      // {
      //   accessorKey: "Contract_End",
      //   header: () => "Contract End",
      //   enableColumnFilter: false,
      // },
      // {
      //   accessorKey: "Roster_Designation",
      //   header: "Roster Designation",
      //   enableColumnFilter: false,
      //   meta: {
      //     filterVariant: "rosterDesignation",
      //   },
      // },
      {
        accessorKey: "age",
        header: "Age",
        enableColumnFilter: false,
      },
      {
        accessorKey: "nationality",
        header: "Nationality",
        enableColumnFilter: false,
      },
    ],
    [],
  );

  const [data, setData] = React.useState<PlayerStat[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPlayers()
      .then((players) => {
        setData(players);
        setLoading(false);
        console.log(players);
      })
      .catch(() => setLoading(false));
  }, []);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    initialState: {
      sorting: [
        {
          id: "minutes",
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
    debugTable: false,
  });

  if (loading) return <div>Loading players...</div>;

  return (
    <div
      className="w-full h-full text-center min-w-0 text-sm"
      style={{
        overflow: "auto",
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
                            header.getContext(),
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
                  navigate(
                    `/players/${row.original.first_name.trim()} ${row.original.last_name.trim()}`,
                  );
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
        <option key={p} value={abbrevsToPosition.get(p)}>
          {p}
        </option>
      ))}
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
          <option key={team.Team} value={team.Team}>
            {team.Team}
          </option>
        ))}
    </select>
  ) : filterVariant === "rosterDesignation" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="font-normal"
    >
      <option value={""}> All</option>
      {positionAbrevs.map((p) => (
        <option key={p} value={abbrevsToPosition.get(p)}>
          {p}
        </option>
      ))}
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
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
