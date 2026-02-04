import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for debouncing values
 * Useful for search inputs to avoid excessive API calls
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for managing URL query parameters
 */
export function useQueryParams() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const updateQueryParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setSearchParams(newParams);
  };

  const getParam = (key, defaultValue = "") => {
    return searchParams.get(key) || defaultValue;
  };

  return { searchParams, updateQueryParams, getParam };
}

/**
 * Custom hook for previous value
 * Useful for comparing previous and current props/state
 */
export function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

/**
 * Custom hook for detecting click outside element
 * Useful for dropdowns, modals, etc.
 */
export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
}

/**
 * Custom hook for local storage with sync across tabs
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch storage event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(valueToStore),
        })
      );
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

/**
 * Custom hook for managing async operations
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (...params) => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setValue(response);
      setStatus("success");
      return response;
    } catch (error) {
      setError(error);
      setStatus("error");
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, status, value, error };
}

/**
 * Custom hook for window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * Custom hook for media queries
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/**
 * Custom hook for form validation
 */
export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(validationRules).forEach((fieldName) => {
      const error = validate(fieldName, values[fieldName]);
      if (error) newErrors[fieldName] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
}

export default {
  useDebounce,
  useQueryParams,
  usePrevious,
  useClickOutside,
  useLocalStorage,
  useAsync,
  useWindowSize,
  useMediaQuery,
  useFormValidation,
};
