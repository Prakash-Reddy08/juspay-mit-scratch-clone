import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import CatSprite from '../sprites/CatSprite';
import DogSprite from '../sprites/DogSprite';
import BirdSprite from '../sprites/BirdSprite';
import { selectSprite } from '../redux/spritesSlice';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites';

export const SpriteImage = ({ spriteName, styles, handleClick }) => {
    switch (spriteName) {
        case "cat":
            return <CatSprite styles={styles} onClick={handleClick} />
        case "dog":
            return <DogSprite styles={styles} onClick={handleClick} />
        case "bird":
            return <BirdSprite styles={styles} onClick={handleClick} />
        default:
            return <></>
    }
}
const Sprite = ({ sprite, scratchRef }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(selectSprite(sprite.id))
    }
    useEffect(() => {
        if (!scratchRef.current) return;

        const updateSize = () => {
            const { width, height } = scratchRef.current.getBoundingClientRect();
            setContainerSize({ width, height });
        };

        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(scratchRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    const { left, top } = useMemo(() => {
        const centerX = containerSize.width / 2;
        const centerY = containerSize.height / 2;

        const spriteX = centerX + sprite.position.x - SPRITE_WIDTH / 2;
        const spriteY = centerY - sprite.position.y - SPRITE_HEIGHT / 2;

        return {
            left: spriteX,
            top: spriteY
        };
    }, [containerSize, SPRITE_WIDTH, SPRITE_HEIGHT, sprite.position]);

    return (
        <div
            className="absolute transition-transform duration-400"
            style={{
                transform: `translate(${left}px, ${top}px) rotate(${sprite.rotation}deg)`,
            }}
        >
            <SpriteImage spriteName={sprite.name} handleClick={handleClick} styles={{ width: SPRITE_WIDTH + "px", height: SPRITE_HEIGHT + "px" }} />
        </div>
    );
};

export default Sprite;
