'use client';

import React, { useActionState } from "react";
import { FormState } from "@/app/lib/types";
import { createPlayer } from "@/app/lib/actions";
import { Button } from "@/app/components/forms/button";
import { FormInput } from "@/app/components/forms/form-input";

export function PlayerForm() {
    const initialState: FormState = { message: null, errors: {}, status: 'default' };
    const [state, dispatch] = useActionState(createPlayer, initialState);

    return (
        <form action={dispatch}>
            <FormInput label="Player Name" name="name" state={state} />
            <Button
                type="submit"
            >
                Add Player
            </Button>
        </form>
    );
}
