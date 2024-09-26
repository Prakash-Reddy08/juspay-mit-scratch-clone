import Icon from "../components/Icon";
import React from 'react';
export const motionColor = {
    bgColor: "bg-yellow-500",
    textColor: "text-white"
}
export const controlColor = {
    bgColor: "bg-blue-500",
    textColor: "text-white"
}
export default {
    Motion: [
        {
            text: 'Move 10 steps',
            id: 1,
            type: 'Move',
            defaultPayload: { steps: 10 }
        },
        {
            text: (
                <>
                    Turn <Icon name="redo" size={15} className="text-white mx-2" /> 15 degrees
                </>
            ),
            id: 2,
            type: 'Reverse-Rotate',
            defaultPayload: { degree: -15 }
        },
        {
            text: (
                <>
                    Turn <Icon name="undo" size={15} className="text-white mx-2" /> 15 degrees
                </>
            ),
            type: "Rotate",
            id: 3,
            defaultPayload: { degree: 15 }
        },
        {
            text: (
                <>
                    Go To
                </>
            ),
            type: "GO TO",
            id: 4,
            defaultPayload: { x: 100, y: 100 }
        },
    ],
    Control: [
        {
            text: 'Repeat',
            type: "Repeat",
            id: 1,
            defaultPayload: {}
        },
    ],
}