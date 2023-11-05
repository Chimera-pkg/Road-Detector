import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    axios.post("http://localhost:3001/upload", formData).then((res) => {
      // axios.post("https://rdd-api.x-camp.id/upload", formData).then((res) => {
      setUploadedImage(res.data.imageUrl);
      setFiles([...files, file]);
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Gambar berhasil diunggah!",
      });
    });
  };

  const handleButtonClick = async () => {
    setProcessing(true);
    Swal.fire({
      title: "Memproses File.....(bisa tekan ok untuk lihat hasil pada halaman Result)  ",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
        // Simulasikan proses pemrosesan selama 5 detik
        setTimeout(() => {
          setProcessing(false);
        }, 5000); // 5000 milidetik = 5 detik
      },
    });

    // Mulai proses pemrosesan di sini
    try {
      const response = await axios.get("http://localhost:3001/start-detection", {
        // const response = await axios.get("https://rdd-api.x-camp.id/start-detection", {
        params: {
          fileName: file.name, // Pass the fileName in the URL query string
        },
      });

      Swal.close();
      setProcessing(false);
      // Handle the response here if needed
      window.location.href = "/admin/damage-list?file=" + file.name;
      console.log(response.data);
      const data = response.data;
      console.log(data); // Respon dari server
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 box-content flex h-full w-full flex-col   items-center  justify-center rounded-lg border-2 border-dashed  border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <img
          src="/frame.png"
          alt="Icon"
          className="w-100  h-150 object-cover"
        />
        <h1 className="mt-5  text-[20px]">
          Format yang dapat digunakan adalah JPG, PNG, dan MP4
        </h1>
        <div className="ml-12">
          <input
            className="mt-5 w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-800 hover:border-gray-500 focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className="">
          <button
            type="button"
            className="mt-4 mt-5 rounded-full bg-blue-500 px-12 py-3 text-white hover:bg-blue-700"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {uploadedImage && (
          <div className="mt-4">
            <h2>Gambar Telah Diunggah:</h2>
            <img src={uploadedImage} alt="Uploaded" className="mt-2" />
          </div>
        )}

        {/* Tombol Start */}
        <div>
          <button
            type="button"
            className="mt-4 mt-5 place-content-center rounded-full bg-blue-500 px-12 py-3 text-white hover:bg-blue-700"
            onClick={handleButtonClick}
          >
            Start
          </button>
          {/* Loading selama 5 detik */}
          {processing && (
            <div className="modal">
              <div className="modal-content">
                <p>Sedang Memproses...</p>
              </div>
            </div>
          )}
        </div>
      </label>
      <div></div>
    </div>
  );
};

export default Upload;
