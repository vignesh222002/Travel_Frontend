import axios from "axios";
import queryString from "query-string";

type FetchProps = {
    headers?: {};
    method: string;
    endPoint: string;
    params?: {};
    body?: {};
};

const fetch = async ({
    headers,
    method,
    endPoint,
    params,
    body
}: FetchProps) => {

    try {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL;

        let url = base_url + endPoint;

        if (params) {
            params = queryString.stringify(params)
        }

        const response = await axios({
            method,
            url,
            headers,
            params: { params },
            data: body
        })

        return response;
    }
    catch (error) {
        console.log("Error in Axios", error, {
            headers,
            method,
            endPoint,
            params,
            body
        })
    }
}

export default fetch;