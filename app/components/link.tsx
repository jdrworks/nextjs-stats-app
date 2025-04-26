import NextLink from "next/link";

export default function Link({ href, children }: Readonly<{href: string, children: React.ReactNode}>) {
    return (
        <NextLink href={href} className="text-emerald-600 hover:underline">
            {children}
        </NextLink>
    );
}
