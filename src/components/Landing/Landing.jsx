import Listings from "../Listings/Listings";

const Landing = ({ listings }) => {
    return (
        <main>
            <h1>Hello, you are on the landing page for visitors.</h1>
            <h3>
                If you sign up for a new account, you will have the ability to sign in and see your
                super secret dashboard.
            </h3>
            <Listings listings={ listings } />
        </main>
    );
};

export default Landing;
