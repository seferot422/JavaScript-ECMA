* @param {object} userData - Объект с данными пользователя
 * @param {number} [retries=2] - Количество попыток при неудаче
 * @returns {Promise<void>}
 */
async function sendUserData(userData, retries = 2) {
    // Валидация данных
    if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data');
    }

    let lastError;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch('https://api.example.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token' // Добавляем авторизацию
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Если успешно, выходим из цикла
            return await response.json();
        } catch (error) {
            lastError = error;
            if (attempt < retries) {
                // Ждем перед повторной попыткой (экспоненциальная задержка)
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                console.log(`Retry ${attempt + 1}...`);
            }
        }
    }

    throw lastError;
}

// Примеры использования:

const newUser = {
    name: 'Alice Johnson',
    age: 28,
    email: 'alice@example.com',
    profile: {
        bio: 'Software developer',
        skills: ['JavaScript', 'React', 'Node.js']
    }
};

// 1. Успешная отправка
sendUserData(newUser)
    .then(() => console.log('Data saved successfully'))
    .catch(err => console.error('Failed after retries:', err.message));

// 2. С указанием количества попыток
sendUserData(newUser, 3)
    .catch(err => console.error('Failed after 3 retries:', err.message));
