
import React from 'react'

function button({
children,
type = "button",
bgColor = "bg-blue-500",
textColor = "text-white",
ClassName = '',
...props
}){
    return (
        <button className={'px-4 py-2 rounded ${bgColor} ${textColor} ${ClassName}'} {...props}>
            {children}
        </button>
    )
}

export default button