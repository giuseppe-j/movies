
import { useState, useEffect } from "react";

const useLazySearch = (value:string, delay:number) => {
    const [debouncedTerm, setDebouncedTerm] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(value), delay);
        return () => clearTimeout(timer);
    })
    return [debouncedTerm];
}

export default useLazySearch;