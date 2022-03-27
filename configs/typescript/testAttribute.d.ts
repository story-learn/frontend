import "react";

declare module "react" {
    export interface HTMLAttributes<T> {
        "data-cy"?: string;
    }
}
