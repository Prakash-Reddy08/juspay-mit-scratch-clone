import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import CatSprite from '../sprites/CatSprite';
import DogSprite from '../sprites/DogSprite';
import { selectSprite } from '../redux/spritesSlice';

export const SpriteImage = ({ sprite, styles }) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(selectSprite(sprite.id))
    }
    switch (sprite.name) {
        case "cat":
            return <CatSprite styles={styles} onClick={handleClick} />
        case "dog":
            return <DogSprite styles={styles} onClick={handleClick} />
        default:
            return <></>
    }
}
const Sprite = ({ sprite }) => {
    return (
        <div
            className="sprite absolute transition-transform duration-200"
            style={{
                transform: `translate(${sprite.position.x}px, ${sprite.position.y}px) rotate(${sprite.rotation}deg)`,
            }}
        >
            <SpriteImage sprite={sprite} />
        </div>
    );
};

export default Sprite;
