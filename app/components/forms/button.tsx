import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function ControlButton({clickHandler, color, children}: {
    clickHandler: () => void,
    color: string,
    children: React.ReactNode
}) {
    const colorVariants: { [key: string]: string } = {
        green: "border-emerald-600 text-emerald-600 hover:bg-emerald-600",
        red: "border-rose-600 text-rose-600 hover:bg-rose-600",
    };

    return (
        <button type="button" onClick={clickHandler} className="w-auto h-auto">
            <div className="flex-1 h-full">
                <div className={`
                    flex items-center justify-center flex-1 h-full p-2.5 border hover:text-white rounded-[3px] cursor-pointer transition ease-out duration-100
                    ${colorVariants[color]}
                `}>
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </button>
    );
}

export function Button({ children, ...rest }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...rest}
            className='px-2.5 py-2 text-sky-50 bg-sky-500 rounded-[3px] hover:bg-sky-600 hover:text-white aria-disabled:cursor-not-allowed disabled:bg-sky-300 disabled:text-slate-500 justify-center'
            disabled={pending}
            aria-disabled={pending}
        >
            {children}
        </button>
    );
}
