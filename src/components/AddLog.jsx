import React from 'react';
import axios from 'axios';
import '../styles/AddLog.css';
import html2canvas from "html2canvas";

function AddLog({onLogAdded}) {
    const b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: contentType});
    }
    const captureScreenshot = () => {
        return new Promise((resolve) => {
            html2canvas(document.body).then((canvas) => {
                const screenshotUrl = canvas.toDataURL('image/jpeg');
                const block = screenshotUrl.split(";");
                const contentType = block[0].split(":")[1]
                const realData = block[1].split(",")[1];

                const blob = b64toBlob(realData, contentType);
                const formData = new FormData();
                formData.append("screenshot", blob, 'screenshot.png');
                formData.append("computer_name", navigator.platform)
                formData.append("event_type", 'Input')
                formData.append("application", navigator.userAgent)
                formData.append("window_title", document.title)
                formData.append("content",'User interacted with the application.')

                resolve(formData);
            });
        });
    };
    const createLog = async () => {
        const data = await captureScreenshot();
        try {
            const response = await axios.post('http://localhost:8000/logs/content/create/', data);
            onLogAdded(response.data);
        } catch (error) {
            console.error('Error creating log:', error);
        }
    };

    return (
        <div className="add-log">
            <button onClick={createLog}>Create Log with System Data and Screenshot</button>
        </div>
    );
}

export default AddLog;
