import { useEffect } from "react"
import useRequest from "../../hooks/use-request"
import Render from "next/router"

export default () => {
    const {doRequest, errors} = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Render.push("/auth/signin")
    })
    useEffect(() => {
        doRequest()
    },[])
    return <h1>Signing you out...</h1>;
}