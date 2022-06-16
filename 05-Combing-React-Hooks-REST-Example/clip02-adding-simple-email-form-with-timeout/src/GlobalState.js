import React from "react";
import useSpeakerDataManager from "./hooks/useSpeakerDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

        const {
            isLoading,
            speakerList,
            toggleSpeakerFavorite,
            favoriteClickCount,
            incrementFavoriteClickCount,
        } = useSpeakerDataManager();

        const provider = {
            isLoading,
            speakerList,
            toggleSpeakerFavorite,
            favoriteClickCount,
            incrementFavoriteClickCount,
        };

        return <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>;
    };