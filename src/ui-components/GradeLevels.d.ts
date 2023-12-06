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
export declare type GradeLevelsOverridesProps = {
    GradeLevels?: PrimitiveOverrideProps<FlexProps>;
    "Frame 406"?: PrimitiveOverrideProps<FlexProps>;
    "Please select a grade level to be quizzed on:"?: PrimitiveOverrideProps<TextProps>;
    "First Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Second Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Third Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Fourth Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Fifth Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Sixth Grade"?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 407"?: PrimitiveOverrideProps<FlexProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type GradeLevelsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: GradeLevelsOverridesProps | undefined | null;
}>;
export default function GradeLevels(props: GradeLevelsProps): React.ReactElement;
