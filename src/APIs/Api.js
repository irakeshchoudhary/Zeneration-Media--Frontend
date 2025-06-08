import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const subscribe = async (email) => {
    try {
        const response = await api.post('/subscribe', { email });
        localStorage.setItem('userEmail', email);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error');
        }
    }
};

export const submitLeadForm = async (formData) => {
    try {
        const response = await api.post('/form-filling', formData);
        localStorage.setItem('userEmail', formData.email);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error');
        }
    }
};

// New: Submit Feedback API
export const submitFeedback = async (feedbackData) => {
    try {
        const response = await api.post('/api/feedback/submit', feedbackData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || error.response.data.error || 'Feedback submission failed.');
        } else {
            throw new Error('Network error');
        }
    }
};

// Call Request API
export const sendCallRequest = async (data) => {
    try {
        const response = await api.post('/call-request', data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network error');
        }
    }
};

export const getLastCallRequestTime = async (number) => {
    try {
        const response = await api.get(`/call-request/last?number=${number}`);
        return response.data;
    } catch (error) {
        return { lastRequestTime: null };
    }
}; 