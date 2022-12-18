import { testUrl } from "./url";
export const displayTestItems = () => {
    return location.host.includes("localhost") || location.origin === testUrl;
};

//TODO add testing endpoint