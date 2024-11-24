import { ReactNode } from "react";

export type PainelContextProviderProps = {
    children: ReactNode;
};

export type TPainelStatus = "init" | "loading" | "available" | "done";

export type TPainelProduct = {
    _id: string;
    name: string;
    price: number;
    qtd: number;
    max_qtd: number;
    image: string;
    tax: number;
};

export type TPainelItens = {
    product: string;
    product_info: TPainelProduct;
    qtd: number;
    amount: number;
    tax: number;
    discount: number;
    seller: any;
};

export type TPainelPerson = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    reference: string;
    sponsor: string;
    sponsor_reward: string;
};

export type TPainelPayments = {
    type: string;
    status: "pending" | "approver" | "rejected";
    amount: number;
    percent: number;
    wallet_paid: string;
    paid_out: boolean;
    extra: any;
    current_amount: number;
    checked: boolean;
};

export type TPainel = {
    _id: object;
    from: string | null;
    from_info: TPainelPerson | null;
    to: string | null;
    to_info: TPainelPerson | null;
    items: TPainelItens[];
    status: "EMPTY" | "INPAINEL" | "PENDING_PAYMENT_UPS" | "PENDING_PAYMENT_TAX" | "PENDING_APPROVE" | "APPROVE" | "CANCEL" | "REVERSAL";
    payments: TPainelPayments[];
    total: number,
    qtd: number,
    tax: number,
    order: TOrder
};

export type TOrder = {
    _id: string | null
}