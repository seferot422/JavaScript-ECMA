/**
 * Изменяет стили элемента с анимацией и обратным вызовом
 * @param {string} elementId - ID элемента
 * @param {object} styles - Объект со стилями
 * @param {number} delay - Задержка в мс
 * @param {number} [duration=1000] - Длительность анимации в мс
 * @param {function} [callback] - Функция обратного вызова
 */
function animateElementStyle(elementId, styles, delay, duration = 1000, callback) {
    setTimeout(async () => {
        const element = document.getElementById(elementId);
        
        if (!element) {
            console.warn(`Element #${elementId} not found`);
            return;
        }

        // Сохраняем исходные стили для возможности сброса
        const originalStyles = {};
        for (const key in styles) {
            originalStyles[key] = element.style[key];
        }

        // Добавляем transition для плавности
        element.style.transition = `${duration}ms all ease-in-out`;
        
        // Применяем новые стили
        Object.assign(element.style, styles);
        
        // Ждем завершения анимации
        await new Promise(resolve => setTimeout(resolve, duration));
        
        // Вызываем callback если есть
        if (typeof callback === 'function') {
            callback(element);
        }
    }, delay);
}

// Примеры использования:

// 1. Простое изменение цвета через 1 секунду
animateElementStyle('header', { color: 'red' }, 1000);

// 2. Комплексная анимация через 2 секунды
animateElementStyle(
    'myElement',
    {
        color: 'white',
        backgroundColor: 'blue',
        padding: '20px',
        borderRadius: '10px'
    },
    2000,
    500, // длительность анимации
    (el) => console.log('Animation completed for', el.id)
);

// 3. Сброс стилей после анимации
animateElementStyle(
    'button',
    { transform: 'scale(1.2)' },
    500,
    300,
    (el) => {
        setTimeout(() => {
            el.style.transform = '';
            el.style.transition = '';
        }, 1000);
    }
);
