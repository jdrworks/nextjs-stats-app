'use client';

import clsx from "clsx";
import React, { ChangeEvent } from "react";
import { FormState } from "@/app/lib/types";

export function FormInput({label, name, value, state, type = "text", onChange, index}: {
    label: string,
    name: string,
    value?: string | number,
    state: FormState,
    type?: string,
    onChange?: (index: number, event: ChangeEvent<HTMLInputElement>) => void,
    index: number,
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(index, event);
        }
    };

    return (
        <>
            <label
                htmlFor={`${name}Id`}
                className={clsx("block text-md font-bold",
                    { "text-rose-500": state.errors?.name },
                    { "text-slate-300": !state.errors?.name }
                )}
            >
                {label}
            </label>
            <input
                type={type}
                id={`${name}Id`}
                name={name}
                className={clsx("bg-slate-700 border text-sm rounded-[3px] text-slate-300",
                    "hover:border-slate-400 block w-full p-2  outline-none transition ease-out duration-100",
                    "focus:border-sky-500 focus:hover:border-sky-500 focus:ring ring-sky-500",
                    { "border-rose-500": state.errors?.name },
                    { "border-slate-500": !state.errors?.name },
                )}
                value={value}
                onChange={handleChange}
            />
            <div aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                        <p className="text-sm text-rose-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </>
    );
}
