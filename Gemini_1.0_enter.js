(function (Lampa, Gemini) {
    'use strict';

    // Константы для API Gemini
    const GEMINI_API_URL = 'https://gemini.google.com/app/'; //
    const GEMINI_API_KEY = 'AIzaSyAsqrHQTVdr6jrfKFG5_jJFg4EOFvNdfno'; //
    const GEMINI_ICON_URL = 'https://github.com/LinuxFlow1/icon.png'; //

    // Основная функция инициализации плагина
    function initPlugin() {
        // Регистрация нового меню с иконкой
        Lampa.List.add('gemini', {
            name: 'Gemini', // Название вкладки
            link: 'plugin_gemini', // Идентификатор для вызова плагина
            description: 'Интеграция с Gemini 1.0 APK', // Описание интеграции
            icon: https://github.com/Linuxflow1//
        });

        // Обработчик выбора меню
        Lampa.List.on('select', function (event) {
            if (event.name === 'Gemini') {
                // Загружаем контент из Gemini
                fetchGeminiContent();
            }
        });
    }

    // Функция для загрузки контента из Gemini
    function fetchGeminiContent() {
        fetch(`${GEMINI_API_URL}content`, {
            method: 'GET', // Метод запроса
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}` // Заголовок авторизации
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка');
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные данные:', data);
            displayContent(data);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных из Gemini:', error);
            Lampa.Notifications.error('Не удалось загрузить данные из Gemini');
        });
    }

    // Функция отображения контента
    function displayContent(data) {
        // Создаем новый блок контента
        let contentBlock = new Lampa.Block({
            name: 'Gemini Content',
            items: data.items.map(item => ({
                title: item.title,
                description: item.description,
                image: item.image,
                link: item.link,
                icon: https://github.com/LinuxFlow1 // Добавляем иконку к каждому элементу контента
            }))
        });

        // Добавляем блок на главный экран Lampa
        Lampa.Screen.add(contentBlock);

        // Создаем элемент для иконки и добавляем его в интерфейс
        let iconElement = document.createElement('img');
        iconElement.src = https://github.com/LinuxFlow1; // URL к вашей иконке
        iconElement.alt = 'Gemini Icon';
        iconElement.style.width = '32px'; // Ширина иконки
        iconElement.style.height = '32px'; // Высота иконки
        document.querySelector('.content-header').appendChild(iconElement); // Добавляем иконку в заголовок контента (измените селектор по необходимости)

        // Сообщаем пользователю о завершении загрузки
        Lampa.Notifications.success('Данные из Gemini загружены успешно');
    }

    // Запускаем плагин при готовности приложения
    Lampa.App.on('ready', function () {
        initPlugin();
    });

})(window.Lampa, window.Gemini);
