import {useState, useCallback} from 'react'

export function useFormValue(initialForm) {
    const [value, setValue] = useState(initialForm);
    function handleChangeValue(event) {
        setValue((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    };
    return {
        value,
        onChange: handleChangeValue,
    }
};

export function useHttp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const request = async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
  
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Общая ошибка с сервака')
        }
        localStorage.setItem('tokenAndId',JSON.stringify(data));
        localStorage.setItem('userSuccessedLoggedIn',true.toString());
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    }
  
    const clearError = useCallback(() => setError(null),[])
  
    return { loading, request, error, clearError }
  }

  export function useMessage() {
      return useCallback((text) => {
            if (window.M && text) {
                window.M.toast({html: text})
            }
          },[])
  };

  export function useVisible(initialValue) {
    const [visible, setVisible] = useState(initialValue);
    function handleChangeVisible() {
      setVisible((prev) => !prev);
    };
    return {
      visible,
      handleChangeVisible
    }
  };