import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      const imageRef = ref(storage, `properties/${image.name}`);
      const uploadTask = uploadBytes(imageRef, image);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      });

      await uploadTask;
      const url = await getDownloadURL(imageRef);
      alert("Image uploaded! URL: " + url);
    }
  };

  return (
    <div>
      <h1>Upload Property Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
};

export default UploadImage;
