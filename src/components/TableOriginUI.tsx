"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { BriefcaseMedical } from "lucide-react";
import { toast } from "react-toastify";

import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
  WalletIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "./Modal";
import ModalDig from "./ModalDig";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { Filters } from "./FilterInput";
import { AppDispatch, RootState } from "@/lib/store/Slices/Store";
import {
  addDiagnosis,
  addPatient,
  updatePatient,
} from "@/lib/store/Slices/MedicalSlicer";
import { removePatient } from "@/lib/store/Slices/MedicalSlicer";
import EditPatientModal from "./EditPatientModal";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import CalenderENInput from "./CalenderENInput";
import { DNA } from "react-loader-spinner";

// import { Row } from "react-aria-components";
type Item = {
  id?: string; // your patient id in doctor list
  name: string;
  phone: string;
  country?: string;
  gender?: string;
  profession?: string;
  age?: number;
  dateOfAdmission?: string;
};

function toDate(d?: string | Date | null) {
  if (!d) return null;
  if (d instanceof Date) return d;
  const parsed = parseISO(d);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.phone}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 20,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",

    cell: ({ row }) => (
      <div className="font-medium cursor-pointer">
        <Link href={`/patients/${row.original.phone}`}>
          {row.getValue("name")}
        </Link>
      </div>
    ),

    size: 170,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Age",
    accessorKey: "age",

    cell: ({ row }) => <div className="font-medium">{row.getValue("age")}</div>,
    size: 50,

    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Date Of Admission ",
    accessorKey: "dateOfAdmission",
    size: 170,
    cell: ({ row }) => {
      const d = toDate(row.original.dateOfAdmission);
      return <span>{d ? d.toLocaleDateString("en-GB") : "—"}</span>;
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => (
      <div>
        <span className="text-lg leading-none"></span> {row.getValue("phone")}
      </div>
    ),
    size: 170,
  },
  {
    header: "Country",
    accessorKey: "country",

    size: 80,
    // filterFn: statusFilterFn,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("gender") === "female" &&
            "bg-red-400 text-primary-foreground"
        )}
      >
        {String(row.getValue("gender"))[0].toUpperCase()}
        {String(row.getValue("gender")).slice(1)}
      </Badge>
    ),
  },
  {
    header: "Profession",
    accessorKey: "profession",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

type Props = {
  dateRange?: DateRange;
  filters: Filters;
};
export default function TableOriginUI({ filters }: Props) {
  const id = useId();
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { current } = useSelector((s: RootState) => s.doctor);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  console.log(current);

  const code: string =
    typeof window !== "undefined"
      ? (() => {
          const raw = localStorage.getItem("auth");
          if (!raw) return null;
          try {
            const parsed = JSON.parse(raw);
            // works whether you saved a string or an object { code: "..." }
            return typeof parsed === "string" ? parsed : parsed?.code ?? null;
          } catch {
            // if you stored plain string without JSON.stringify
            return raw;
          }
        })()
      : null;

  const dispatch = useDispatch<AppDispatch>();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      if (!code) return;

      setLoading(true); // <- set loading before fetch
      try {
        const res = await fetch(
          `https://fast-api-dnk5.vercel.app/doctors/${code}/patients`
        );
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [current, code]);

  const handleDeleteRows = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    );
    // const phone = data.filter((item) => !selectedRows.some((row) => row.original.id === item.id));
    setData(updatedData);
    try {
      for (const row of selectedRows) {
        await dispatch(
          removePatient({ doctorCode: code, patientPhone: row.original.phone })
        ).unwrap();
        console.log(row.original.phone);
      }
    } catch (error) {
      toast.error("failed to delete patient");
    }

    table.resetRowSelection();
  };

  const filteredData = useMemo(() => {
    // start from raw data
    let rows = data;

    // apply date range if provided
    if (dateRange?.from || dateRange?.to) {
      const start = dateRange?.from ? startOfDay(dateRange.from) : new Date(0);
      const end = dateRange?.to
        ? endOfDay(dateRange.to)
        : endOfDay(new Date(8640000000000000));

      rows = rows.filter((row) => {
        const d = toDate(row.dateOfAdmission);
        return d ? isWithinInterval(d, { start, end }) : false;
      });
    }

    return rows;
  }, [data, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer ps-9 min-w-80",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Filter by name or email..."
              type="text"
              aria-label="Filter by name or email"
            />
            <div className="absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 ps-3 text-muted-foreground/80 pointer-events-none start-0">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="focus:z-10 absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border-ring rounded-e-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-9 h-full text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none end-0"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filter by status */}
          <Popover modal={false}>
            <PopoverTrigger asChild></PopoverTrigger>
            <PopoverContent
              className="p-3 w-auto min-w-36"
              align="start"
            ></PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu
            open={viewOpen}
            onOpenChange={setViewOpen}
            modal={false}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-background hover:bg-blue-600 hover:text-white transition-colors duration-250"
              >
                <Columns3Icon
                  className="opacity-60 -ms-1"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              onFocusOutside={() => setViewOpen(false)}
              // close on any pointer down outside (mouse/touch)
              onPointerDownOutside={() => setViewOpen(false)}
              // optional: also close on ESC
              onEscapeKeyDown={() => setViewOpen(false)}
              // optional: close on hover-out (use a tiny delay to avoid flicker)
              onMouseLeave={(event) => {
                const t = setTimeout(() => setViewOpen(false), 100);
                // cancel if they come back quickly
                const cancel = () => clearTimeout(t);

                const target = event.currentTarget as HTMLElement;
                target.addEventListener("mouseenter", cancel, { once: true });
              }}
            >
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CalenderENInput value={dateRange} onChange={setDateRange} />
        </div>

        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="mr-3 ml-auto" variant="destructive">
                  <TrashIcon
                    className="opacity-60 -ms-1"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="inline-flex items-center bg-background -me-1 px-1 border rounded h-5 max-h-full font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex sm:flex-row flex-col max-sm:items-center gap-2 sm:gap-4">
                  <div
                    className="flex justify-center items-center border rounded-full size-9 shrink-0"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Add user button */}

          <Modal name="Add Patient" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-background border rounded-md overflow-hidden">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11 text-center align-middle"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex w-full h-full  items-center justify-center gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="opacity-60 shrink-0"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="opacity-60 shrink-0"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <DNA
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                      />
                    </div>
                  ) : (
                    "No Patients."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.stopPropagation()}
              avoidCollisions={false}
              className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2"
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="flex justify-end text-muted-foreground text-sm whitespace-nowrap grow">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,

                  0
                ),
                table.getRowCount()
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

function RowActions({ row }: { row: Row<Item> }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<DiagnosisEntry>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const doctor = useSelector((state: RootState) => state.doctor.current);

  const code: string =
    typeof window !== "undefined"
      ? (() => {
          const raw = localStorage.getItem("auth");
          if (!raw) return null;
          try {
            const parsed = JSON.parse(raw);
            // works whether you saved a string or an object { code: "..." }
            return typeof parsed === "string" ? parsed : parsed?.code ?? null;
          } catch {
            // if you stored plain string without JSON.stringify
            return raw;
          }
        })()
      : null;

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleSave = async (updatedData: DoctorPatient) => {
    try {
      // Update the patient data in your backend
      const result = await dispatch(
        updatePatient({
          doctorCode: code,
          patientPhone: row.original.phone,
          updatedData,
        })
      ).unwrap();

      setIsEditModalOpen(false);
      // toast.success("Patient updated successfully!", {
      //   position: "top-center",
      // });
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };

  const handleDiagnosis = async (data: DiagnosisEntry) => {
    try {
      const entry: DiagnosisEntry = {
        diagnosis: data.diagnosis,
        "medical-treatment": data["medical-treatment"],
        "medical-report": data["medical-report"],
        prognosis: data.prognosis,
        complaint: data.complaint, // rename to complaint
        schedule: new Date(data.schedule).toISOString(), // ensure ISO format
      };

      await dispatch(
        addDiagnosis({
          doctorCode: code,
          patientPhone: row.original.phone,
          entry,
        })
      ).unwrap();

      setOpenDialog(false);
      toast.success("Diagnosis added successfully!");
      reset();
    } catch (error) {
      console.error("failed to add diagnosis", error);
      toast.error("Failed to add diagnosis. Please check your input.");
    }
  };

  const handleDeleteSingleRow = async () => {
    try {
      await dispatch(
        removePatient({ doctorCode: code, patientPhone: row.original.phone })
      ).unwrap();
      console.log("delete patient");
    } catch (error) {
      toast.error("failed to delete patient");
    }
    console.log(row);
  };
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none"
              aria-label="Edit item"
            >
              <EllipsisIcon size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={handleEdit}
              className="focus:bg-blue-600 focus:text-white"
            >
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-violet-700 focus:text-white"
              onSelect={() => setOpenDialog(true)}
            >
              Add Diagnostic
            </DropdownMenuItem>

            <DropdownMenuItem className="focus:bg-amber-950 focus:text-white">
              <Link href={`/patients/${row.original.phone}`}>Show Details</Link>
            </DropdownMenuItem>
            <AlertDialog
              open={openConfirmDelete}
              onOpenChange={setOpenConfirmDelete}
            >
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="focus:bg-red-600 focus:text-white"
                  // Prevent DropdownMenu from hijacking the click so the dialog opens reliably
                  onSelect={(e) => {
                    e.preventDefault();
                    setOpenConfirmDelete(true);
                  }}
                >
                  <span>Delete Patient</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <div className="flex sm:flex-row flex-col max-sm:items-center gap-2 sm:gap-4">
                  <div
                    className="flex justify-center items-center border rounded-full size-9 shrink-0"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this patient?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove{" "}
                      <strong>{row.original.name}</strong> ({row.original.phone}
                      ) from your patients list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      // call your existing delete function for this row
                      handleDeleteSingleRow();
                      setOpenConfirmDelete(false);
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Diagnostic Modal */}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-[625px] lg:max-w-[700px]">
          <div className="flex flex-col justify-center items-center gap-2">
            <div
              className="flex justify-center items-center border rounded-full size-11 shrink-0"
              aria-hidden="true"
            >
              <BriefcaseMedical className="opacity-80" size={20} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center">Add Diagnostic</DialogTitle>
              <DialogDescription className="text-center">
                Enter the diagnostic information for this patient.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit(handleDiagnosis)} className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label>Diagnosis</Label>
                <Input {...register("diagnosis")} type="text" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label>Medical Treatment</Label>

                <Input
                  {...register("medical-treatment")}
                  type="text"
                  required
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label>Medical Report</Label>

                <Input {...register("medical-report")} type="text" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label>Prognosis</Label>

                <Input {...register("prognosis")} type="text" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label>Complaint</Label>

                <Input {...register("complaint")} type="text" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label>Schedule</Label>

                <Input {...register("schedule")} type="datetime-local" required />
              </div>
            </div>
            <Button type="submit" className="rounded-2xl w-full">
              Save Diagnostic
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patientData={row.original}
        onSave={handleSave}
      />
    </>
  );
}
