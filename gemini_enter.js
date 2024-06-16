(function (Lampa) { // Удалён параметр Gemini
    'use strict';

    // Константы для API Gemini
    const GEMINI_API_URL = 'https://gemini.google.com/app/';
    const GEMINI_API_KEY = 'AIzaSyAsqrHQTVdr6jrfKFG5_jJFg4EOFvNdfno';
    const GEMINI_ICON_URL = 'https://github.com/LinuxFlow1/icon.png';

    // Основная функция инициализации плагина
    function initPlugin() {
        // Регистрация нового меню с иконкой
        Lampa.List.add('gemini', {
            name: 'Gemini', 
            link: 'plugin_gemini', 
            description: 'Интеграция с Gemini 1.0 APK', 
            icon: GEMINI_ICON_URL // Используем правильный формат и ссылку
        });

        // Обработчик выбора меню
        Lampa.List.on('select', function (event) {
            if (event.name === 'Gemini') {
                fetchGeminiContent();
            }
        });
    }

    // Функция для загрузки контента из Gemini
    async function fetchGeminiContent() {
        try {
            const response = await fetch(`${GEMINI_API_URL}content`, {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${GEMINI_API_KEY}`
                }
            });
            if (!response.ok) throw new Error('Сетевая ошибка');
            const data = await response.json();
            console.log('Полученные данные:', data);
            displayContent(data);
        } catch (error) {
            console.error('Ошибка загрузки данных из Gemini:', error);
            Lampa.Notifications.error(`Не удалось загрузить данные из Gemini: ${error.message}`);
        }
    }

    // Функция отображения контента
    function displayContent(data) {
        let contentBlock = new Lampa.Block({
            name: 'Gemini Content',
            items: data.items.map(item => ({
                title: item.title,
                description: item.description,
                image: item.image,
                link: item.link,
                icon: GEMINI_ICON_URL
            }))
        });

        Lampa.Screen.add(contentBlock);

        let iconElement = document.createElement('img');
        iconElement.src = GEMINI_ICON_URL;
        iconElement.alt = 'Gemini Icon';
        iconElement.style.width = '32px';
        iconElement.style.height = '32px';
        document.querySelector('.content-header').appendChild(iconElement);

        Lampa.Notifications.success('Данные из Gemini загружены успешно');
    }

    Lampa.App.on('ready', function () {
        initPlugin();
    });

})(window.Lampa);
              
