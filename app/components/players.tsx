import {Player} from "@/app/components/player";
import {getPlayers} from "@/app/lib/query";

export async function Players() {
    const players = await getPlayers();

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {players?.data.map((player: any) => (
                <Player key={player.id} id={player.id} name={player.name}></Player>
            ))}

        </div>
    );
}
