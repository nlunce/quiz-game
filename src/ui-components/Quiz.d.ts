/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type QuizOverridesProps = {
    Quiz?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    Question?: PrimitiveOverrideProps<TextProps>;
    "Option 1"?: PrimitiveOverrideProps<ButtonProps>;
    "Option 2"?: PrimitiveOverrideProps<ButtonProps>;
    "Option 3"?: PrimitiveOverrideProps<ButtonProps>;
    "Option 4"?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type QuizProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: QuizOverridesProps | undefined | null;
}>;
export default function Quiz(props: QuizProps): React.ReactElement;
