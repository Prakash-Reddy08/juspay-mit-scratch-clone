import React, { useEffect, useRef } from "react";
import Sprite, { SpriteImage } from "./Sprite";
import { useDispatch, useSelector } from "react-redux";
import { goTo, move, rotate, updateIntervalId, } from "../redux/spritesSlice";
import { PlayCircle } from "lucide-react";

export default function PreviewArea() {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpritId = spritesState.selectedSpriteId
  const dispatch = useDispatch();
  const intervalRefs = useRef({});

  const executeAction = ({ spriteId, type, payload }) => {
    type = type.toLowerCase();
    const sprite = sprites.find(sprite => sprite.id === spriteId);
    if (sprite) {
      switch (type) {
        case 'move':
          dispatch(move({ spriteId, ...payload }));
          break;
        case 'rotate':
          dispatch(rotate({ spriteId, ...payload }));
          break;
        case 'reverse-rotate':
          dispatch(rotate({ spriteId, ...payload }));
          break;
        case 'goto':
          dispatch(goTo({ spriteId, ...payload }));
          break;
        case 'repeat':
          repeatSpriteActions({ spriteId, interval: 400 });
          break;
        default:
          break;
      }
    }
  };

  const repeatSpriteActions = ({ spriteId, interval }) => {
    const sprite = sprites.find(s => s.id === spriteId);
    if (!sprite) return;

    if (intervalRefs.current[spriteId]) {
      clearInterval(intervalRefs.current[spriteId]);
    }

    let actionIndex = 0;
    const repeatInterval = setInterval(() => {
      if (actionIndex >= sprite.actions.length) {
        actionIndex = 0;
      }

      const action = sprite.actions[actionIndex];
      executeAction({ spriteId, type: action.type, payload: action.payload });

      actionIndex += 1;
    }, interval);

    intervalRefs.current[spriteId] = repeatInterval;
    dispatch(updateIntervalId({ spriteId, repeatInterval }));
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
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={() => dispatch(addNewSprite())}
          >
            Add Sprite
          </button>
        </div>
        <div className="flex gap-4 items-start overflow-x-auto">
          <div className="flex gap-2">
            {sprites.map((sprite) => (
              <div
                key={sprite.id}
                className="flex flex-col items-center cursor-pointer"
                style={{ border: selectedSpritId === sprite.id ? "2px solid hsla(260, 60%, 60%, 1)" : "" }}
              >
                <SpriteImage sprite={sprite} />
                <p className="text-sm mt-1">{sprite.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
