'use client';

import { ChangeEvent, useRef } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

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

export default function Dropdown({config, index, value, onChange}: {
    config: dropdownConfig,
    index: number,
    value?: number | string,
    onChange: (index: number, event: ChangeEvent<HTMLSelectElement>) => void
}) {




    return (
        <div className="relative">
           
        </div>
    )
}
