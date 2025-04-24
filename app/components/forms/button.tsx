import React from "react";

export function ControlButton({clickHandler, color, children}: {
    clickHandler: () => void,
    color: string,
    children: React.ReactNode
}) {
    return (
        <button type="button" onClick={clickHandler} className="w-auto h-auto">
            <div className="flex-1 h-full">
                <div className={`
                    flex items-center justify-center flex-1 h-full p-2.5 border hover:text-white rounded-lg
                    border-${color}-600 text-${color}-600 hover:bg-${color}-600
                `}>
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </button>
    );
}
