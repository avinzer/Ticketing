import buildClient from "../api/build-client"

const LandingPage = ({ currentUser }) => {
    return currentUser ? (
        <div>
            <h1>You are signed in</h1>
        </div>
    ) : (
        <div>
            <h1>You are not signed in</h1> 
        </div>
    )
    // return (
    //     <div>
    //         <h1>Landing page....</h1>
    //     </div>
    // )
}




export default LandingPage