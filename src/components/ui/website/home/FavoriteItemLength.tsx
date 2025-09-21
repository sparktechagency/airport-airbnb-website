import { myFetch } from "@/helpers/myFetch";

export const FavoriteItemLength = async () => {

    const res = await myFetch(`/favourite`, {
        method: "GET",
        cache: "no-store",
    });

    const data = res?.data?.result ?? [];
    return data.length;
};
