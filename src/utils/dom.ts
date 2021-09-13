const HTML = 'html'
const BODY = 'body'

export const getElement = (selector: string) => document.querySelector(selector)

export const getElements = (selector: any) => document.querySelectorAll(selector)

export const addClass = (element: any, className: string): void => element.classList.add(className)

export const removeClass = (element: any, className: string) => element.classList.remove(className)

export const addClassToHTML = (className: string): void => addClass(getElement(HTML), className)

export const removeClassToHTML = (className: string) => removeClass(getElement(HTML), className)

export const getDocumentHeight = () => document.documentElement.offsetHeight




// export const hasClass = (element: any, className: any) => element.classList.contains(className)

// export const addClassToBody = (className: any) => addClass(getElement(BODY), className)

// export const removeClassToBody = (className: any) => removeClass(getBody(), className)

// export const hasClassOfBody = (className: any) => hasClass(getBody(), className)

// export const getRect = (className: any) => getElement(className).getBoundingClientRect()

// export const getPosY = (className: any) => getRect(className).y

