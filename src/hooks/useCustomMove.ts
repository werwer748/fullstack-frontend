import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useState} from "react";

const useCustomMove = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    const [refresh, setRefresh] = useState(false);

    const page = queryParams.get('page') ?? '1';
    const size = queryParams.get('size') ?? '10';

    const queryDefault = createSearchParams({page, size}).toString();

    const moveToList = useCallback((pageParam?: { page: string, size: string }) => {
        let queryStr = "";

        if (pageParam) {
            queryStr = createSearchParams({ ...pageParam }).toString()
        } else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: '../list', search: queryStr });
    }, [navigate, queryDefault, refresh]);

    const moveToModify = useCallback((num: number) => {
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault,
        })
    }, [navigate, queryDefault]);

    const moveToRead = useCallback((num: number) => {
        navigate({
            pathname: `../read/${num}`,
            search: queryDefault,
        })
    }, [navigate, queryDefault]);

    return { moveToList, moveToModify, page, size, refresh, moveToRead };
};

export default useCustomMove;