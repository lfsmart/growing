namespace Article {
  export type ModalEditRef = {
    show: ( data: RowItem ) => void;
  }
  export type RowItem = {
    id: string;
    title: string;
    desc?: string;
    image?: string;
    content?: string;
  }
  export type Query = {
    pageIndex: number;
    pageSize: number;
    title: string;
  }
}


