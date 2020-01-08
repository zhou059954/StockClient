import { ConfirmSettings } from "@jaspero/ng2-confirmations/src/interfaces/confirm-settings";

export interface ConfirmEmit {
    close?: boolean;
    message?: string;
    title?: string;
    resolve$?: any;
    override?: ConfirmSettings;
}