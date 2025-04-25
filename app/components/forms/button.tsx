import React from "react";

export function ControlButton({clickHandler, color, children}: {
    clickHandler: () => void,
    color: string,
    children: React.ReactNode
}) {
    const colorVariants: { [key: string]: string } = {
        green: "border-green-600 text-green-600 hover:bg-green-600",
        red: "border-red-600 text-red-600 hover:bg-red-600",
    };

    return (
        <button type="button" onClick={clickHandler} className="w-auto h-auto">
            <div className="flex-1 h-full">
                <div className={`
                    flex items-center justify-center flex-1 h-full p-2.5 border hover:text-white rounded-lg
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
