import type { Metadata } from "next";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import React from "react";
import { SignInForm } from "@/app/components/forms/signin";

export const metadata: Metadata = {
    title: "Sign In",
};

export default async function SignIn() {
    return (
        <Header text={`Sign In`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <SignInForm />
                </Card>
            </div>
        </Header>
    );
}
