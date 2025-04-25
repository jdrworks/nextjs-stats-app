import { ChangeEvent } from "react";

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
    options?: dropdownOption[];
    optionGroups?: dropdownOptionGroup[];
    defaultOption?: dropdownOption;
    value?: string | number;
}

export default function Dropdown({config, index, value, onChange}: { config: dropdownConfig, index: number, value?: number | string, onChange: (index: number, event: ChangeEvent<HTMLSelectElement>) => void}) {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(index, event);
    };

    return (
        <div>
            <label id="listbox-label" className="block text-md font-bold text-gray-900">{config.label}</label>
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
        </div>
    )
}
