import {useEffect, useReducer} from "react";
import speakersReducer from "./speakersReducer";
import axios from "axios";

function useSpeakerDataManager() {
    const [{
        isLoading, speakerList, favoriteClickCount, hasErrored, error,
        imageRerenderIdentifier
    }, dispatch] = useReducer(
        speakersReducer,
        {
            isLoading: true,
            speakerList: [],
            favoriteClickCount: 0,
            error: null,
            imageRerenderIdentifier: 0
        });

    function incrementFavoriteClickCount() {
        dispatch({type: 'incrementFavoriteClickCount'});
    }

    function forceImageRerender() {
        dispatch({type: 'forceImageRerender'});
    }

    function toggleSpeakerFavorite(speakerRec) {
        const updateData = async function () {
            axios.put(`api/speakers/${speakerRec.id}`, {...speakerRec, favorite: !speakerRec.favorite,});
            speakerRec.favorite === true ? dispatch({
                type: "unfavorite",
                id: speakerRec.id
            }) : dispatch({type: "favorite", id: speakerRec.id});
        };
        updateData();
    }

    useEffect(() => {
        let fetchData = async function () {
            try {
            let result = await axios.get('api/speakers');
            dispatch({type: 'setSpeakerList', data: result.data});
            } catch (e) {
                dispatch({type: 'errored', error: e});
            }
        };
        fetchData();

        return () => {
            console.log('cleanup');
        };
    }, []); // [speakingSunday, speakingSaturday]);
    return {
        isLoading,
        speakerList,
        favoriteClickCount,
        incrementFavoriteClickCount,
        toggleSpeakerFavorite,
        error,
        hasErrored,
        forceImageRerender,
        imageRerenderIdentifier,
    };
}

export default useSpeakerDataManager;