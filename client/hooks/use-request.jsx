import axios from "axios";
import { useState } from "react";


export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
        try {
            setErrors(null) // Reset errors before making the request
            const {data} = await axios[method](url, body)
            console.log("Response:", data)
            if (onSuccess) {
                onSuccess(data)
            }
            return data
        } catch (err) {
            setErrors(
                 <div className="alert alert-danger">
                <h4>Oooops....</h4>
                <ul className="my-0">
                    {
                         err.response.data.errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                         ))
                    }
                </ul>
            </div>
            )
        }
    }

    return {doRequest, errors}
}