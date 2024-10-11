import React from 'react';
import axios from 'axios';
import '../styles/AddLog.css';
import html2canvas from "html2canvas";

function AddLog({ onLogAdded }) {

    // Функция для создания скриншота страницы
    const captureScreenshot = () => {
        return new Promise((resolve) => {
            html2canvas(document.body).then((canvas) => {
                const screenshotUrl = canvas.toDataURL('image/jpeg'); // Конвертируем канвас в data URL
                resolve(screenshotUrl); // Возвращаем URL скриншота
            });
        });
    };

    // Функция для создания лога с данными системы
    const createLog = async () => {
        const screenshotUrl = await captureScreenshot(); // Захват скриншота

        // Сбор системных данных
        const logData = {
            computer_name: navigator.platform, // Получение информации о платформе (ОС)
            event_type: 'Input', // Случайный тип события
            application: navigator.userAgent, // Информация о браузере и его версии
            window_title: document.title, // Заголовок текущей вкладки
            content: 'User interacted with the application.', // Симуляция взаимодействия
            screenshot_url: screenshotUrl, // URL скриншота
        };

        try {
            const response = await axios.post('http://localhost:8000/logs/content/create/', logData);
            onLogAdded(response.data); // Передаем новый лог в родительский компонент для обновления списка
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
