// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../Images/Background.png';
// import logoImage from '../Images/MuscleMania.png'; // Make sure this path is correct

// import './startPage.css';

// const Home = () => {
//     const navigate = useNavigate();
//     return (
//         <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
//             <div className='header'>
//                 <nav>
//                     <div className="logo-container">
//                         <img src={logoImage} alt="MuscleMania Logo" />
//                     </div>
//                     <ul className="Menu">
//                         <li><button onClick={() => navigate('/')}>Home</button></li>
//                         <li><button onClick={() => navigate('/about')}>About Us</button></li>
//                         <li><button onClick={() => navigate('/Shop')}>Shop Now</button></li>
//                         <li><button onClick={() => navigate('/Contact')}>Contact</button></li>
//                         <li><button onClick={() => navigate('/login')}>Sign In</button></li>
//                         <li><button onClick={() => navigate('/register')}>Sign Up</button></li>
//                     </ul>
//                     <div className="open-daily">Open Daily: 8:00am - 5:00pm</div>
//                 </nav>
//             </div>
//             <div className="content">
//                 <h1>Welcome to MuscleMania</h1>
//                 <p>"Transform your body and mind with the best fitness guidance!"</p>
//                 <button onClick={() => navigate('/login')} className="get-started">Get Started Now</button>
//                 <button onClick={() => navigate('/contact')}>Read More</button>
//             </div>
//         </div>
//     );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import backgroundImage from '../Images/Background.png';
import logoImage from '../Images/MuscleMania.png';
import verifyImage from '../Images/verify.png';
import './startPage.css';

// Custom hook for typing effect
const useTypingEffect = (text, speed) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, index));
            index++;
            if (index > text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);

    return displayedText;
};

const Home = () => {
    const navigate = useNavigate();
    const welcomeText = useTypingEffect("Welcome to MuscleMania", 100);
    const descriptionText = useTypingEffect("Transform your body and mind with the best fitness guidance!", 50);

    return (
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <header className="header">
                <div className="logo-container">
                    <img src={logoImage} alt="MuscleMania Logo" className="logo" />
                </div>
                <nav>
                    <nav className="Menu">
                        <NavLink exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                        <NavLink exact to="/about" activeClassName="active">
                            About us
                        </NavLink>
                        <NavLink exact to="/Contact" activeClassName="active">
                            Contact
                        </NavLink>
                        <NavLink exact to="/login" activeClassName="active">
                            Sign In
                        </NavLink>
                        <NavLink exact to="/register" activeClassName="active">
                            Sign Up
                        </NavLink>
                    </nav>
                </nav>
                <div className="operation-times">
                    <img src={verifyImage} alt="verify" className="logo" />
                </div>
            </header>
            <div className="content">
                <h1>{welcomeText}</h1>
                <p>{descriptionText}</p>
                <button onClick={() => navigate('/login')} className="get-started">Get Started Now</button>
                <button onClick={() => navigate('/about')}>Read More</button>
            </div>
        </div>
    );
};

export default Home;
