import React, { useState } from "react";
import "./VideoModal.css";

const VideoModal = ({ videos, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredVideos = videos?.filter((video) =>
    video.description.toLowerCase().includes(searchTerm)
  );

  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search Videos..."
          onChange={handleSearchChange}
          value={searchTerm}
          className="video-search-input"
        />
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-container">
              <h4>{video.description}</h4>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos match your search criteria.</p>
        )}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
