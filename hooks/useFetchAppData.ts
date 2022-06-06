import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { PageStatus } from "../models/types";
import { fetchAppData } from "../store/actions/countriesAction";

type UseFetchAppData = () => {
    status: PageStatus;
    refetch: () => void;
};
const useFetchAppData: UseFetchAppData = () => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState<PageStatus>("loading");
    const [isFetched, setIsFetched] = useState(false);

    const refetch = () => {
        setIsFetched(false);
        setStatus("loading");
    };

    const getData = async () => {
        setIsFetched(true);
        try {
            await dispatch(fetchAppData());
            setStatus("success");
        } catch (err) {
            setStatus("error");
            throw err;
        }
    };

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getData();
        }

        return () => {
            mounted = false;
        };
    }, [isFetched]);

    return {
        status,
        refetch,
    };
};

export default useFetchAppData;
