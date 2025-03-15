const createApiKey = async () => {
    const cachedApiKey = localStorage.getItem('apiKey');
    if (cachedApiKey) {
        console.log('Using cached API key:', cachedApiKey);
        return cachedApiKey;
    }

    const response = await fetch('https://codetest-api.applivery.io/api-keys/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const apiKey = data.id;
    if (!apiKey) {
        throw new Error('API key not found in response');
    }
    localStorage.setItem('apiKey', apiKey);
    return apiKey;
};

export { createApiKey };