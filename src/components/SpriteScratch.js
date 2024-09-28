import React, { useEffect, useRef } from "react";
import Sprite from "./Sprite";
import { useDispatch, useSelector } from "react-redux";
import { checkCollisionAndSwap, goTo, move, resetCollisionHandled, rotate } from "../redux/spritesSlice";
import { PlayCircle } from "lucide-react";
import { GO_TO, MOVE_STEPS, REPEAT, TURN_DEGREES } from "../constants/sidebarBlocks";

export default function SpriteScratch() {
    const spritesState = useSelector((state) => state.sprites);
    const sprites = spritesState.sprites;
    const dispatch = useDispatch();
    const intervalRefs = useRef({});
    const scratchRef = useRef(null)
    const executeAction = ({ spriteId, type, payload }) => {
        const actionMap = {
            [MOVE_STEPS]: () => dispatch(move({ spriteId, ...payload })),
            [TURN_DEGREES]: () => dispatch(rotate({ spriteId, ...payload })),
            [GO_TO]: () => dispatch(goTo({ spriteId, ...payload })),
            [REPEAT]: () => play(),
        };

        const action = actionMap[type];
        if (action) action();
    };

    const play = () => {
        sprites.forEach((sprite) => {
            if (sprite.actions.length === 0) return;

            let actionIndex = 0;
            clearTimeout(intervalRefs.current[sprite.id])
            const executeNextAction = () => {
                if (actionIndex >= sprite.actions.length) {
                    return;
                }
                const action = sprite.actions[actionIndex];
                executeAction({ spriteId: sprite.id, type: action.type, payload: action.payload });
                if (sprites.length > 1 && spritesState.showCollisionAnimation && !spritesState.collisionHandled) {
                    sprites.forEach((sprite2) => {
                        if (sprite2.name !== sprite.name) {
                            dispatch(checkCollisionAndSwap({ spriteId1: sprite.id, spriteId2: sprite2.id }))
                        }
                    });
                }
                actionIndex++;
                intervalRefs.current[sprite.id] = setTimeout(executeNextAction, 400);
            };

            executeNextAction();
        });
    };
    const clearTimeouts = () => {
        Object.keys(intervalRefs.current).forEach(spriteId => {
            clearTimeout(intervalRefs.current[spriteId]);
        });
    }
    useEffect(() => {
        if (spritesState.collisionHandled) {
            clearTimeouts()
            play();
            dispatch(resetCollisionHandled());
        }
    }, [spritesState.collisionHandled])
    useEffect(() => {
        return () => {
            clearTimeouts()
        };
    }, []);
    return (
        <div className="stage-area overflow-hidden relative bg-white border-2 border-gray-200" style={{ flex: 0.8 }} ref={scratchRef}>
            {
                sprites.map((sprite) => <Sprite key={sprite.id} sprite={sprite} scratchRef={scratchRef} />)
            }
            <div className="absolute bottom-4 right-3">
                <button
                    onClick={play}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    <PlayCircle className="mr-2" size={20} />
                    Play
                </button>
            </div>
        </div>
    );
}
