export type Nullable<GenericType> = GenericType | null;

export type SelectOption<ValueType> = {
    label: string;
    value: ValueType;
};
