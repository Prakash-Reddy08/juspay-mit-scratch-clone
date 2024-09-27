import React, { useEffect, useRef } from "react";
import Sprite from "./Sprite";
import { useDispatch, useSelector } from "react-redux";
import { goTo, move, rotate, selectSprite, updateIntervalId, } from "../redux/spritesSlice";
import { PlayCircle } from "lucide-react";
import { AddSprites } from "./AddSprites";
import SpriteCard from "./SpriteCard";
import { GO_TO, MOVE_STEPS, REPEAT, TURN_DEGREES } from "../constants/sidebarBlocks";

export default function PreviewArea() {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpritId = spritesState.selectedSpriteId
  const dispatch = useDispatch();
  const intervalRefs = useRef({});
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

      const executeNextAction = () => {
        if (actionIndex >= sprite.actions.length) {
          return;
        }

        const action = sprite.actions[actionIndex];
        executeAction({ spriteId: sprite.id, type: action.type, payload: action.payload });
        actionIndex++;
        setTimeout(executeNextAction, 400);
      };

      executeNextAction();
    });
  };

  useEffect(() => {
    return () => {
      Object.keys(intervalRefs.current).forEach(spriteId => {
        clearInterval(intervalRefs.current[spriteId]);
      });
    };
  }, []);
  return (
    <div className="flex flex-col h-full w-full p-2">
      <div className="stage-area overflow-hidden relative bg-white border-2 border-gray-200" style={{ flex: 0.8 }}>
        {
          sprites.map((sprite) => <Sprite key={sprite.id} sprite={sprite} />)
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
      <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">Sprites</p>
          <AddSprites />
        </div>
        <div className="flex gap-4 items-start overflow-x-auto">
          <div className="flex gap-2">
            {sprites.map((sprite, index) => (
              <SpriteCard
                key={index}
                spriteName={sprite.name}
                selected={sprite.id === selectedSpritId}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(selectSprite(sprite.id))
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
