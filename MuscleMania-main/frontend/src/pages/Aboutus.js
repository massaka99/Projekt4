import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityImage from '../Images/community.png';
import MuscleMania from '../Images/MuscleMania.png';
import Aboutus from '../Images/trainer.png';

import './Aboutus.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <button className="BackButton" onClick={() => navigate("/")}> Back </button>
            <div className="content-wrapper">
                <div className="image-container left">
                    <img src={CommunityImage} alt="Community" className="community-image" />
                </div>
                <div className="text-section">
                    <img src={MuscleMania} alt="MuscleMania Logo" className="musclemania-logo" />
                    <div className="text-container">
                        <h2>About Us</h2>
                        <p>Welcome to MuscleMania! </p>
                        <p>We are not just a gym, but a community committed to transforming lives through fitness. Our mission is to inspire and empower individuals of all fitness levels, from beginners taking their first steps towards a healthier lifestyle, to seasoned athletes striving for peak performance.</p>
                        <p>At MuscleMania, we understand that every journey is unique, and we're here to support you every step of the way. Whether you're looking to build strength, improve endurance, or simply enhance your overall well-being, our team of dedicated trainers and nutritionists are here to guide and motivate you.</p>
                        <p>From personalized workout plans to tailored nutrition advice, we provide comprehensive support to help you reach your goals. Our state-of-the-art facilities offer a wide range of equipment and classes, ensuring that there's something for everyone.</p>
                        <p>Join us at MuscleMania and embark on a transformative journey towards a healthier, happier you. No matter where you are on your fitness journey, we're here to help you unleash your full potential and achieve greatness.</p>
                    </div>
                </div>
                <div className="image-container right">
                    <img src={Aboutus} alt="About Us" className="aboutus-image" />
                </div>
            </div>
        </div>
    );
};

export default About;
