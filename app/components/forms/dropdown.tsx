'use client';

export interface dropdownOption {
    value: string | number;
    text: string;
}

export interface dropdownOptionGroup {
    text: string;
    options: dropdownOption[];
}

export interface dropdownConfig {
    label: string;
    name: string;
    options?: {
        value: string,
        label: string,
    }[];
    optionGroups?: dropdownOptionGroup[];
    defaultOption?: dropdownOption;
    value?: string | number;
}

export default function Dropdown() {




    return (
        <div className="relative">
           
        </div>
    )
}
