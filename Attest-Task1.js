/**
 * Получает данные пользователя с сервера с обработкой различных ошибок
 * @param {number|string} userId - ID пользователя
 * @returns {Promise<object>} Промис с данными пользователя
 */
async function fetchUserData(userId) {
    // Валидация ID
    if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) {
        throw new Error('Invalid user ID');
    }

    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    // Обработка различных статусов
    if (response.status === 404) {
        throw new Error(`User with ID ${userId} not found`);
    }
    
    if (response.status === 403) {
        throw new Error('Access denied');
    }
    
    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }
    
    return await response.json();
}

// Примеры использования:

// 1. Успешный запрос
fetchUserData(123)
    .then(user => console.log('User:', user))
    .catch(err => console.error('Error:', err.message));

// 2. Пользователь не найден
fetchUserData(9999)
    .catch(err => console.error('Error:', err.message)); // "User with ID 9999 not found"

// 3. Неверный ID
fetchUserData(null)
    .catch(err => console.error('Error:', err.message)); // "Invalid user ID"
