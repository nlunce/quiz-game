/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type APIKeyFormOverridesProps = {
    APIKeyForm?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Welcome!"?: PrimitiveOverrideProps<TextProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    "Frame 437"?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    Submit?: PrimitiveOverrideProps<ButtonProps>;
    Play?: PrimitiveOverrideProps<ButtonProps>;
    Download?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type APIKeyFormProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: APIKeyFormOverridesProps | undefined | null;
}>;
export default function APIKeyForm(props: APIKeyFormProps): React.ReactElement;
