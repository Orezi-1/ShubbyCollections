import emailjs from 'emailjs-com';

// Initialize EmailJS
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey && publicKey !== 'YOUR_API_KEY') {
    emailjs.init(publicKey);
  }
};

// Send email notification to admin
export const sendAdminNotification = async (formData) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId || serviceId === 'YOUR_API_KEY' || templateId === 'YOUR_API_KEY') {
      console.log('EmailJS not configured - skipping email notification');
      return { success: false, message: 'Email service not configured' };
    }

    initEmailJS();

    const templateParams = {
      to_email: 'oladepomercy02@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      service: formData.service,
      message: formData.message,
      submission_date: new Date().toLocaleString(),
      subject: `New Styling Inquiry from ${formData.name}`,
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    
    return { 
      success: true, 
      message: 'Email notification sent successfully',
      response 
    };
  } catch (error) {
    console.error('Email notification failed:', error);
    return { 
      success: false, 
      message: 'Failed to send email notification',
      error: error.message 
    };
  }
};

// Send confirmation email to client
export const sendClientConfirmation = async (formData) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;
    
    if (!serviceId || !confirmationTemplateId || serviceId === 'YOUR_API_KEY') {
      return { success: false, message: 'Confirmation email service not configured' };
    }

    initEmailJS();

    const templateParams = {
      to_email: formData.email,
      to_name: formData.name,
      service: formData.service,
      admin_email: 'oladepomercy02@gmail.com',
      admin_phone: '+234 808 267 1454',
      subject: 'Thank you for contacting Shubby Collections!',
    };

    const response = await emailjs.send(serviceId, confirmationTemplateId, templateParams);
    
    return { 
      success: true, 
      message: 'Confirmation email sent successfully',
      response 
    };
  } catch (error) {
    console.error('Confirmation email failed:', error);
    return { 
      success: false, 
      message: 'Failed to send confirmation email',
      error: error.message 
    };
  }
};
