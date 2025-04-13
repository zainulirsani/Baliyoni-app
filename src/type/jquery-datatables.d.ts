import 'datatables.net';

declare global {
  interface DataTablesStaticFunctions {
    isDataTable: (table: any) => boolean;
  }
}

export {};
