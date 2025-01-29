import axios from 'axios';

const infobipApiKey = import.meta.env.VITE_INFOBIP_API_KEY;
const infobipBaseUrl = import.meta.env.VITE_INFOBIP_BASE_URL;

export const sendSms = async (to, message) => {
  try {
    const response = await axios.post(
      `${infobipBaseUrl}/sms/2/text/single`,
      {
        from: 'InfoSMS', // Your sender ID (alphanumeric or phone number)
        to: to,          // Recipient's phone number
        text: message,   // SMS content
      },
      {
        headers: {
          Authorization: `App ${infobipApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('SMS sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.response?.data || error.message);
  }
};
