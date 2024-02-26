import React, { useState } from "react";
import './profile.css'; // Import the CSS file

const Profile = () => {
    const [name, setName] = useState("Giridhar Sai Girugu");
    const [description, setDescription] = useState("Welcome to the world of a Software Developer! I am currently pursuing my master's degree at the University at Albany, where I am honing my skills and knowledge in the field of software development. I am deeply passionate about the potential of technology to drive innovation and solve real-world problems. As I embark on this journey, I am filled with excitement and anticipation for what the future holds. With a solid foundation in computer science and a commitment to lifelong learning, I am eager to contribute to the ever-evolving landscape of technology and make a meaningful impact in the world.");
    const [editMode, setEditMode] = useState(false);

    // Assume profilePic is located in the public folder, update the path if needed
    const profilePic = process.env.PUBLIC_URL + '/th.jpg';

    return (
        <div className="container mt-5">
            <div className="profile-background">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                        <div className="profile-pic-container">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="profile-pic img-fluid"
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h2 className="profile-name mb-2">{name}</h2>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <textarea
                                    className="form-control mb-2 description-textarea" // Added description-textarea class
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6} // Adjust the number of rows as needed
                                />
                                <button
                                    className="btn btn-custom"
                                    onClick={() => setEditMode(false)}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="profile-description">{description}</p>
                                <button
                                    className="btn btn-custom"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
