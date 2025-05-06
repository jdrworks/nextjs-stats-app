'use client';

import clsx from "clsx";
import React from "react";
import { FormState } from "@/app/lib/types";

export function FormInput({label, name, state}: {label: string, name: string, state: FormState}) {
    return (
        <>
            <label
                htmlFor={`${name}Id`}
                className={clsx(
                    "block text-md font-bold",
                    { "text-rose-500": state.errors?.name },
                    { "text-slate-300": !state.errors?.name }
                )}
            >
                {label}
            </label>
            <input
                id={`${name}Id`}
                name={name}
                className={clsx("block p-2 bg-slate-700 border text-slate-300 text-sm rounded-lg w-full",
                    "focus:border-sky-500 outline-0",
                    { "border-rose-500": state.errors?.name },
                    { "border-slate-600": !state.errors?.name },
                )}
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
