import 'datatables.net';

declare global {
  interface JQuery {
    DataTable: (options?: any) => any;
  }

  interface JQueryStatic {
    fn: {
      dataTable: any; // ini penting kalau kamu pakai $.fn.dataTable
      isDataTable: (table: any) => boolean;
    };
  }
}

export {};
