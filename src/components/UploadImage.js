import React from "react";
import "./css/UploadImage.css";
import { Card } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

class ImageUploader extends React.Component {
  handleSelectImage = () => {
    this.inputFile.click();
  };

  handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        const allImg = this.imgArea.querySelectorAll("img");
        allImg.forEach((item) => item.remove());
        const imgUrl = reader.result;
        const img = document.createElement("img");
        img.src = imgUrl;
        this.imgArea.appendChild(img);
        this.imgArea.classList.add("active");
        this.imgArea.dataset.img = image.name;
      };
      reader.readAsDataURL(image);
    } else {
      alert("Image size more than 2MB");
    }
  };

  render() {
    return (
      <div className="container imageUp mb-0">
        <input
          id="companyLogo"
          name="companyLogo"
          type="file"
          style={{ display: "none" }}
          ref={(input) => (this.inputFile = input)}
          onChange={this.handleFileChange}
          
        />
        <div
          className="img-area"
          ref={(div) => (this.imgArea = div)}
          onClick={this.handleSelectImage}
        >
          {" "}
          {<CloudUploadIcon />}
          <h3>Upload Logo</h3>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
