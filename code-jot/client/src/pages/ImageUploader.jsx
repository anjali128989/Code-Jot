import React, { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({ id: Date.now() + Math.random(), src: e.target.result });
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDelete = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handlePin = (id) => {
    setImages((prevImages) => {
      const imageToPin = prevImages.find((image) => image.id === id);
      const remainingImages = prevImages.filter((image) => image.id !== id);
      return [imageToPin, ...remainingImages]; // Move pinned image to the top
    });
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "350px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Upload and Preview Image</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{
          marginTop: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
        }}
      />
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src={image.src}
              alt="Preview"
              style={{
                maxWidth: "100px",
                height: "auto",
                borderRadius: "8px",
                display: "block",
              }}
            />
            <button
              onClick={() => handleDelete(image.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                cursor: "pointer",
                color: "white",
                background: "black",
              }}
            >
              ×
            </button>
            <button
              onClick={() => handlePin(image.id)}
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                cursor: "pointer",
                color: "white",
                background: "black",
              }}
            >
              📌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
