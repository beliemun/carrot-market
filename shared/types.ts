import { Product, Record } from "@prisma/client";

export interface ResponseType {
  ok: boolean;
  error?: string;
  [key: string]: any;
}

export interface ProductWithCount extends Product {
  _count: {
    records: number;
  };
}

export interface RecordWithProduct extends Record {
  product: ProductWithCount;
}

export interface RecordResult extends ResponseType {
  records: RecordWithProduct[];
}
