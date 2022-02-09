// Показываем пользователю, что пошло не так, само сообщение

import { useCallback } from "react"

export const useMessage = () => {
    return useCallback( (text) => {
        if(window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}