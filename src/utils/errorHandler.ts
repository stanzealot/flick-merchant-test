export const hasError = (response: any): boolean => {
  if (!response) return true; // No response is an error

  // Check for explicit error flags
  if (response.error) return true;
  if (response.isError) return true;
  if (response.success === false) return true;

  // Check for HTTP error status codes
  const statusCode =
    response.statusCode || response.status || response.data?.statusCode;
  if (statusCode >= 400) return true;

  // Check for common error message patterns
  const message = response.message || response.data?.message || '';
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes('error') ||
    lowerMessage.includes('fail') ||
    lowerMessage.includes('invalid') ||
    lowerMessage.includes('already exists') ||
    lowerMessage.includes('not found') ||
    lowerMessage.includes('unauthorized') ||
    lowerMessage.includes('forbidden')
  ) {
    return true;
  }

  return false;
};

export const getErrorMessage = (response: any): string => {
  if (!response) return 'No response from server';

  // Try different possible error message locations
  return (
    response.message ||
    response.data?.message ||
    response.error?.message ||
    response.msg ||
    'An unexpected error occurred'
  );
};
