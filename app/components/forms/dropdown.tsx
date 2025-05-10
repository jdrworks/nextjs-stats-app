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
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(index, event);
    };

    const inputRef = useRef(null);
    const listRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();
    }

    const handleDrop = () => {
        listRef.current.classList.toggle("hidden");
    }

    const onSelect = (value) => {
        inputRef.current.value = value;
    }

    return (
        <div className="relative">
            <label id="listbox-label" className="block text-md font-bold text-slate-300">{config.label}</label>
            <select
                name={config.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={value}
                onChange={handleChange}
            >
                {config.defaultOption && (
                    <option
                        value={config.defaultOption.value}>
                        {config.defaultOption.text}
                    </option>
                )}
                {config.optionGroups?.map((group) => (
                    <optgroup key={group.text} label={group.text}>
                        {group.options.map((option) => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                    </optgroup>
                ))}
                {config.options?.map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
            </select>
            <div className="transition ease-out duration-250 bg-slate-700 border border-slate-500 hover:border-slate-400 text-slate-300 text-sm rounded-sm w-full
            focus-within:border-sky-500 focus-within:hover:border-sky-500 focus-within:ring ring-sky-500 flex items-center" onClick={handleFocus}>
                <input className="p-2 outline-0 w-full peer" ref={inputRef} onClick={handleDrop} />
                <XMarkIcon className="transition ease-out duration-250 size-6 mx-2 stroke-2 stroke-slate-500 hover:stroke-slate-400 peer-focus:stroke-slate-300 peer-focus:hover:stroke-slate-200" />
                <div className="border-x border-slate-500 w-[1px] self-stretch my-2"></div>
                <ChevronDownIcon className="transition ease-out duration-250 size-6 mx-2 stroke-2 stroke-slate-500 hover:stroke-slate-400 peer-focus:stroke-slate-300 peer-focus:hover:stroke-slate-200" onClick={handleDrop} />
            </div>
            <ul className="bg-slate-700 border border-slate-500 rounded-sm mt-2 absolute overflow-y-scroll max-h-64 left-0 right-0 hidden" ref={listRef}>
                {config.options?.map((option) => (
                    <li key={option.value} className="w-full px-3 py-2 hover:bg-slate-600" onClick={(e) => {onSelect(option.text)}}>{option.text}</li>
                ))}
            </ul>
        </div>
    )
}
