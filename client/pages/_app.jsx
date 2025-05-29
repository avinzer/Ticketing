import "bootstrap/dist/css/bootstrap.css"
import App from "next/app"
import { requestInitial } from "../api/build-client"
import { useEffect, useState } from "react"
import Header from "../components/header"






const AppComponent = ({ Component, pageProps }) => {
    const [currentUser, setCurrentUser] = useState(null);
    console.log("pageProps: ",pageProps)
    useEffect(() => {

        const fetchCurrentUser = async () => {
            const client = requestInitial()
            const {data} = await client.get("/api/users/currentuser")
            setCurrentUser(data.currentUser);
        }
        fetchCurrentUser();
    }, []);
    console.log("Current User:", currentUser)
    return (
        <div className="container">
            <Header currentUser={currentUser} />
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    )
}

// AppComponent.getInitialProps = async (appContext) => {
  
//         const ctx = await App.getInitialProps(appContext)
//         const client = requestInitial(ctx)
//         const data = await client.get("/api/users/currentuser")

//         console.log("Current User:", data)
//         return {
//             pageProps: ctx.pageProps,
//             ...data
//         }

    
// }


export default AppComponent