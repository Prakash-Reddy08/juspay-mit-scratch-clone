import React from 'react';
export const motionColor = {
    bgColor: "bg-yellow-500",
    textColor: "text-white"
}
export const controlColor = {
    bgColor: "bg-blue-500",
    textColor: "text-white"
}

export const MOVE_STEPS = "MoveSteps"
export const TURN_DEGREES = "TurnDegrees"
export const GO_TO = "GoTo"
export const REPEAT = "Repeat"
export default {
    Motion: [
        {
            text: 'Move 10 steps',
            type: MOVE_STEPS,
            defaultPayload: { steps: 10 }
        },
        {
            text: 'Turn 15 degrees',
            type: TURN_DEGREES,
            defaultPayload: { degree: 15 }
        },
        {
            text: 'Turn -15 degrees',
            type: TURN_DEGREES,
            defaultPayload: { degree: 15 }
        },
        {
            text: 'Turn 360 degrees',
            type: TURN_DEGREES,
            defaultPayload: { degree: 360 }
        },
        {
            text: "Go To x:100 y:100",
            type: GO_TO,
            defaultPayload: { x: 100, y: 100 }
        },
    ],
    Control: [
        {
            type: REPEAT,
            text: "Repeat Animation",
            defaultPayload: {}
        },
    ],
}