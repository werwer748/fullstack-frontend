import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback} from "react";

const useCustomMove = () => {
    const navigate = useNavigate();

    const [queryParams] = useSearchParams();

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

            navigate({ pathname: '../list', search: queryStr })
    }, [navigate, queryDefault]);

    return { moveToList };
};

export default useCustomMove;