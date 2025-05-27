'use client';

import React, {ChangeEvent, useActionState, useState } from 'react';
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { createGame, updateGame } from "@/app/lib/actions/game";
import { Button, ControlButton } from "@/app/components/forms/button";
import { z } from "zod";
import Select from "react-select";
import { FormState, GroupType, OptionType } from "@/app/lib/types";
import { FormInput } from "@/app/components/forms/form-input";

export interface GameFormRow {
    [k: string]: number;
    deckId: number;
    id: number
    playerId: number;
    position: number;
}

export function GameForm({playerOptions, deckOptions, gameId, gameFormRows}: {
    playerOptions: OptionType[],
    deckOptions: GroupType[],
    gameId?: number,
    gameFormRows?: GameFormRow[],
}) {
    const action = gameId ? updateGame : createGame;
    const initialState: FormState = { message: null, errors: {}, status: 'default' };
    const [formState, dispatch] = useActionState(action, initialState);
    const [inputFields, setInputFields] = useState<GameFormRow[]>(gameFormRows ? gameFormRows : [
        { deckId: 0, id: 0, playerId: 0, position: 0 }
    ])

    const handleFormChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const data: GameFormRow[] = [...inputFields];
        data[index][event.target.name] = z.coerce.number().parse(event.target.value);
        setInputFields(data);
    }

    const addFields = () => {
        const newfield: GameFormRow = { deckId: 0, id: 0, playerId: 0,position: 0 };

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index: number) => {
        const data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <form action={dispatch}>
            <input type="hidden" name="gameId" value={gameId}/>
            <div className="flex justify-end">
                <ControlButton color="green" clickHandler={addFields}>
                    <PlusIcon className="size-4 stroke-current stroke-3"/>
                </ControlButton>
            </div>
            <div>
                {inputFields.map((input, index) => {
                    const playerIndex = playerOptions.map(e => e.value).indexOf(input.playerId);
                    let deckGroupIndex = -1;
                    let deckOptionIndex = -1;
                    deckOptions.map((group, deckIndex) => {
                        group.options.map((option, optionIndex) => {
                            if (option.value === input.deckId) {
                                deckGroupIndex = deckIndex;
                                deckOptionIndex = optionIndex;
                            }
                        })
                    });
                    return (
                        <div key={index} className="flex gap-4 mb-4 md:mb-0">
                            <div className="flex-grow flex flex-wrap md:flex-nowrap gap-4">
                                <input type="hidden" name="id" value={input.id} />
                                <div className="basis-full md:basis-4/12">
                                    <label className="block text-md font-bold text-slate-300">Player</label>
                                    <Select
                                        instanceId={`player-select-${index}`}
                                        defaultValue={playerOptions[playerIndex]}
                                        options={playerOptions}
                                        isClearable={true}
                                        name="playerId"
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 3,
                                            colors: {
                                                ...theme.colors,
                                                primary: 'var(--color-sky-500)',
                                                primary75: 'var(--color-sky-300)',
                                                primary50: 'var(--color-sky-200)',
                                                primary25: 'var(--color-slate-600)',
                                                danger: 'var(--color-red-500)',
                                                dangerLight: 'var(--color-red-200)',
                                                neutral0: 'var(--color-slate-700)',
                                                neutral10: 'var(--color-slate-100)',
                                                neutral20: 'var(--color-slate-500)',
                                                neutral30: 'var(--color-slate-400)',
                                                neutral40: 'var(--color-slate-400)',
                                                neutral50: 'var(--color-slate-500)',
                                                neutral60: 'var(--color-slate-400)',
                                                neutral80: 'var(--color-slate-300)',
                                            }
                                        })}
                                    />
                                </div>
                                <div className="basis-full md:basis-4/12">
                                    <label className="block text-md font-bold text-slate-300">Deck</label>
                                    <Select
                                        instanceId={`deck-select-${index}`}
                                        defaultValue={deckOptions[deckGroupIndex]?.options[deckOptionIndex]}
                                        options={deckOptions}
                                        isClearable={true}
                                        name="deckId"
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 3,
                                            colors: {
                                                ...theme.colors,
                                                primary: 'var(--color-sky-500)',
                                                primary75: 'var(--color-sky-300)',
                                                primary50: 'var(--color-sky-200)',
                                                primary25: 'var(--color-slate-600)',
                                                danger: 'var(--color-red-500)',
                                                dangerLight: 'var(--color-red-200)',
                                                neutral0: 'var(--color-slate-700)',
                                                neutral10: 'var(--color-slate-100)',
                                                neutral20: 'var(--color-slate-500)',
                                                neutral30: 'var(--color-slate-400)',
                                                neutral40: 'var(--color-slate-400)',
                                                neutral50: 'var(--color-slate-500)',
                                                neutral60: 'var(--color-slate-400)',
                                                neutral80: 'var(--color-slate-300)',
                                            }
                                        })}
                                    />
                                </div>
                                <div className="basis-full md:basis-4/12">
                                    <FormInput
                                        name="position"
                                        label="Position"
                                        index={index}
                                        onChange={handleFormChange}
                                        value={input.position}
                                        state={initialState}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex-none content-center">
                                <label className="block invisible">s</label>
                                <ControlButton color="red" clickHandler={() => removeFields(index)}>
                                    <XMarkIcon className="size-4 stroke-current stroke-3"/>
                                </ControlButton>
                            </div>
                            <div aria-live="polite" aria-atomic="true">
                                {formState.errors?.playerId &&
                                    formState.errors.playerId.map((error: string) => (
                                        <p className="text-sm text-rose-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                                {formState.errors?.deckId &&
                                    formState.errors.deckId.map((error: string) => (
                                        <p className="text-sm text-rose-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    )
                })}

                <div className="flex-grow flex justify-end mt-5">
                    <Button type="submit">{gameId ? 'Update Game' : 'Add Game'}</Button>
                </div>

            </div>
        </form>
    );
}
