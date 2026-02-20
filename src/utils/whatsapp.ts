export const WHATSAPP_NUMBER = "5491170624122";
export const WHATSAPP_DISPLAY_NUMBER = "+54 9 11 7062-4122";

export const getWhatsAppUrl = (
  message: string = "¡Hola! Me gustaría más información.",
) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
